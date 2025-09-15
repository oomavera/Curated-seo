"use client";
import Image from "next/image";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "../../utils/usePrefersReducedMotion";
import logo from "../../../public/Logo2.png";
import GlassCard from "../../components/ui/GlassCard";
import PastelBlob from "../../components/ui/PastelBlob";
import PillButton from "../../components/ui/PillButton";
// Defer Aurora to idle
const DynamicAurora = dynamic(() => import("../../components/ui/ParallaxAurora"), { ssr: false });

// QuickEstimateForm is SSR to avoid layout shifts
const QuickEstimateForm = dynamic(() => import("../../components/QuickEstimateForm"), { ssr: false });
const ScrollPopupForm = dynamic(() => import("../../components/ScrollPopupForm"), { ssr: false });

// Generate array of review image paths in a stable order to prevent hydration mismatch
// Use .webp extension to match files in public/Gallery/reviews
const reviewImages = Array.from({ length: 22 }, (_, i) => `/Gallery/reviews/${i + 1}.webp`);

export default function OfferPage() {

	// Initialize Cal.com calendar widget (defer to idle)
	useEffect(() => {
		if (typeof window === 'undefined') return;
		const w = window as Window & { Cal?: unknown; requestIdleCallback?: (cb: () => void) => number };
		if (typeof w.Cal !== 'undefined') return;
		const load = () => {
			const script = document.createElement('script');
			script.innerHTML = `
				(function (C, A, L) { 
					let p = function (a, ar) { a.q.push(ar); }; 
					let d = C.document; 
					C.Cal = C.Cal || function () { 
						let cal = C.Cal; 
						let ar = arguments; 
						if (!cal.loaded) { 
							cal.ns = {}; 
							cal.q = cal.q || []; 
							d.head.appendChild(d.createElement("script")).src = A; 
							cal.loaded = true; 
						} 
						if (ar[0] === L) { 
							const api = function () { p(api, arguments); }; 
							const namespace = ar[1]; 
							api.q = api.q || []; 
							if(typeof namespace === "string"){
								cal.ns[namespace] = cal.ns[namespace] || api;
								p(cal.ns[namespace], ar);
								p(cal, ["initNamespace", namespace]);
							} else {
								p(cal, ar);
							} 
							return;
						} 
						p(cal, ar); 
					}; 
				})(window, "https://app.cal.com/embed/embed.js", "init");
				
				Cal("init", "firstclean", {origin:"https://app.cal.com"});
				Cal.ns.firstclean("ui", {"theme":"light","hideEventTypeDetails":false,"layout":"month_view"});
			`;
			document.head.appendChild(script);
		};
		if (w.requestIdleCallback) {
			w.requestIdleCallback(load);
		} else {
			setTimeout(load, 1);
		}
	}, []);

	// Idle-mount ParallaxAurora
	const [showAurora, setShowAurora] = useState(false);
	useEffect(() => {
		if (typeof window === 'undefined') return;
		const cb = () => setShowAurora(true);
		const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
		if (w.requestIdleCallback) {
			w.requestIdleCallback(cb);
		} else {
			setTimeout(cb, 1);
		}
	}, []);


	const prefersReducedMotion = usePrefersReducedMotion();

	// Countdown to offer end (October 1, 2025)
	const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number }>({ d: 0, h: 0, m: 0, s: 0 });
	useEffect(() => {
		const target = new Date('2025-10-01T00:00:00');
		const update = () => {
			const now = new Date();
			const diffMs = target.getTime() - now.getTime();
			if (diffMs <= 0) {
				setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
				return;
			}
			const totalSeconds = Math.floor(diffMs / 1000);
			const days = Math.floor(totalSeconds / 86400);
			const hours = Math.floor((totalSeconds % 86400) / 3600);
			const minutes = Math.floor((totalSeconds % 3600) / 60);
			const seconds = totalSeconds % 60;
			setTimeLeft({ d: days, h: hours, m: minutes, s: seconds });
		};
		update();
		const id = setInterval(update, 1000);
		return () => clearInterval(id);
	}, []);

	// TESTIMONIALS SECTION - Using CSS animations for better performance

	// Removed unused mobile detection code

	// Dynamically load cleans gallery images so new files are picked up automatically
	const [galleryImages, setGalleryImages] = useState<string[]>([]);
	useEffect(() => {
		let cancelled = false;
		const load = async () => {
			try {
				const res = await fetch('/api/gallery?album=cleans', { cache: 'no-store' });
				const json = await res.json().catch(() => ({ images: [] }));
				const images: string[] = Array.isArray(json?.images) ? json.images : [];
				if (!cancelled) setGalleryImages(images);
			} catch {
				// ignore
			}
		};
		load();
		return () => { cancelled = true };
	}, []);
	// Smooth CSS-based gallery animation - no JavaScript intervals or state updates needed

	// Stabilize gallery track widths to prevent CLS
	const gapPx = 16; // tailwind gap-4
	const desktopSlideWidth = 450;
	const mobileSlideWidth = 220;
	const desktopSlidesCount = galleryImages.length * 2;
	const mobileSubset = galleryImages; // Use all images on mobile as well
	const mobileSlidesCount = mobileSubset.length * 2;
	const mobileTrackWidthPx = mobileSlidesCount > 0 ? (mobileSlidesCount * mobileSlideWidth + (mobileSlidesCount - 1) * gapPx) : 0;
	const desktopTrackWidthPx = desktopSlidesCount > 0 ? (desktopSlidesCount * desktopSlideWidth + (desktopSlidesCount - 1) * gapPx) : 0;

	// Randomize reviews order client-side after mount to avoid hydration mismatch
	const [shuffledReviewImages, setShuffledReviewImages] = useState<string[] | null>(null);
	useEffect(() => {
		const prioritized = [6, 19, 21, 10] // 1-based indices
			.map(n => `/Gallery/reviews/${n}.webp`);
		const rest = reviewImages.filter(src => !prioritized.includes(src));
		// Shuffle the rest
		for (let i = rest.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[rest[i], rest[j]] = [rest[j], rest[i]];
		}
		setShuffledReviewImages([...prioritized, ...rest]);
	}, []);

	return (
		<div id="main-content" className="min-h-screen w-full font-nhd text-midnight">
			{/* ABOVE THE FOLD + HERO AREA (white background) */}
			<div className="bg-white text-midnight">
				{/* HERO SECTION - ABOVE THE FOLD */}
				<section className="relative bg-white min-h-screen flex flex-col overflow-visible">
				{showAurora && <DynamicAurora />}
				{/* Header */}
				<header className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-2 sm:py-3">
					{/* Mobile header (Apple-like) */}
					<div className="flex items-center justify-between sm:hidden">
						<div className="flex items-center">
							<Image src={logo} alt="Curated Cleanings" width={128} height={32} style={{ height: '26px', width: 'auto', objectFit: 'contain', opacity: 0.95 }} />
						</div>
						<div className="flex-1" />
						<PillButton onClick={() => window.location.href = 'tel:+14074701780'} variant="inverse" className="px-2 py-[2px] text-[10px]">CALL NOW</PillButton>
					</div>

					{/* Desktop header */}
					<div className="hidden sm:flex items-center justify-between">
						<div className="flex justify-start items-center">
							<Image src={logo} alt="Curated Cleanings" width={192} height={48} style={{ height: '38px', width: 'auto', objectFit: 'contain', opacity: 0.95 }} />
						</div>
						<div className="flex-1" />
						<div className="flex items-center justify-end">
							<PillButton onClick={() => window.location.href = 'tel:+14074701780'} variant="inverse" className="px-4 py-1.5 text-sm">CALL NOW</PillButton>
						</div>
					</div>
				</header>

				{/* Main Content */}
				<div className="flex-1 flex flex-col justify-center px-8 max-w-7xl mx-auto w-full mt-1 sm:mt-6">
					{/* Hero Text */}
					<div className="relative z-20 text-center mb-3 sm:mb-6 no-blend">
						<h1 className="font-hero text-2xl xs:text-3xl md:text-4xl xl:text-5xl mb-1 leading-tight text-midnight">
								Free Voucher for Seminole County Homeowners
						</h1>
						<div className="font-hero-sub text-sm xs:text-base md:text-lg text-mountain">
							Only 5 slots left, September only, quickly filling up, please don&apos;t miss out!
							<div className="mt-1 sm:mt-2 flex items-center justify-center gap-1.5 sm:gap-2 tabular-nums font-nhd">
								<div className="flex items-center justify-center gap-2">
									<div className="rounded-2xl px-2.5 sm:px-3.5 py-1.5 bg-black/5 backdrop-blur-md border border-black/10 shadow-sm">
										<div className="text-xl sm:text-2xl font-extrabold text-midnight leading-none tracking-tight" style={{ minWidth: '2.5ch', textAlign: 'center' }}>{String(timeLeft.d).padStart(2, '0')}</div>
										<div className="text-[9px] sm:text-[10px] text-mountain -mt-0.5 text-center">days</div>
									</div>
									<div className="rounded-2xl px-2.5 sm:px-3.5 py-1.5 bg-black/5 backdrop-blur-md border border-black/10 shadow-sm">
										<div className="text-xl sm:text-2xl font-extrabold text-midnight leading-none tracking-tight" style={{ minWidth: '2.5ch', textAlign: 'center' }}>{String(timeLeft.h).padStart(2, '0')}</div>
										<div className="text-[9px] sm:text[10px] text-mountain -mt-0.5 text-center">hrs</div>
									</div>
									<div className="rounded-2xl px-2.5 sm:px-3.5 py-1.5 bg-black/5 backdrop-blur-md border border-black/10 shadow-sm">
										<div className="text-xl sm:text-2xl font-extrabold text-midnight leading-none tracking-tight" style={{ minWidth: '2.5ch', textAlign: 'center' }}>{String(timeLeft.m).padStart(2, '0')}</div>
										<div className="text-[9px] sm:text-[10px] text-mountain -mt-0.5 text-center">min</div>
									</div>
									<div className="rounded-2xl px-2.5 sm:px-3.5 py-1.5 bg-black/5 backdrop-blur-md border border-black/10 shadow-sm">
										<div className="text-xl sm:text-2xl font-extrabold text-midnight leading-none tracking-tight" style={{ minWidth: '2.5ch', textAlign: 'center' }}>{String(timeLeft.s).padStart(2, '0')}</div>
										<div className="text-[9px] sm:text-[10px] text-mountain -mt-0.5 text-center">sec</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Logos Section */}
					<div className="flex flex-col justify-center items-center gap-2 mb-4 sm:mb-6">
						<div className="flex items-center gap-3 sm:gap-4">
							<Image 
								src="/Gallery/logos/Google-Logo-PNG.png" 
								alt="Google Reviews" 
								width={80}
								height={80}
								className="w-12 sm:w-16 h-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
							/>
							<Image 
								src="/Gallery/logos/Yelp_Logo.png" 
								alt="Yelp Reviews" 
								width={80}
								height={80}
								className="w-12 sm:w-16 h-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
							/>
							<Image 
								src="/Gallery/logos/png-transparent-thumbtack-horizontal-logo-review-platforms-logos.png" 
								alt="Thumbtack Reviews" 
								width={120}
								height={80}
								className="w-16 sm:w-20 h-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
							/>
						</div>
						{/* Partner badge removed for compactness */}
					</div>

					{/* Main Sections - Desktop: Left Photo Gallery, Right Form | Mobile: Form Center */}
					<div className="flex flex-row gap-6 mb-6 max-md:flex-col justify-center items-start">
						{/* Left Section - Photo Gallery (Desktop only) */}
						<div className="hidden md:flex flex-1 max-w-2xl">
							<GlassCard className="relative w-full h-[500px] overflow-hidden p-0 pane-glass" withShadow withEdgeGlow>
								<div className="relative w-full h-full">
									<div 
										className="gallery-slider flex h-full items-center gap-4 absolute"
										style={{
											width: `${desktopTrackWidthPx}px`,
											animation: prefersReducedMotion || galleryImages.length === 0 ? 'none' : `slideGallery ${galleryImages.length * 2.5}s linear infinite`,
											transform: 'translate3d(0, 0, 0)',
											willChange: 'transform'
										}}
									>
										{[...galleryImages, ...galleryImages].map((src, i) => (
											<div key={i} className="relative min-w-[450px] max-w-md rounded-2xl overflow-hidden shadow-lg h-full flex items-center justify-center border border-white/10 bg-white/5">
												<Image 
													src={src} 
													alt={`Gallery photo ${(i % galleryImages.length) + 1}`} 
													width={450}
													height={420}
													quality={60}
													sizes="(max-width: 768px) 90vw, 450px"
													priority={i === 0}
													fetchPriority={i === 0 ? 'high' : 'auto'}
													style={{ objectFit: 'cover', width: '100%', height: '100%' }}
														onError={(e) => {
															const img = e.currentTarget as HTMLImageElement;
															if (img.src.endsWith('.webp')) {
																img.src = img.src.replace('.webp', '.jpg');
															} else {
																img.style.display = 'none';
															}
														}}
												/>
											</div>
										))}
									</div>
									<div className="noise-overlay" />
									<div className="pane-inner-frame" />
									<div className="pane-glare" />
									<div className="pane-bottom-highlight" />
								</div>
							</GlassCard>
						</div>

						{/* Right Section - Lead Form wrapped in glass */}
						<div className="flex-1 max-w-lg mx-auto md:mx-0 relative mt-0">
							<PastelBlob className="w-[520px] h-[420px]" style={{ left: "-10%", top: "-10%" }} />
							<GlassCard className="p-5 sm:p-6 min-h-[420px]">
									<QuickEstimateForm title="Get Your Voucher Now" submitLabel="Get Voucher Now" showEmail={true} openCalendarOnSuccess={false} />
							</GlassCard>
						</div>
					</div>

					{/* Mobile Photo Gallery Section */}
					<section className="py-2 flex flex-col items-center bg-transparent md:hidden">
						<GlassCard className="relative w-full max-w-6xl h-60 overflow-hidden p-0 pane-glass" withShadow withEdgeGlow>
							<div className="relative w-full h-full">
								<div 
									className="gallery-slider flex h-full items-center gap-4 absolute"
									style={{
										width: `${mobileTrackWidthPx}px`,
										animation: prefersReducedMotion || mobileSubset.length === 0 ? 'none' : `slideGalleryMobile ${mobileSubset.length * 1.75}s linear infinite`,
										transform: 'translate3d(0, 0, 0)',
										willChange: 'transform'
									}}
								>
									{[...mobileSubset, ...mobileSubset].map((src, i) => (
										<div key={i} className="relative min-w-[220px] max-w-sm rounded-3xl overflow-hidden shadow-lg h-60 flex items-center justify-center border border-white/10 bg-white/5">
											<Image 
												src={src} 
												alt={`Gallery photo ${(i % mobileSubset.length) + 1}`} 
												width={220}
												height={240}
												quality={60}
												sizes="220px"
												priority={i === 0}
												fetchPriority={i === 0 ? 'high' : 'auto'}
												style={{ objectFit: 'cover', width: '100%', height: '100%' }}
													onError={(e) => {
														const img = e.currentTarget as HTMLImageElement;
														if (img.src.endsWith('.webp')) {
															img.src = img.src.replace('.webp', '.jpg');
														} else {
															img.style.display = 'none';
														}
													}}
											/>
										</div>
									))}
								</div>
								<div className="noise-overlay" />
								<div className="pane-inner-frame" />
								<div className="pane-glare" />
								<div className="pane-bottom-highlight" />
							</div>
						</GlassCard>
						</section>
					{/* Wide Video Window */}
					<section className="py-4 sm:py-8">
						<div className="max-w-7xl mx-auto px-0">
							<GlassCard className="relative overflow-hidden p-0 rounded-3xl" withShadow withEdgeGlow>
								<video
									src="/Wide2.mov"
									playsInline
									autoPlay
									loop
									muted
									className="w-full h-auto block"
									style={{ display: 'block' }}
								/>
								<div className="pane-inner-frame" />
								<div className="pane-glare" />
							</GlassCard>
						</div>
					</section>
					</div>
					</section>

					{/* Scroll-triggered Lead Form Popup */}
					<ScrollPopupForm triggerElement="#reviews" callout="Wait! Get your FREE cleaning voucher!" buttonClassName="bg-black text-white" />
			</div>

			{/* BELOW: Pure white from reviews to footer */}
			<div className="bg-white text-midnight">
					{/* Customer Reviews Grid Section */}
					<section id="reviews" className="py-6 sm:py-12 relative z-10">
						<div className="max-w-7xl mx-auto px-4">
							{/* Reviews Image Grid - 2x2 on mobile, 4x4 on desktop */}
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
								{(shuffledReviewImages ?? reviewImages).map((imageSrc) => (
									<div key={imageSrc} className="relative py-2">
										<Image 
											src={imageSrc} 
											alt="Customer review" 
											width={800}
											height={800}
											sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 22vw"
											quality={95}
											className="w-full h-auto"
											style={{ 
												filter: 'none',
												mixBlendMode: 'normal',
												opacity: 1,
												backdropFilter: 'none'
											}}
										/>
									</div>
								))}
							</div>
							
						</div>
					</section>

					{/* LARGE CALL TO ACTION SECTION */}
					<section className="py-6 sm:py-8 text-center">
						<a 
							href="tel:+14074701780" 
						className="inline-flex items-center gap-5 bg-white/20 backdrop-blur-md border border-white/30 text-midnight px-14 py-10 rounded-full text-3xl sm:text-4xl font-bold shadow-lg hover:bg-white/30 border-brand/30 hover:border-brand/50 hover:text-brand transform scale-120 hover:scale-125 transition-all duration-300"
						>
						<FaPhone className="text-4xl text-brand" />
							<span>CALL NOW</span>
						</a>
					</section>

				{/* SERVICE AREA SECTION - moved below CTA and styled like cards */}
				<section className="py-12 flex flex-col items-center">
					<GlassCard className="mb-12 w-full max-w-4xl p-4 sm:p-10 transition-transform duration-300 hover:scale-[1.02] overflow-hidden">
						
						<h3 className="font-hero-sub text-3xl mb-6 text-midnight text-center">Serving All of Seminole County</h3>
						<p className="text-lg text-mountain mb-8 font-light leading-relaxed text-center">
							We proudly serve every city and community in Seminole County. If you live in Seminole, you&apos;re covered.
						</p>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-base text-midnight">
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 col-span-2 md:col-span-3 text-center">
								<strong>All of Seminole County</strong>
									</div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Altamonte Springs, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Casselberry, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Lake Mary, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Longwood, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Oviedo, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Sanford, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Winter Springs, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Heathrow, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Wekiwa Springs, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Fern Park, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Chuluota, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Geneva, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Goldenrod, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Midway, FL</strong></div>
							<div className="p-4 bg-white rounded-lg shadow-sm border border-slopes/20 text-center"><strong>Black Hammock, FL</strong></div>
						</div>
					</GlassCard>
					</section>

				{/* COMPANY DESCRIPTION SECTION - moved to bottom */}

					{/* PACKAGES SECTION */}
					<section id="packages" className="py-12 flex flex-col items-center">
						{/* Standard Cleaning Card */}
						<GlassCard className="mb-12 w-full max-w-2xl p-4 sm:p-10 transition-transform duration-300 hover:scale-[1.02] overflow-hidden">
						
							<h2 className="font-hero-sub text-2xl sm:text-3xl tracking-[0.2em] text-center mb-4 sm:mb-6 text-brand font-bold">STANDARD HOUSE CLEANING</h2>
						<ul className="text-base sm:text-lg text-black flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-10 leading-snug sm:leading-relaxed" style={{ fontWeight: 300 }}>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Dusting all surfaces (furniture, shelves)</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Vacuuming carpets and rugs</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Sweeping and mopping floors</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Cleaning and disinfecting bathroom(s): toilet, sink, shower/tub, mirrors)</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Wiping kitchen counters and exterior of appliances (fridge, oven, microwave)</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Emptying trash bins and replacing liners</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Making beds (not changing linens)</span></li>
							</ul>
							<div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-12">
							<PillButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Get Free Voucher Now</PillButton>
							<a
								href="tel:+14074701780"
								aria-label="Call Curated Cleanings"
								className="w-12 h-12 rounded-full bg-midnight text-snow flex items-center justify-center shadow-lg hover:bg-mountain transition-colors"
							>
								<FaPhone />
							</a>
							</div>
						</GlassCard>
						{/* Deep Clean Card */}
						<GlassCard className="mb-12 w-full max-w-2xl p-4 sm:p-10 transition-transform duration-300 hover:scale-[1.02] overflow-hidden">
						
							<h2 className="font-hero-sub text-2xl sm:text-3xl tracking-[0.2em] text-center mb-4 sm:mb-6 text-brand font-bold">DEEP CLEANING SERVICES</h2>
						<ul className="text-base sm:text-lg text-black flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-10 leading-snug sm:leading-relaxed" style={{ fontWeight: 300 }}>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">+</span><span className="text-black">All Standard Services plus</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Inside Microwave</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Exterior of Kitchen Cabinets</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Dust Very High / Cluttered Shelves</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Change Bed Linens</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Inside Fridge</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Inside Oven</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Ceiling Fans</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Interior Windows</span></li>
							</ul>
							<div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-12">
							<PillButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Get Free Voucher Now</PillButton>
							<a
								href="tel:+14074701780"
								aria-label="Call Curated Cleanings"
								className="w-12 h-12 rounded-full bg-midnight text-snow flex items-center justify-center shadow-lg hover:bg-mountain transition-colors"
							>
								<FaPhone />
							</a>
							</div>
						</GlassCard>
						{/* Add-ons Card */}
						<GlassCard className="mb-12 w-full max-w-2xl p-4 sm:p-10 transition-transform duration-300 hover:scale-[1.02] overflow-hidden">
						
							<h2 className="font-hero-sub text-2xl sm:text-3xl tracking-[0.2em] text-center mb-4 sm:mb-6 text-brand font-bold">ADD-ONS</h2>
						<ul className="text-base sm:text-lg text-black flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-10 leading-snug sm:leading-relaxed" style={{ fontWeight: 300 }}>
							<li className="flex items-start gap-3"><span className="text-black">Laundry</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Spot Cleaning Walls</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Hand Scrubbing</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Vacuum Dusting</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Eco-friendly Consumables</span></li>
							<li className="flex items-start gap-3"><span className="text-black">QC Photos</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Air Freshener</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Reset Fridge</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Deodorizer</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Paper Towel Reset</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Swap Sponges</span></li>
							</ul>
							<div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-12">
							<PillButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Get Free Voucher Now</PillButton>
							<a
								href="tel:+14074701780"
								aria-label="Call Curated Cleanings"
								className="w-12 h-12 rounded-full bg-midnight text-snow flex items-center justify-center shadow-lg hover:bg-mountain transition-colors"
							>
								<FaPhone />
							</a>
							</div>
						</GlassCard>

					{/* WITHOUT US / WITH US SECTION - moved below Add-ons */}
					<GlassCard className="mb-12 w-full max-w-6xl p-8 sm:p-12 lg:p-16 transition-transform duration-300 hover:scale-[1.005] overflow-hidden">
						
						<div className="relative z-10 text-left text-lg sm:text-xl text-black font-light leading-relaxed max-w-5xl mx-auto">
							<div className="mb-12 sm:mb-16 text-center">
								<h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 sm:mb-10 text-black font-sans tracking-tight">Without Us</h2>
								<p className="text-black text-lg sm:text-xl leading-relaxed">After a 10-hour shift, you&apos;re still brushing, scrubbing, and mopping. On your knees cleaning toilets, wiping mirrors that never come streak-free, sneezing from dust, sick from fumes. Hours gone—time stolen from family, rest, or building your future. Or worse: you hire a cleaner who shows up late, rushes, leaves the job half-done, and never comes back. Guests notice. Family judges. And you&apos;re stuck in the same cycle: tired, behind, frustrated.</p>
								</div>
							<div className="mb-8 text-center">
								<h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 sm:mb-10 text-black font-sans tracking-tight">With Curated Cleanings</h2>
								<p className="text-black text-lg sm:text-xl leading-relaxed">Instead, imagine walking in the door to a spotless, fresh, perfectly organized home—without lifting a finger. One call, and your home stays effortlessly clean. You gain back hours every week. You relax with family. You focus on what matters. Guests are impressed. Your kids learn order. Your health improves in a disinfected, clutter-free space. Even your relationships thrive when the stress of cleaning is gone.</p>
							</div>
						</div>
						<div className="pane-inner-frame" />
						<div className="pane-glare" />
						<div className="pane-bottom-line" />
					</GlassCard>
					</section>

				{/* SERVICE AREA SECTION */}
				{/* Moved above; original removed to avoid duplicate */}

					{/* ESTIMATE SECTION */}
					<section id="estimate" className="py-24 flex flex-col items-center">
						<div className="text-center text-base text-black mb-8">Call or text us to schedule your free estimate and receive a detailed cleaning proposal</div>
						
						<div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-12">
							<a href="tel:+14074701780" className="flex items-center gap-4 text-xl text-black hover:text-gray-700 transition-colors">
								<FaPhone className="text-2xl" />
								<span>407-470-1780</span>
							</a>
							<a href="mailto:admin@curatedcleanings.com" className="flex items-center gap-4 text-xl text-black hover:text-gray-700 transition-colors">
								<FaEnvelope className="text-2xl" />
								<span>admin@curatedcleanings.com</span>
							</a>
						</div>

						<div className="max-w-2xl text-center text-lg text-black mb-8">
							<strong>Service Hours:</strong> Monday - Saturday, 8:00 AM - 6:00 PM<br />
							<strong>Response Time:</strong> We typically respond within 2 hours during business hours
						</div>

						<div className="text-center text-base text-black">
							Available for residential and commercial cleaning throughout Central Florida
						</div>
					</section>

					{/* CONTACT & FOOTER SECTION */}
					<footer className="flex flex-col items-center gap-4 py-8 border-t border-gray-200 mt-12">
						<div className="text-center text-sm text-midnight font-light">
							Curated Cleanings provides trusted house cleaning and maid services in Oviedo, Winter Park, Lake Mary, and surrounding Central Florida areas. Licensed, insured, and 5-star rated. Call 407-470-1780 or email admin@curatedcleanings.com for a free estimate.
						</div>
						<div className="flex gap-6 text-base mt-2">
							<a href="mailto:admin@curatedcleanings.com" aria-label="Email" className="hover:text-blue-600 transition-colors flex items-center gap-2">
								<FaEnvelope /> admin@curatedcleanings.com
							</a>
							<a href="tel:+14074701780" aria-label="Phone" className="hover:text-blue-600 transition-colors flex items-center gap-2">
								<FaPhone /> 407-470-1780
							</a>
						</div>
						<div className="text-xs text-mountain mt-2">© Curated Cleanings. All rights reserved.</div>
					</footer>
				</div>

				{/* Hidden Cal.com trigger button */}
				<button
					id="cal-trigger-button"
					data-cal-link="curatedcleanings/firstclean"
					data-cal-namespace="firstclean"
					data-cal-config='{"layout":"month_view","theme":"light"}'
					style={{ display: 'none' }}
					aria-hidden="true"
				>
					Hidden Cal Trigger
				</button>

		</div>
	);
}



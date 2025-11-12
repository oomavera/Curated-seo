"use client";
import Image from "next/image";
import { FaEnvelope, FaMinus, FaPhone, FaPlus } from "react-icons/fa";
import { ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import QuickEstimateForm from "./QuickEstimateForm";
import LazyVideo from "./LazyVideo";
import logo from "../../public/Logo2.png";
import GlassCard from "./ui/GlassCard";
import PastelBlob from "./ui/PastelBlob";
import PillButton from "./ui/PillButton";
import CircleIconButton from "./ui/CircleIconButton";
// Swiper - dynamically imported for performance
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
const ReviewsGridHome = dynamic(() => import("./ReviewsGridHome"), { ssr: false, loading: () => <div style={{height: 320}} aria-hidden /> });
// Defer Aurora to idle
const DynamicAurora = dynamic(() => import("./ui/ParallaxAurora"), { ssr: false });

// QuickEstimateForm is SSR to avoid layout shifts
const ScrollPopupForm = dynamic(() => import("./ScrollPopupForm"), { ssr: false });

// Generate array of review image paths in a stable order to prevent hydration mismatch
// Use actual filenames from /public/Gallery/reviews2
const reviewImages = [
    'Allen.webp', 'Andrea.webp', 'Cristina.webp', 'Daniela.webp', 'DanielR.webp',
    'Deja.webp', 'Hani.webp', 'Jackie.webp', 'Kenneth.webp', 'Kia.webp',
    'Latrell.webp', 'lauren.webp', 'Madeline.webp', 'Marlaren.webp', 'Martiza.webp',
    'Meghan.webp', 'Nathan.webp', 'Nikolas.webp', 'Rachel.webp', 'Trey.webp'
].map(name => `/Gallery/reviews2/${name}`);

// Photo gallery images for hero slideshow
const galleryImages = [
	'/Gallery/top10/IMG_1378.webp',
	'/Gallery/top10/IMG_2360.webp',
	'/Gallery/top10/IMG_2479.webp',
	'/Gallery/top10/IMG_2647.webp',
	'/Gallery/top10/IMG_2727.webp',
	'/Gallery/top10/IMG_2780.webp',
	'/Gallery/top10/IMG_3035.webp',
	'/Gallery/top10/IMG_3091.webp',
	'/Gallery/top10/IMG_7136.webp',
	'/Gallery/top10/IMG_7143.webp',
	'/Gallery/top10/IMG_7663.webp',
	'/Gallery/top10/IMG_7667.webp',
];

const DEFAULT_HERO_TITLE = "Trusted House Cleaning in Seminole County";
const DEFAULT_HERO_SUBTITLE = "Lake Mary, Oviedo, Sanford, Longwood, Winter Springs and nearby cities.";
const DEFAULT_FORM_TITLE = "Quick Free Estimate";
const DEFAULT_FORM_SUBMIT = "Get Quick Estimate";
const DEFAULT_POPUP_CALLOUT = "Get a quick estimate";
const DEFAULT_POPUP_SUBMIT = "Get Quick Estimate";
const BLUE_CTA_CLASSES = "bg-sky-600 hover:bg-sky-700 border-sky-600 text-white shadow-[0_15px_30px_rgba(14,165,233,0.35)] focus-visible:ring-sky-500/50";

const bonusFaqItems = [
	{
		question: "Do I need to stock cleaning supplies or equipment?",
		answer: "Every visit includes our Dream Clean Kit: commercial-grade vacuums with HEPA filtration, professional disinfectants, microfiber systems, and specialty brushes. You never have to buy or store supplies—we arrive fully equipped so Oviedo homes get the same polished finish every single time.",
	},
	{
		question: "How do you keep my recurring schedule on track?",
		answer: "Skip the Line priority service reserves your preferred day, time, and crew. Your dedicated team shows up on the cadence you choose—weekly, bi-weekly, or monthly—so there are no surprise gaps, random faces, or long reschedule waits.",
	},
	{
		question: "Who exactly is coming into my home?",
		answer: "Our Pro Trainer System screens hundreds of applicants each quarter, conducts multi-stage interviews, and runs full background plus insurance checks before onboarding. Only the top candidates graduate into field training, meaning the professionals caring for your home are vetted, insured, and coached to our 5-Star Promise.",
	},
];

interface HomeLandingPageProps {
	formPage?: string;
	heroTitle?: string;
	heroSubtitle?: string;
	formTitle?: string;
	formSubmitLabel?: string;
	popupCallout?: string;
	popupSubmitLabel?: string;
	formButtonClassName?: string;
	popupButtonClassName?: string;
	introContent?: ReactNode;
}

export default function HomeLandingPage({
	formPage = "home",
	heroTitle = DEFAULT_HERO_TITLE,
	heroSubtitle = DEFAULT_HERO_SUBTITLE,
	formTitle = DEFAULT_FORM_TITLE,
	formSubmitLabel = DEFAULT_FORM_SUBMIT,
	popupCallout = DEFAULT_POPUP_CALLOUT,
	popupSubmitLabel = DEFAULT_POPUP_SUBMIT,
	formButtonClassName = "",
	popupButtonClassName = "",
	introContent = null,
}: HomeLandingPageProps) {

	// Initialize Cal.com calendar widget (defer to idle)
	useEffect(() => {
		if (typeof window === 'undefined') return;
		const w = window as Window & { Cal?: unknown; requestIdleCallback?: (cb: () => void) => number };
		if (typeof w.Cal !== 'undefined') return;
    // removed Cal.com
  }, []);

	// Idle-mount ParallaxAurora
	const [showAurora, setShowAurora] = useState(false);
	const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
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

	// Preload first gallery image for LCP optimization
	useEffect(() => {
		const link = document.createElement('link');
		link.rel = 'preload';
		link.as = 'image';
		link.href = galleryImages[0];
		document.head.appendChild(link);
		return () => {
			document.head.removeChild(link);
		};
	}, []);

	return (
		<div id="main-content" className="min-h-screen w-full font-nhd text-midnight">
			{/* ABOVE THE FOLD (white) */}
			<div className="bg-white text-midnight">
				{/* HERO SECTION - ABOVE THE FOLD */}
				<section className="relative bg-white min-h-screen lg:min-h-0 flex flex-col overflow-visible lg:pt-2">
					{showAurora && <DynamicAurora />}
					{/* Header */}
					<header className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-6">
						{/* Mobile header (Apple-like) */}
					<div className="flex items-center justify-between sm:hidden">
							{/* Left: logo */}
							<div className="flex items-center">
							<Image src={logo} alt="Curated Cleanings" width={128} height={32} priority fetchPriority="high" sizes="128px" decoding="async" style={{ height: '26px', width: 'auto', objectFit: 'contain', opacity: 0.95 }} />
							</div>
							<div className="flex-1" />
							{/* Right: call pill */}
							<PillButton onClick={() => window.location.href = 'tel:+14074701780'} variant="inverse" className="px-2 py-[2px] text-[10px]">CALL NOW</PillButton>
						</div>

						{/* Desktop header */}
						<div className="hidden sm:flex items-center justify-between">
							<div className="flex justify-start items-center">
								<Image src={logo} alt="Curated Cleanings" width={192} height={48} priority fetchPriority="high" sizes="192px" decoding="async" style={{ height: '38px', width: 'auto', objectFit: 'contain', opacity: 0.95 }} />
							</div>
							<div className="flex-1" />
							<div className="flex items-center justify-end">
								<PillButton onClick={() => window.location.href = 'tel:+14074701780'} variant="inverse" className="px-4 py-1.5 text-sm">CALL NOW</PillButton>
							</div>
						</div>
					</header>

					{/* Main Content */}
					<div className="flex-1 flex flex-col justify-center lg:justify-start px-8 max-w-7xl mx-auto w-full mt-4 sm:mt-12 lg:mt-2">
						{/* Hero Text */}
						<div className="relative z-20 text-center mb-3 sm:mb-8 lg:mb-4 no-blend">
							<h1 className="font-hero text-2xl xs:text-3xl md:text-4xl xl:text-5xl mb-2 leading-tight text-midnight">
								{heroTitle}
							</h1>
							<div className="font-hero-sub text-base xs:text-lg md:text-xl text-mountain">
								{heroSubtitle}
							</div>
						</div>

						{/* Logos Section */}
						<div className="flex flex-col justify-center items-center gap-3 mb-4 sm:mb-6 lg:mb-4">
                            <div className="flex items-center gap-4 sm:gap-6">
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

					{/* Main Sections */}
					<div className="flex flex-col md:flex-row gap-6 mb-6 justify-center items-center md:items-start">
						{/* Photo Gallery - Desktop: Left, Mobile: Below form */}
						<div className="order-2 md:order-1 w-full md:w-[420px]">
							<div className="aspect-square overflow-hidden rounded-2xl shadow-lg relative bg-white">
								<Swiper
									modules={[Autoplay, EffectFade]}
									effect="fade"
									autoplay={{
										delay: 800,
										disableOnInteraction: false,
									}}
									loop={true}
									speed={600}
									className="w-full h-full"
									aria-label="Photo gallery showcasing our professional cleaning services"
								>
									{galleryImages.map((img, index) => (
										<SwiperSlide key={index}>
											<Image
												src={img}
												alt={`Professional cleaning service result ${index + 1}`}
												width={420}
												height={420}
												quality={75}
												priority={index === 0}
												className="w-full h-full object-cover"
												sizes="(max-width: 768px) 100vw, 420px"
											/>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
						</div>

						{/* Lead Form - Desktop: Right, Mobile: Above photo */}
						<div className="order-1 md:order-2 w-full md:flex-1 max-w-lg relative mt-0">
							<PastelBlob className="w-[520px] h-[420px]" style={{ left: "-10%", top: "-10%" }} />
							<GlassCard className="p-5 sm:p-6 min-h-[420px]">
								<QuickEstimateForm page={formPage} title={formTitle} submitLabel={formSubmitLabel} buttonClassName={formButtonClassName} />
							</GlassCard>
							{introContent && (
								<div className="sm:hidden text-base text-mountain leading-relaxed mt-5 font-nhd">
									{introContent}
								</div>
							)}
						</div>
					</div>
				</div>
				{introContent && (
					<div className="hidden sm:block px-8 max-w-3xl mx-auto text-base sm:text-lg text-mountain leading-relaxed mt-6 font-nhd">
						{introContent}
					</div>
				)}
				</section>
                {/* Wide Video Window (hidden on desktop) */}
                <section className="py-4 sm:py-8 lg:hidden">
                    <div className="max-w-7xl mx-auto px-8">
                        <GlassCard className="relative overflow-hidden p-0 rounded-3xl" withShadow withEdgeGlow>
                            <LazyVideo
                                src="/CleanVid2.mp4"
                                poster="/og.png"
                                className="w-full h-auto block"
                            />
                            <div className="pane-inner-frame" />
                            <div className="pane-glare" />
                        </GlassCard>
                    </div>
                </section>
			</div>

			{/* BELOW (pure white) */}
			<div className="bg-white text-midnight">
				{/* Scroll-triggered Lead Form Popup */}
					<ScrollPopupForm triggerElement="#reviews" callout={popupCallout} page={formPage} submitLabel={popupSubmitLabel} buttonClassName={popupButtonClassName} />
				{/* Customer Reviews Grid Section */}
				<section id="reviews" className="py-4 sm:py-8 lg:py-4 relative z-10">
					<div className="max-w-7xl mx-auto px-4">
                        {/* Reviews Image Grid - dynamically hydrated to reduce main-thread work */}
                        <ReviewsGridHome images={reviewImages} />
						
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

				{/* PACKAGES SECTION */}
				<section id="packages" className="py-12 flex flex-col items-center">
					{/* Standard Cleaning Card */}
					<GlassCard className="mb-12 w-full max-w-2xl p-4 sm:p-10 transition-transform duration-300 hover:scale-[1.02] overflow-hidden">
						
						<h2 className="font-hero-sub text-2xl sm:text-3xl tracking-[0.2em] text-center mb-4 sm:mb-6 text-brand font-bold">STANDARD HOUSE CLEANING</h2>
						<ul className="text-base sm:text-lg text-black flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-10 leading-snug sm:leading-relaxed" style={{ fontWeight: 300 }}>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Dusting all surfaces (furniture, shelves)</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Vacuuming carpets and rugs</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Sweeping and mopping floors</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Cleaning and disinfecting bathroom(s): toilet, sink, shower/tub, mirrors)</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Wiping kitchen counters and exterior of appliances (fridge, oven, microwave)</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Emptying trash bins and replacing liners</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Making beds (not changing linens)</span></li>
						</ul>
							<div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-12">
								<PillButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={BLUE_CTA_CLASSES}>
									GET ESTIMATE
								</PillButton>
								<CircleIconButton />
							</div>
					</GlassCard>
					{/* Deep Clean Card */}
					<GlassCard className="mb-12 w-full max-w-2xl p-4 sm:p-10 transition-transform duration-300 hover:scale-[1.02] overflow-hidden">
						
						<h2 className="font-hero-sub text-2xl sm:text-3xl tracking-[0.2em] text-center mb-4 sm:mb-6 text-brand font-bold">DEEP CLEANING SERVICES</h2>
						<ul className="text-base sm:text-lg text-black flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-10 leading-snug sm:leading-relaxed" style={{ fontWeight: 300 }}>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-black bg-white border border-gray-300 shadow-sm">+</span><span className="text-black">All Standard Services plus</span></li>
							
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Inside Microwave</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Exterior of Kitchen Cabinets</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Dust Very High / Cluttered Shelves</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Change Bed Linens</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Inside Fridge</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Inside Oven</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Ceiling Fans</span></li>
							<li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-brand bg-white border border-gray-300 shadow-sm">✓</span><span className="text-black">Interior Windows</span></li>
						</ul>
							<div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-12">
								<PillButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={BLUE_CTA_CLASSES}>
									GET ESTIMATE
								</PillButton>
								<CircleIconButton />
							</div>
					</GlassCard>
					{/* Add-ons Card */}
					<GlassCard className="mb-12 w-full max-w-2xl p-4 sm:p-10 transition-transform duration-300 hover:scale-[1.02] overflow-hidden">
						
						<h2 className="font-hero-sub text-2xl sm:text-3xl tracking-[0.2em] text-center mb-4 sm:mb-6 text-brand font-bold">ADD-ONS</h2>
							<ul className="text-base sm:text-lg text-black flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-10 leading-snug sm:leading-relaxed" style={{ fontWeight: 300 }}>
								<li className="flex items-start gap-3"><span className="text-black">Laundry</span></li>
								<li className="flex items-start gap-3"><span className="text-black">Spot Cleaning Walls</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Hand Scrubbing Baseboards</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Vacuum Dusting Baseboards</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Eco-friendly Consumables</span></li>
							<li className="flex items-start gap-3"><span className="text-black">QC Photos</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Air Freshener</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Reset Fridge</span></li>
							<li className="flex items-start gap-3"><span className="text-black">Deodorizer</span></li>
								<li className="flex items-start gap-3"><span className="text-black">Paper Towel Reset</span></li>
								<li className="flex items-start gap-3"><span className="text-black">Swap Sponges</span></li>
							</ul>
							<div className="mt-12">
								<h3 className="text-3xl sm:text-4xl text-center text-midnight font-black tracking-wide mb-6">
									Here to <span className="italic text-brand">help</span>
								</h3>
								<div className="divide-y divide-slate-200 border-y border-slate-200">
									{bonusFaqItems.map((item, index) => {
										const isOpen = openFaqIndex === index;
										return (
											<div key={item.question}>
												<button
													type="button"
													className="w-full flex items-center gap-4 py-4 text-left"
													onClick={() => setOpenFaqIndex(isOpen ? null : index)}
													aria-expanded={isOpen}
												>
													<span className="text-brand flex items-center justify-center w-5">
														{isOpen ? <FaMinus aria-hidden /> : <FaPlus aria-hidden />}
													</span>
													<span className="font-semibold text-midnight text-base sm:text-lg">
														{item.question}
													</span>
												</button>
												{isOpen && (
													<p className="pl-9 pb-5 text-sm sm:text-base text-mountain leading-relaxed">
														{item.answer}
													</p>
												)}
											</div>
										);
									})}
								</div>
							</div>
						</GlassCard>
				</section>

				{/* SERVICE AREA SECTION */}
				<section className="py-12 flex flex-col items-center bg-white">
					<div className="max-w-4xl text-center">
						<h3 className="font-hero-sub text-3xl mb-6 text-midnight">Serving All of Seminole County</h3>
						<p className="text-lg text-mountain mb-8 font-light leading-relaxed">
							We proudly serve every city and community in Seminole County. If you live in Seminole, you&apos;re covered.
						</p>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-base text-midnight">
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20 col-span-2 md:col-span-3">
								<strong>All of Seminole County</strong>
							</div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Altamonte Springs, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Casselberry, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Lake Mary, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Longwood, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Oviedo, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Sanford, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Winter Springs, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Heathrow, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Wekiwa Springs, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Fern Park, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Chuluota, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Geneva, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Goldenrod, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Midway, FL</strong></div>
							<div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20"><strong>Black Hammock, FL</strong></div>
						</div>
					</div>
				</section>

				{/* SEO FOOTER */}
				<footer className="flex flex-col items-center gap-4 py-10 border-t border-gray-200 mt-16 text-center">
					<div className="text-sm text-midnight leading-relaxed max-w-3xl">
						<strong>Curated Cleanings</strong> delivers recurring, deep, and move-ready house cleaning services across Oviedo, Winter Park, Lake Mary, Longwood, and the rest of Seminole County. Every visit is photo-verified, insured, and backed by our 5-Star Promise. Call, text, or email to secure your free in-home estimate.
					</div>
					<div className="flex flex-col sm:flex-row gap-4 text-base mt-2">
						<a href="mailto:admin@curatedcleanings.com" aria-label="Email" className="hover:text-blue-600 transition-colors flex items-center gap-2">
							<FaEnvelope /> admin@curatedcleanings.com
						</a>
						<a href="tel:+14074701780" aria-label="Phone" className="hover:text-blue-600 transition-colors flex items-center gap-2">
							<FaPhone /> 407-470-1780
						</a>
					</div>
					<div className="text-xs text-mountain mt-2">© {new Date().getFullYear()} Curated Cleanings. All rights reserved.</div>
				</footer>
			</div>

            {/* Cal.com removed */}

		</div>
	);
}

"use client";
import Image from "next/image";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "../../utils/usePrefersReducedMotion";
import logo from "../../../public/Logo2.png";
import GlassCard from "../../components/ui/GlassCard";
import PillButton from "../../components/ui/PillButton";
// Removed @calcom/embed-react; using iframe embed instead

// Defer Aurora to idle
const DynamicAurora = dynamic(() => import("../../components/ui/ParallaxAurora"), { ssr: false });

// Generate array of review image paths in a stable order to prevent hydration mismatch
// Use .webp extension to match files in public/Gallery/reviews
const reviewImages = Array.from({ length: 22 }, (_, i) => `/Gallery/reviews/${i + 1}.webp`);

export default function SchedulePage() {

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
    // Cal inline container ref
    const calContainerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const savedY = window.scrollY;
        type ScrollIntoViewFn = (arg?: boolean | ScrollIntoViewOptions) => void;
        type ScrollToFn = ((x: number, y: number) => void) & ((options: ScrollToOptions) => void);

        const elProto = Element.prototype as unknown as { scrollIntoView: ScrollIntoViewFn };
        const originalScrollIntoView = elProto.scrollIntoView.bind(Element.prototype) as ScrollIntoViewFn;
        const originalScrollTo = window.scrollTo.bind(window) as ScrollToFn;

        const suppressionMs = 6000;
        const deadline = Date.now() + suppressionMs; // suppression window in ms
        let restored = false;

        (elProto as { scrollIntoView: ScrollIntoViewFn }).scrollIntoView = function (arg?: boolean | ScrollIntoViewOptions) {
            if (Date.now() < deadline) {
                return; // no-op
            }
            return originalScrollIntoView.call(this as unknown as Element, arg);
        };

        (window as unknown as { scrollTo: ScrollToFn }).scrollTo = function (
            xOrOptions?: number | ScrollToOptions,
            y?: number
        ) {
            if (Date.now() < deadline) {
                return originalScrollTo(0, savedY);
            }
            if (typeof xOrOptions === 'number') {
                return originalScrollTo(xOrOptions, y ?? 0);
            }
            return originalScrollTo(xOrOptions as ScrollToOptions);
        } as ScrollToFn;

        const onFocusIn = () => {
            const container = calContainerRef.current;
            const iframe = container?.querySelector('iframe') as HTMLIFrameElement | null;
            if (Date.now() < deadline && (document.activeElement === iframe || document.activeElement === container)) {
                try { (document.activeElement as HTMLElement | null)?.blur?.(); } catch {}
                try { (document.body as HTMLElement).focus(); } catch {}
                try { originalScrollTo(0, savedY); } catch {}
            }
        };
        document.addEventListener('focusin', onFocusIn);

        // Initialize Cal React SDK UI once available
        (async function () {
            try {
                const cal = await getCalApi({ namespace: 'firstclean' });
                cal('ui', { theme: 'light', hideEventTypeDetails: true, layout: 'week_view' });
            } catch {}
        })();

        const restore = () => {
            if (restored) return;
            restored = true;
            try { (elProto as { scrollIntoView: ScrollIntoViewFn }).scrollIntoView = originalScrollIntoView; } catch {}
            try { (window as unknown as { scrollTo: ScrollToFn }).scrollTo = originalScrollTo; } catch {}
            try { originalScrollTo(0, savedY); } catch {}
            document.removeEventListener('focusin', onFocusIn);
            // nothing extra to cleanup for Cal React SDK
        };

        const timer = setTimeout(restore, suppressionMs + 800);
        window.addEventListener('beforeunload', restore, { once: true });

        return () => {
            clearTimeout(timer);
            window.removeEventListener('beforeunload', restore);
            restore();
        };
    }, []);

    // Gallery configuration
    const galleryImages = [
        "/Gallery/team/IMG_5963.webp",
        "/Gallery/cleans/IMG_1378.webp",
        "/Gallery/cleans/IMG_2647.webp",
        "/Gallery/team/ChatGPT Image Aug 23, 2025, 11_33_53 AM.webp",
        "/Gallery/cleans/IMG_2655.webp",
        "/Gallery/cleans/IMG_2727.webp",
        "/Gallery/cleans/IMG_2731.webp",
        "/Gallery/team/ChatGPT Image Aug 23, 2025, 11_33_53 AM.webp",
        "/Gallery/cleans/IMG_2780.webp",
        "/Gallery/cleans/IMG_2845.webp",
        "/Gallery/cleans/IMG_2538.webp",
        "/Gallery/team/ChatGPT Image Aug 24, 2025, 09_12_39 AM.webp",
        "/Gallery/cleans/IMG_2603.webp",
        "/Gallery/cleans/IMG_0952.webp",
        "/Gallery/team/IMG_6841(1).webp",
        "/Gallery/cleans/IMG_2537.webp",
        "/Gallery/cleans/IMG_2529.webp",
        "/Gallery/cleans/IMG_2479.webp",
        "/Gallery/cleans/IMG_2360.webp",
        "/Gallery/cleans/IMG_3035.webp",
        "/Gallery/cleans/IMG_3083.webp",
        "/Gallery/cleans/IMG_3085.webp",
        "/Gallery/cleans/IMG_3091.webp",
        "/Gallery/cleans/IMG_3240.webp",
        "/Gallery/cleans/IMG_3244.webp",
        "/Gallery/cleans/IMG_3249.webp",
        "/Gallery/cleans/IMG_3275.webp",
        "/Gallery/cleans/IMG_6841.webp"
    ];
    const gapPx = 16; // tailwind gap-4
    const desktopSlideWidth = 450;
    const mobileSlideWidth = 220;
    const desktopSlidesCount = galleryImages.length * 2;
    const mobileSubset = galleryImages.slice(0, Math.min(10, galleryImages.length));
    const mobileSlidesCount = mobileSubset.length * 2;
    const mobileTrackWidthPx = mobileSlidesCount * mobileSlideWidth + (mobileSlidesCount - 1) * gapPx;
    const desktopTrackWidthPx = desktopSlidesCount * desktopSlideWidth + (desktopSlidesCount - 1) * gapPx;

    // Randomize reviews order client-side after mount to avoid hydration mismatch
    const [shuffledReviewImages, setShuffledReviewImages] = useState<string[] | null>(null);
    useEffect(() => {
        const prioritized = [6, 19, 21, 10] // 1-based indices
            .map(n => `/Gallery/reviews/${n}.webp`);
        const rest = reviewImages.filter(src => !prioritized.includes(src));
        for (let i = rest.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rest[i], rest[j]] = [rest[j], rest[i]];
        }
        setShuffledReviewImages([...prioritized, ...rest]);
    }, []);

    const smsHref = (prefill?: string) => {
        const body = prefill ? encodeURIComponent(prefill) : undefined;
        return body ? `sms:+14072700379?&body=${body}` : `sms:+14072700379`;
    };

    const calContainerStyle: CSSProperties = {
        contain: 'layout paint',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
    };

    return (
        <div id="main-content" className="textured-background min-h-screen w-full font-sans text-midnight">
            {/* HERO SECTION - ABOVE THE FOLD */}
            <section className="relative bg-gradient-to-br from-snow via-arctic/50 to-slopes/20 min-h-screen flex flex-col overflow-visible">
                {showAurora && (
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <DynamicAurora />
                    </div>
                )}
                {/* Header */}
                <header className="flex flex-col sm:flex-row justify-center sm:justify-between items-center py-4 sm:py-6 px-4 sm:px-8 max-w-7xl mx-auto w-full gap-2 sm:gap-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl">
                    {/* Mobile: Centered Logo First */}
                    <div className="flex justify-center items-center sm:hidden order-1">
                        <div className="relative">
                            <Image 
                                src={logo} 
                                alt="Curated Cleanings Logo" 
                                width={360} 
                                height={72} 
                                className="object-cover max-w-[70vw]" 
                                style={{ height: '36px', width: 'auto', objectFit: 'cover', objectPosition: 'center', opacity: 0.8 }}
                            />
                        </div>
                    </div>

                    {/* Mobile: Phone and Call Now Button Row */}
                    <div className="flex justify-between items-center w-full sm:hidden order-2 mt-2">
                        <a 
                            href="tel:+14072700379" 
                            className="text-xs font-semibold tracking-wider text-mountain hover:text-midnight transition-colors duration-300 whitespace-nowrap"
                        >
                            (407) 270-0379
                        </a>
                        <PillButton onClick={() => window.location.href = 'tel:+14072700379'} className="px-4 py-2 text-xs">
                            CALL NOW
                        </PillButton>
                    </div>

                    {/* Desktop Layout */}
                    {/* Phone Number - Left */}
                    <div className="hidden sm:flex items-center flex-1 -mt-3 sm:-mt-4">
                        <a 
                            href="tel:+14072700379" 
                            className="text-xl font-semibold tracking-wider text-mountain hover:text-midnight transition-colors duration-300 whitespace-nowrap"
                        >
                            (407) 270-0379
                        </a>
                    </div>
                    
                    {/* Logo - Center */}
                    <div className="hidden sm:flex justify-center items-center">
                        <div className="relative mt-2 sm:mt-3">
                            <Image 
                                src={logo} 
                                alt="Curated Cleanings Logo" 
                                width={600} 
                                height={120} 
                                priority 
                                placeholder="blur" 
                                className="object-cover max-w-[60vw]" 
                                style={{ height: '60px', width: 'auto', objectFit: 'cover', objectPosition: 'center', opacity: 0.8 }}
                            />
                        </div>
                    </div>
                    
                    {/* Navigation & Call Now Button - Right */}
                    <div className="hidden sm:flex items-center justify-end flex-1 -mt-3 sm:-mt-4 gap-4">
                        <PillButton onClick={() => window.location.href = 'tel:+14072700379'} className="px-5 py-2 sm:px-8 sm:py-3 text-xs sm:text-base">
                            CALL NOW
                        </PillButton>
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-center px-8 max-w-7xl mx-auto w-full mt-4 sm:mt-12">
                    {/* Hero Text */}
                    <div className="relative z-20 text-center mb-4 sm:mb-12 no-blend">
                        <h1 className="text-4xl xs:text-5xl md:text-6xl xl:text-7xl font-medium mb-4 leading-tight text-solid-black tracking-tight" style={{ fontFamily: 'var(--font-sora), Sora, Inter, Arial, Helvetica, sans-serif' }}>
                            ONE LAST STEP!
                        </h1>
                        <div className="text-xl xs:text-2xl md:text-3xl xl:text-4xl font-light text-solid-black space-y-2">
                            <p><span className="font-extrabold underline">Text Angelica</span> what time you can take a phone call to schedule at</p>
                            <p className="font-extrabold text-4xl xs:text-5xl md:text-6xl">
                                <a
                                    href={smsHref("Hi Angelica! I can take a call at [time] to schedule my clean.")}
                                    className="text-solid-black hover:opacity-90 focus:outline-none focus:ring-4 ring-white/60 ring-offset-2 ring-offset-white/40"
                                    aria-label="Text (407) 270-0379"
                                >
                                    (407) 270-0379
                                </a>
                            </p>
                            <p>Chose a time between 7am - 7pm</p>
                        </div>
                        <div className="mt-8 flex items-center justify-center gap-3">
                            <a
                                href={smsHref("Hi Angelica! I can take a call at [time] to schedule my clean.")}
                                className="relative inline-flex items-center justify-center gap-3 px-10 sm:px-14 py-5 sm:py-6 rounded-full text-2xl sm:text-3xl font-black w-full max-w-xl
                                bg-white/60 text-midnight border border-white/70 backdrop-blur-2xl overflow-hidden
                                shadow-[0_20px_60px_rgba(2,6,23,0.18),0_6px_14px_rgba(2,6,23,0.14)] hover:shadow-[0_28px_80px_rgba(2,6,23,0.28),0_12px_24px_rgba(2,6,23,0.18)]
                                drop-shadow-[0_30px_40px_rgba(2,6,23,0.25)] hover:drop-shadow-[0_40px_60px_rgba(2,6,23,0.35)]
                                hover:-translate-y-0.5 transition-all duration-300
                                focus:outline-none focus:ring-4 ring-white/60 ring-offset-2 ring-offset-white/40"
                            >
                                {/* Iridescent glow */}
                                <span aria-hidden className="pointer-events-none absolute -inset-6 rounded-full opacity-25 blur-2xl
                                    bg-[conic-gradient(from_210deg_at_50%_50%,#fde68a_0%,#fbcfe8_25%,#c7d2fe_50%,#a7f3d0_75%,#fde68a_100%)]"></span>
                                {/* Top highlight for glass depth */}
                                <span aria-hidden className="pointer-events-none absolute inset-[1px] rounded-full bg-gradient-to-b from-white/80 to-white/10 opacity-70 mix-blend-screen"></span>
                                {/* Bottom ambient shadow inside button for curvature illusion */}
                                <span aria-hidden className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 w-[85%] h-10 rounded-full bg-slate-900/20 blur-2xl opacity-40"></span>
                                <span className="relative z-10">Text now</span>
                            </a>
                        </div>
                    </div>

                    {/* Logos Section */}
                    <div className="flex flex-col justify-center items-center gap-3 mb-6 sm:mb-12">
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
                    </div>

					{/* Then + Instruction Headings */}
					<div className="text-center mb-4 sm:mb-8">
						<p className="mt-1 text-xl sm:text-2xl font-medium text-solid-black tracking-tight">
							Please mark a time block when we can call you & you will be available
						</p>
					</div>

					{/* Cal.com iframe Embed */}
					<div className="w-full max-w-5xl mx-auto mb-28 sm:mb-36 relative isolate z-0">
						<div className="rounded-2xl border border-white/20 bg-white/60 backdrop-blur p-3 sm:p-4">
							<div className="h-[900px] sm:h-[1000px] lg:h-[1100px] overflow-hidden rounded-xl" style={calContainerStyle}>
								<Cal
									namespace="firstclean"
									calLink="curatedcleanings/firstclean"
									style={{ width: "100%", height: "100%", overflow: "scroll" }}
									config={{ layout: "week_view", theme: "light" }}
								/>
							</div>
						</div>
					</div>

                    {/* Gallery moved below reviews for /schedule */}

                    {/* Customer Reviews Grid Section */}
                    <section id="reviews" className="py-6 sm:py-12 relative z-10">
                        <div className="max-w-7xl mx-auto px-4">
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

                    {/* Photo Gallery Section (moved below reviews) */}
                    <section className="py-6 sm:py-10">
                        <div className="max-w-7xl mx-auto px-4">
                            {/* Mobile Gallery */}
                            <div className="md:hidden">
                                <GlassCard className="relative w-full h-60 overflow-hidden p-0 pane-glass" withShadow withEdgeGlow>
                                    <div className="relative w-full h-full">
                                        <div 
                                            className="gallery-slider flex h-full items-center gap-4 absolute"
                                            style={{
                                                width: `${mobileTrackWidthPx}px`,
                                                animation: prefersReducedMotion ? 'none' : `slideGalleryMobile ${mobileSubset.length * 3.5}s linear infinite`,
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

                            {/* Desktop Gallery */}
                            <div className="hidden md:block">
                                <GlassCard className="relative w-full h-[500px] overflow-hidden p-0 pane-glass" withShadow withEdgeGlow>
                                    <div className="relative w-full h-full">
                                        <div 
                                            className="gallery-slider flex h-full items-center gap-4 absolute"
                                            style={{
                                                width: `${desktopTrackWidthPx}px`,
                                                animation: prefersReducedMotion ? 'none' : `slideGallery ${galleryImages.length * 5}s linear infinite`,
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
                        </div>
                    </section>

                    {/* CONTACT & FOOTER SECTION */}
                    <footer className="flex flex-col items-center gap-4 py-8 border-t border-gray-200 mt-12">
                        <div className="text-center text-sm text-midnight font-light">
                            Curated Cleanings provides trusted house cleaning and maid services in Oviedo, Winter Park, Lake Mary, and surrounding Central Florida areas. Licensed, insured, and 5-star rated. Call (407) 270-0379 or email admin@curatedcleanings.com for a free estimate.
                        </div>
                        <div className="flex gap-6 text-base mt-2">
                            <a href="mailto:admin@curatedcleanings.com" aria-label="Email" className="hover:text-blue-600 transition-colors flex items-center gap-2">
                                <FaEnvelope /> admin@curatedcleanings.com
                            </a>
                            <a href="tel:+14072700379" aria-label="Phone" className="hover:text-blue-600 transition-colors flex items-center gap-2">
                                <FaPhone /> (407) 270-0379
                            </a>
                        </div>
                        <div className="text-xs text-mountain mt-2">© Curated Cleanings. All rights reserved.</div>
                    </footer>
                </div>
            </section>
        </div>
    );
}



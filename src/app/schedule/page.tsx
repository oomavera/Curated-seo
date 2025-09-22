"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { track } from "../../lib/ga4";
// Removed Cal.com embed
import dynamic from "next/dynamic";
import logo from "../../../public/Logo2.png";
// Removed @calcom/embed-react; using iframe embed instead

// Defer Aurora to idle
const DynamicAurora = dynamic(() => import("../../components/ui/ParallaxAurora"), { ssr: false });

// Reviews grid removed from /schedule

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

	// Fire Meta Pixel Lead event on /schedule load
	useEffect(() => {
		if (typeof window === 'undefined') return;
		
		const fireLeadEvent = () => {
			const w = window as Window & { fbq?: (...args: unknown[]) => void };
			if (w.fbq && typeof w.fbq === 'function') {
				try {
					const eventId = `schedule-lead-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
					w.fbq('track', 'Lead', {
						event_id: eventId,
						content_name: 'Schedule Page Load',
						event_source: 'schedule_page'
					});
					console.log('Meta Pixel Lead event fired for /schedule page');
				} catch (error) {
					console.error('Error firing Meta Pixel Lead event:', error);
				}
			}
		};

		// Try immediately, then retry if needed
		fireLeadEvent();
		
		// Retry after a short delay if fbq wasn't ready
		const retryTimer = setTimeout(() => {
			const w = window as Window & { fbq?: (...args: unknown[]) => void };
			if (w.fbq && typeof w.fbq === 'function') {
				fireLeadEvent();
			}
		}, 500);

		// GA4 funnel step: arrived schedule page
		try { track({ name: 'schedule_page_view' }); } catch {}
		
		return () => clearTimeout(retryTimer);
	}, []);



    // Reviews grid removed; no shuffle required

    const smsHref = (prefill?: string) => {
        const body = prefill ? encodeURIComponent(prefill) : undefined;
        return body ? `sms:+14074701780?&body=${body}` : `sms:+14074701780`;
    };


    return (
        <div id="main-content" className="min-h-screen w-full font-nhd text-midnight">
            {/* HERO SECTION - ABOVE THE FOLD */}
            <section className="relative bg-white min-h-screen flex flex-col overflow-visible">
                {showAurora && (
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <DynamicAurora />
                    </div>
                )}
                {/* Header (centered logo, no call button) */}
                <header className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-2 sm:py-3">
                    {/* Mobile header */}
                    <div className="flex items-center justify-center sm:hidden">
                        <Image src={logo} alt="Curated Cleanings" width={128} height={32} style={{ height: '26px', width: 'auto', objectFit: 'contain', opacity: 0.95 }} />
                    </div>

                    {/* Desktop header */}
                    <div className="hidden sm:flex items-center justify-center">
                        <Image src={logo} alt="Curated Cleanings" width={192} height={48} style={{ height: '38px', width: 'auto', objectFit: 'contain', opacity: 0.95 }} />
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-center px-8 max-w-7xl mx-auto w-full mt-4 sm:mt-12">
                    {/* Hero Text */}
                    <div className="relative z-20 text-center mb-4 sm:mb-12 no-blend">
                        <h1 className="font-hero-title text-4xl xs:text-5xl md:text-6xl xl:text-7xl mb-4 leading-tight text-solid-black tracking-tight">
                            ONE LAST STEP!
                        </h1>
                        <div className="text-xl xs:text-2xl md:text-3xl xl:text-4xl font-light text-solid-black space-y-2">
                            <p><span className="font-extrabold underline">Text Angelica</span> what time you can take a phone call to schedule at</p>
                            <p className="font-black text-4xl xs:text-5xl md:text-6xl">
                                <a
                                    href={smsHref("Hi Angelica! I can take a call at [time] to schedule my clean.")}
                                    className="text-solid-black hover:opacity-90 focus:outline-none focus:ring-4 ring-white/60 ring-offset-2 ring-offset-white/40"
                                    aria-label="Text 407-470-1780"
                                >
                                    407-470-1780
                                </a>
                            </p>
                            <p>Chose a time between 7am - 7pm</p>
                        </div>
                        <div className="mt-8 flex items-center justify-center gap-3">
						<a
                                href={smsHref("Hi Angelica! I can take a call at [time] to schedule my clean.")}
							className="relative inline-flex items-center justify-center gap-3 px-10 sm:px-14 py-5 sm:py-6 rounded-full text-2xl sm:text-3xl font-black w-full max-w-xl glow-pulse
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

						{/* Logos directly under Text Now */}
                        <div className="mt-5 flex items-center justify-center gap-4 opacity-85">
							<Image 
								src="/Gallery/logos/Google-Logo-PNG.png" 
								alt="Google Reviews" 
								width={96}
								height={40}
                                className="h-3.5 w-auto sm:h-4"
							/>
							<Image 
								src="/Gallery/logos/Yelp_Logo.png" 
								alt="Yelp Reviews" 
								width={96}
								height={40}
                                className="h-3.5 w-auto sm:h-4"
							/>
							<Image 
								src="/Gallery/logos/png-transparent-thumbtack-horizontal-logo-review-platforms-logos.png" 
								alt="Thumbtack Reviews" 
								width={120}
								height={40}
                                className="h-3.5 w-auto sm:h-4"
							/>
						</div>
                    </div>

                    {/* Greviews stacked images under Text Now */}
                    <section className="py-6">
                        <div className="max-w-7xl mx-auto px-4">
                            <GreviewsStack />
                        </div>
                    </section>

					

                    {/* Calendar embed removed */}

                    {/* Gallery moved below reviews for /schedule */}

                    {/* Reviews section removed */}

                    {/* Photo gallery removed */}

                    {/* Footer removed for minimalist landing */}
                </div>
            </section>
        </div>
    );
}
// Helper component to render the first existing Greviews candidate path; hides if none found
function GreviewsStack() {
    const [images, setImages] = useState<string[]>([]);
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch('/api/greviews', { cache: 'no-store' });
                const json = await res.json();
                if (!cancelled && Array.isArray(json?.images)) setImages(json.images);
            } catch {}
        })();
        return () => { cancelled = true; };
    }, []);
    if (!images.length) return null;
    return (
        <div className="space-y-4">
            {images.map((src: string, i: number) => (
                <div key={i} className="w-full overflow-hidden flex justify-center">
                    <Image 
                        src={src} 
                        alt="Google review" 
                        width={1200} 
                        height={800} 
                        className="w-full h-auto rounded-xl border border-black/10 mx-auto block"
                        style={{ transform: 'scale(1.2)', transformOrigin: 'center' }}
                    />
                </div>
            ))}
        </div>
    );
}



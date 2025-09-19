"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "../../lib/ga4";
import Script from "next/script";

export default function DemonstrationPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(20);
  const [done, setDone] = useState(false);
  const wistiaRef = useRef<HTMLElement | null>(null);
  // Wrapper to render custom element without TS JSX intrinsic checks
  const WistiaPlayer: keyof JSX.IntrinsicElements = 'wistia-player';
  const hasStartedRef = useRef(false);
  // 2-minute visual progress bar state (separate from CTA countdown)
  const [videoBarProgress, setVideoBarProgress] = useState(0); // 0..1
  const barStartRef = useRef<number | null>(null);
  const barRafRef = useRef<number | null>(null);
  const barStartedRef = useRef(false);
  // Removed desktop reviews wall per request

  const stopVideo = () => {
    const el = wistiaRef.current as unknown as { pause?: () => void } | null;
    try { el?.pause?.(); } catch {}
  };

  const startVideoProgressBar = () => {
    if (barStartedRef.current) return;
    barStartedRef.current = true;
    barStartRef.current = performance.now();
    const DURATION_MS = 120_000; // 2 minutes
    const tick = () => {
      const start = barStartRef.current ?? performance.now();
      const now = performance.now();
      const elapsed = now - start;
      const p = Math.min(1, elapsed / DURATION_MS);
      setVideoBarProgress(p);
      if (p < 1) {
        barRafRef.current = requestAnimationFrame(tick);
      }
    };
    barRafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (done) return;
    if (countdown <= 0) {
      setDone(true);
      return;
    }
    const id = setTimeout(() => setCountdown((v) => v - 1), 1000);
    return () => clearTimeout(id);
  }, [countdown, done]);

  const totalSeconds = 20;
  const progress = done ? 100 : Math.min(100, ((totalSeconds - countdown) / totalSeconds) * 100);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let running = true;
    const calc = () => {
      const btn = buttonRef.current;
      const label = labelRef.current;
      const bar = barRef.current;
      if (!btn || !label || !bar) return;
      // Visual feedback calculation removed for simplification
    };
    const loop = () => {
      if (!running) return;
      calc();
      requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("resize", calc);
    return () => {
      running = false;
      window.removeEventListener("resize", calc);
    };
  }, [done]);

  // Start progress when hosted player fires play
  useEffect(() => {
    const el = wistiaRef.current as unknown as HTMLElement | null;
    if (!el) return;
    const onPlay = () => { if (!hasStartedRef.current) { hasStartedRef.current = true; startVideoProgressBar(); } };
    el.addEventListener('play', onPlay as EventListener);
    return () => { el.removeEventListener('play', onPlay as EventListener); };
  }, []);

  // No visibility resume logic needed for hosted player

  // Cleanup rAF on unmount
  useEffect(() => {
    return () => {
      if (barRafRef.current) cancelAnimationFrame(barRafRef.current);
      stopVideo();
    };
  }, []);

  // Remove native video enforcement for hosted player

  return (
    <div className="min-h-screen bg-white font-nhd text-midnight">
      {/* Desktop heading and review wall removed */}
      <div className="bg-white text-midnight pb-36 md:pb-0">
        <div className="w-full max-w-[900px] mx-auto px-4">
		  <div
			className="mx-auto w-full bg-snow border border-black/10 rounded-2xl shadow-sm overflow-hidden relative h-[calc(100vh-11rem)] md:h-[calc(100vh-11rem)]"
		  >
                {/* Wistia hosted player */}
                <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
                <Script src="https://fast.wistia.com/embed/jjlcb799vn.js" strategy="afterInteractive" type="module" />
                <style jsx global>{`
                  wistia-player[media-id='jjlcb799vn']:not(:defined) {
                    background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/jjlcb799vn/swatch');
                    display: block;
                    filter: blur(5px);
                    padding-top:177.78%;
                  }
                `}</style>
                <WistiaPlayer ref={wistiaRef as React.MutableRefObject<HTMLElement | null>} media-id="jjlcb799vn" aspect="0.5625" />
				{/* 2-minute bottom progress bar */}
				<div className="absolute left-0 right-0 bottom-0 h-1.5 bg-black/20">
					<div className="h-full bg-brand" style={{ width: `${Math.round(videoBarProgress * 100)}%`, transition: 'width 120ms linear' }} />
				</div>
                {/* Hosted player manages buffering/sound UI */}
			</div>
        </div>
      </div>

      {/* Mobile pinned bottom countdown card */}
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
        <div className="px-3 pb-3">
          <div className="bg-white rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-black/5 ring-1 ring-black/5">
            <div className="px-5 pt-4 text-center text-midnight text-[15px] leading-snug font-nhd font-medium">
              <span className="font-extrabold">Watch This</span> <span className="italic">Quick Video Of A</span> <span className="font-extrabold">Home Like Your&apos;s</span> <span className="font-extrabold">Being Cleaned</span>
            </div>
            <div className="p-4 pt-3">
              <button
                ref={buttonRef}
                className={`relative w-full overflow-hidden rounded-full h-12 sm:h-14 px-4 py-0 text-[17px] sm:text-lg font-extrabold tracking-tight transition-colors ${!done ? "opacity-70 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
                style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.12)" }}
                disabled={!done}
                onClick={() => {
                  if (done) {
                    try { track({ name: 'demo_move_forward_click', params: { device: 'mobile' } }); } catch {}
                    stopVideo();
                    router.push("/schedule");
                  }
                }}
              >
                <span
                  ref={barRef}
                  className="absolute inset-y-0 left-0 z-10 pointer-events-none bg-sky-300"
                  style={{ width: `${progress}%`, transition: "width 1s linear" }}
                />
                <span className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                  <span ref={labelRef} className="text-midnight">
                    {done ? "Move Forward" : countdown}
                  </span>
                  <span
                    className="absolute inset-0 flex items-center justify-center text-white"
                    style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
                  >
                    {done ? "Move Forward" : countdown}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop pinned bottom countdown card */}
      <div className="hidden md:block fixed inset-x-0 bottom-0 z-40">
        <div className="px-6 pb-6">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-black/5 ring-1 ring-black/5">
            <div className="px-6 pt-4 text-center text-midnight text-[15px] leading-snug font-nhd font-medium">
              <span className="font-extrabold">Watch This</span> <span className="italic">Quick Video Of A</span> <span className="font-extrabold">Home Like Your&apos;s</span> <span className="font-extrabold">Being Cleaned</span>
            </div>
            <div className="p-4 pt-3">
              <button
                ref={buttonRef}
                className={`relative w-full overflow-hidden rounded-full h-14 px-6 py-0 text-lg font-extrabold tracking-tight transition-colors ${!done ? "opacity-70 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
                style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.12)' }}
                disabled={!done}
                onClick={() => { if (done) { try { track({ name: 'demo_move_forward_click', params: { device: 'desktop' } }); } catch {}; stopVideo(); router.push('/schedule'); } }}
              >
                <span
                  ref={barRef}
                  className="absolute inset-y-0 left-0 z-10 pointer-events-none bg-sky-300"
                  style={{ width: `${progress}%`, transition: 'width 1s linear' }}
                />
                <span className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                  <span ref={labelRef} className="text-midnight">
                    {done ? 'Move Forward' : countdown}
                  </span>
                  <span
                    className="absolute inset-0 flex items-center justify-center text-white"
                    style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
                  >
                    {done ? 'Move Forward' : countdown}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




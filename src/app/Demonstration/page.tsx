"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function DemonstrationPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(20);
  const [done, setDone] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [showEnableSound, setShowEnableSound] = useState(false);
  // 2-minute visual progress bar state (separate from CTA countdown)
  const [videoBarProgress, setVideoBarProgress] = useState(0); // 0..1
  const barStartRef = useRef<number | null>(null);
  const barRafRef = useRef<number | null>(null);
  const barStartedRef = useRef(false);

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
      if (!running) return;
      const btn = buttonRef.current;
      const label = labelRef.current;
      const bar = barRef.current;
      if (!btn || !label || !bar) return;
      // Visual feedback calculation removed for simplification
      requestAnimationFrame(calc);
    };
    requestAnimationFrame(calc);
    return () => { running = false; };
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

  // YouTube video ID from the URL
  const youtubeVideoId = "zMrXn7V9Ecw";

  // Start progress bar when component mounts (simulating video start)
  useEffect(() => {
    const timer = setTimeout(() => {
      startVideoProgressBar();
      setShowEnableSound(true);
    }, 2000); // Start after 2 seconds to simulate video loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile heading */}
      <div className="md:hidden bg-white text-midnight py-8 px-4">
        <div className="w-full max-w-[900px] mx-auto">
          <h1 className="text-3xl font-black text-center mb-4">
            See Your&apos;s Home Transformed
          </h1>
          <p className="text-lg text-center text-gray-600">
            Watch our team in action as we clean and sanitize every corner
          </p>
        </div>
      </div>

      {/* Desktop heading and review wall removed */}
      <div className="bg-white text-midnight pb-36 md:pb-0">
        <div className="w-full max-w-[900px] mx-auto px-4">
		  <div
			className="mx-auto w-full bg-snow border border-black/10 rounded-2xl shadow-sm overflow-hidden relative h-[calc(100vh-14rem)] md:h-[60vh] md:max-h-[720px]"
		  >
            {/* YouTube Embed */}
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&start=0`}
              title="Cleaning demonstration video"
              className="w-full h-full"
              style={{ objectFit: "cover" }}
              allow="autoplay; encrypted-media"
              allowFullScreen
              onLoad={() => {
                console.log("YouTube video loaded successfully");
                setShowEnableSound(true);
              }}
              onError={() => {
                console.error("YouTube video failed to load");
                setVideoError("Video failed to load. Please refresh the page.");
              }}
            />
            
				{/* 2-minute bottom progress bar */}
				<div className="absolute left-0 right-0 bottom-0 h-1.5 bg-black/20">
					<div className="h-full bg-brand" style={{ width: `${Math.round(videoBarProgress * 100)}%`, transition: 'width 120ms linear' }} />
				</div>

                {showEnableSound && !videoError && (
                    <button
                        onClick={() => {
                            // For YouTube, we can't programmatically unmute, but we can show instructions
                            setShowEnableSound(false);
                            alert("Click the unmute button on the video player to enable sound");
                        }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-5 py-2.5 rounded-full text-sm font-extrabold shadow-lg backdrop-blur-sm"
                    >
                        Enable Sound
                    </button>
                )}

                {videoError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white p-4">
                        <div className="text-center">
                            <p className="text-lg font-bold mb-2">Video Error</p>
                            <p className="text-sm">{videoError}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 bg-white text-black px-4 py-2 rounded-full font-bold"
                            >
                                Refresh Page
                            </button>
                        </div>
                    </div>
                )}
		  </div>

          {/* CTA Section */}
          <div className="mt-8 text-center">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-black text-midnight mb-4">
                Ready to Experience This Level of Clean?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Book your cleaning service today and see the difference for yourself
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-brand h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                {done ? "Time&apos;s up!" : `${countdown} seconds remaining`}
              </p>
            </div>

            {/* CTA Button */}
            <div className="relative inline-block">
              <button
                ref={buttonRef}
                onClick={() => router.push('/schedule')}
                disabled={!done}
                className={`
                  relative px-8 py-4 rounded-full text-lg font-black transition-all duration-300 transform
                  ${done 
                    ? 'bg-brand text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                <span ref={labelRef} className="relative z-10">
                  {done ? "Book Your Cleaning Now" : "Please Wait..."}
                </span>
                <span 
                  ref={barRef}
                  className="absolute inset-0 bg-white rounded-full opacity-20 transition-all duration-300"
                  style={{ 
                    width: done ? '100%' : `${progress}%`,
                    transform: done ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              {done ? "Click the button above to get started!" : "Watch the video while you wait..."}
            </p>
          </div>
        </div>
      </div>

      {/* ParallaxAurora for background effect */}
      {showAurora && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Add your ParallaxAurora component here if needed */}
        </div>
      )}
    </div>
  );
}
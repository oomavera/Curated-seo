"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function DemonstrationPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(20);
  const [done, setDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [posterSrc, setPosterSrc] = useState<string | undefined>(undefined);
  const [preloadMode, setPreloadMode] = useState<"auto" | "metadata">("auto");
  const [needsUserGesture, setNeedsUserGesture] = useState(false);
  const [showEnableSound, setShowEnableSound] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  // 2-minute visual progress bar state (separate from CTA countdown)
  const [videoBarProgress, setVideoBarProgress] = useState(0); // 0..1
  const barStartRef = useRef<number | null>(null);
  const barRafRef = useRef<number | null>(null);
  const barStartedRef = useRef(false);
  // Removed desktop reviews wall per request

  const stopVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.pause();
      v.muted = true;
      v.removeAttribute("src");
      // Remove any <source> children if present
      while (v.firstChild) v.removeChild(v.firstChild);
      v.load();
    } catch {}
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

  // Attempt to load whichever CleanVid source exists, then autoplay once ready
  useEffect(() => {
    // Respect Data Saver: keep autoplay but reduce network cost by limiting initial preload
    try {
      const conn = (navigator as { connection?: { saveData?: boolean } })?.connection;
      if (conn?.saveData) setPreloadMode("metadata");
    } catch {}

    const tryLoad = async () => {
      const sources = [
        // Prefer CleanVid2 in /public (new video)
        { src: "/CleanVid2.mp4", type: "video/mp4" },
        { src: "/CleanVid2.webm", type: "video/webm" },
        { src: "/CleanVid2.mov", type: "video/quicktime" },
        { src: "/CleanVid2.MP4", type: "video/mp4" },
        { src: "/CleanVid2.WEBM", type: "video/webm" },
        { src: "/CleanVid2.MOV", type: "video/quicktime" },
        // Fallbacks to previous CleanVid asset if needed
        { src: "/CleanVid.mp4", type: "video/mp4" },
        { src: "/CleanVid.webm", type: "video/webm" },
        { src: "/CleanVid.mov", type: "video/quicktime" },
        { src: "/CleanVid.MP4", type: "video/mp4" },
        { src: "/CleanVid.WEBM", type: "video/webm" },
        { src: "/CleanVid.MOV", type: "video/quicktime" },
      ];
      // Resolve poster if present (best effort)
      const posterCandidates = [
        // Prefer specific poster for CleanVid2 if available
        "/CleanVid2Poster.webp",
        "/CleanVid2Poster.jpg",
        "/CleanVid2.jpg",
        "/CleanVid2.png",
        // Fallbacks to previous naming
        "/CleanVidPoster.webp",
        "/CleanVidPoster.jpg",
        "/CleanVid.jpg",
        "/CleanVid.png",
      ];
      for (const p of posterCandidates) {
        try {
          const r = await fetch(p, { method: "HEAD" });
          if (r.ok) { setPosterSrc(p); break; }
        } catch {}
      }

      for (const candidate of sources) {
        try {
          const res = await fetch(candidate.src, { method: "HEAD" });
          if (res.ok) {
            console.log(`Video source found: ${candidate.src}`);
            const v = videoRef.current;
            if (!v) return;
            setIsBuffering(true);
            v.src = candidate.src;
            if (posterSrc) { v.poster = posterSrc; }
            // Force load and attempt autoplay as soon as it can play
            const handleCanPlay = () => {
              try { v.muted = true; v.volume = 1.0; } catch {}
              v.play()
                .then(() => {
                  console.log("Video started playing successfully");
                  setShowEnableSound(true);
                  setIsBuffering(false);
                })
                .catch((error) => {
                  console.log("Video autoplay failed:", error);
                  // If autoplay is blocked entirely, request a gesture
                  setNeedsUserGesture(true);
                  setShowEnableSound(true);
                  setIsBuffering(false); // Hide spinner; user gesture will be shown
                });
              v.removeEventListener("canplay", handleCanPlay);
            };
            v.addEventListener("canplay", handleCanPlay);
            // Start the 2-minute progress bar the first time the video actually starts playing
            v.addEventListener("playing", () => { startVideoProgressBar(); setIsBuffering(false); }, { once: true });
            // Buffering indicators
            const onWaiting = () => setIsBuffering(true);
            const onCanPlay = () => setIsBuffering(false);
            const onStalled = () => setIsBuffering(true);
            v.addEventListener("waiting", onWaiting);
            v.addEventListener("canplay", onCanPlay);
            v.addEventListener("stalled", onStalled);
            v.load();
            setVideoError(null);
            // Reset visual bar when new source is set
            setVideoBarProgress(0);
            barStartedRef.current = false;
            // Cleanup buffering listeners when source resolves or on next mount
            const cleanup = () => {
              v.removeEventListener("waiting", onWaiting);
              v.removeEventListener("canplay", onCanPlay);
              v.removeEventListener("stalled", onStalled);
            };
            v.addEventListener("ended", cleanup, { once: true });
            return;
          } else {
            console.log(`Video source not found: ${candidate.src} (${res.status})`);
          }
        } catch (error) {
          console.log(`Error checking video source ${candidate.src}:`, error);
        }
      }
      setVideoError("Video file not found. Please add CleanVid2.mp4 to /public.");
    };
    tryLoad();
  }, [posterSrc]);

  // Keep video running; if tab becomes visible again, ensure playback
  useEffect(() => {
    const onVisibility = () => {
      const v = videoRef.current;
      if (!v) return;
      if (!document.hidden) {
        try { v.volume = 1.0; } catch {}
        v.play().catch(() => { setNeedsUserGesture(true); });
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Cleanup rAF on unmount
  useEffect(() => {
    return () => {
      if (barRafRef.current) cancelAnimationFrame(barRafRef.current);
      stopVideo();
    };
  }, []);

  // Prevent user from pausing; keep volume at max
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPause = () => {
      if (!v.ended && !document.hidden) {
        v.play().catch(() => {});
      }
    };
    const onVolume = () => {
      try { if (v.volume < 1) { v.volume = 1.0; } } catch {}
    };
    v.addEventListener('pause', onPause);
    v.addEventListener('volumechange', onVolume);
    return () => {
      v.removeEventListener('pause', onPause);
      v.removeEventListener('volumechange', onVolume);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-nhd text-midnight">
      {/* Desktop heading and review wall removed */}
      <div className="bg-white text-midnight pb-36 md:pb-0">
        <div className="w-full max-w-[900px] mx-auto px-4">
		  <div
			className="mx-auto w-full bg-snow border border-black/10 rounded-2xl shadow-sm overflow-hidden relative h-[calc(100vh-11rem)] md:h-[calc(100vh-11rem)]"
		  >
                <video
					ref={videoRef}
					playsInline
					autoPlay
                    muted
					preload={preloadMode}
					aria-label="Cleaning demonstration video"
					disablePictureInPicture
					controlsList="nodownload noremoteplayback"
					className="w-full h-full"
					style={{ objectFit: "cover" }}
					onContextMenu={(e) => e.preventDefault()}
				/>
                {/* Loading / buffering overlay */}
                {isBuffering && !videoError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="w-10 h-10 rounded-full border-4 border-white/30 border-t-white animate-spin" aria-label="Loading video" />
                  </div>
                )}
				{/* 2-minute bottom progress bar */}
				<div className="absolute left-0 right-0 bottom-0 h-1.5 bg-black/20">
					<div className="h-full bg-brand" style={{ width: `${Math.round(videoBarProgress * 100)}%`, transition: 'width 120ms linear' }} />
				</div>
                {needsUserGesture && !videoError && (
					<button
						onClick={() => {
							const v = videoRef.current; if (!v) return;
							try { v.muted = false; v.volume = 1.0; } catch {}
                            v.play().then(() => { setNeedsUserGesture(false); setShowEnableSound(false); }).catch(() => {});
						}}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-5 py-2.5 rounded-full text-sm font-extrabold shadow-lg backdrop-blur-sm"
					>
						Enable Sound
					</button>
				)}
                {showEnableSound && !needsUserGesture && !videoError && (
                    <button
                        onClick={() => {
                            const v = videoRef.current; if (!v) return;
                            try { v.muted = false; v.volume = 1.0; } catch {}
                            setShowEnableSound(false);
                        }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-5 py-2.5 rounded-full text-sm font-extrabold shadow-lg backdrop-blur-sm"
                        aria-label="Enable sound"
                    >
                        Enable Sound
                    </button>
                )}
				{videoError && (
					<div className="flex items-center justify-center h-full text-mountain text-sm">
						{videoError}
					</div>
				)}
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
                onClick={() => { if (done) { stopVideo(); router.push('/schedule'); } }}
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




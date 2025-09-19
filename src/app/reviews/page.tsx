"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
// Removed unused UI imports for a cleaner page

// Generate arrays of review image paths (use only reviews2 on this page)
const namedReviewBases = [
  "Allen", "Andrea", "Cristina", "Daniela", "DanielR",
  "Deja", "Hani", "Jackie", "Kenneth", "Kia",
  "Latrell", "lauren", "Madeline", "Marlaren", "Martiza",
  "Meghan", "Nathan", "Nikolas", "Rachel", "Trey"
];
// Reorder so: row 2 = Trey, lauren, Martiza; row 3 = Rachel, Marlaren, Meghan
const secondRowTargets = ["Trey", "lauren", "Martiza", "Maritza"]; // include variant spelling
const thirdRowTargets = ["Rachel", "Marlaren", "Meghan"];
const exists = (name: string) => namedReviewBases.includes(name);
const row2 = secondRowTargets.filter(exists);
const row3 = thirdRowTargets.filter(exists);
const others = namedReviewBases.filter(n => !row2.includes(n) && !row3.includes(n));
const firstRow = others.slice(0, 3);
const remaining = others.slice(3);
const orderedNames = [...firstRow, ...row2, ...row3, ...remaining];
const namedReviews = orderedNames.map(base => `/Gallery/reviews2/${base}.png`);
const allReviews: { src: string }[] = namedReviews.map(src => ({ src }));

export default function ReviewsPage() {
  const [countdown, setCountdown] = useState(10);
  const [done, setDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (done) return;
    if (countdown <= 0) {
      setDone(true);
      return;
    }
    const id = setTimeout(() => setCountdown(v => v - 1), 1000);
    return () => clearTimeout(id);
  }, [countdown, done]);

  const totalSeconds = 10;
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
    window.addEventListener('resize', calc);
    return () => { running = false; window.removeEventListener('resize', calc); };
  }, [done]);

  return (
    <div className="min-h-screen bg-white font-nhd text-midnight">
      {/* Main Content */}
		<div className="bg-white text-midnight pb-36 md:pb-24">{/* extra bottom space for pinned cards */}
			{/* Hero copy at top */}
			<section className="pt-6 sm:pt-10">
				<div className="max-w-7xl mx-auto px-4">
					<h1 className="font-hero font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-center text-midnight">
						Here&apos;s how we transformed the lives of people just like you
					</h1>
				</div>
			</section>
        {/* Customer Review Images Grid - unified wall */}
			<section className="py-3 sm:py-6">
          <div className="max-w-7xl mx-auto px-4">
            {/* Unified wall of reviews */}
					<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 md:gap-2">
              {allReviews.map((item, i) => (
                <div key={i} className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '3 / 4' }}>
                  <Image
                    src={item.src}
                    alt={`Customer review ${i + 1}`}
                    width={640}
                    height={853}
									sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, (max-width: 1536px) 12vw, 10vw"
                    quality={88}
                    className="w-full h-full object-cover"
                    style={{ filter: 'none', mixBlendMode: 'normal', opacity: 1, transform: 'scale(1.28)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Removed testimonials, CTA, and footer per request */}
      </div>

      <style jsx>{`
        @keyframes scrollReviews {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      {/* Mobile pinned bottom countdown card */}
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
        <div className="px-3 pb-3">
          <div className="bg-white rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-black/5 ring-1 ring-black/5">
            <div className="px-5 pt-4 text-center text-midnight text-[13px] leading-snug font-nhd font-medium">
              Before you get your Free voucher... Check out what people like you had to say!
            </div>
            <div className="p-4 pt-3">
              <button
                ref={buttonRef}
                className={`relative w-full overflow-hidden rounded-full h-12 sm:h-14 px-4 py-0 text-[17px] sm:text-lg font-extrabold tracking-tight transition-colors ${!done ? 'opacity-70 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
                style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.12)' }}
                disabled={!done}
                onClick={() => { if (done) { router.push('/Demonstration'); } }}
              >
                <span
                  ref={barRef}
                  className="absolute inset-y-0 left-0 z-10 pointer-events-none bg-sky-300"
                  style={{ width: `${progress}%`, transition: 'width 1s linear' }}
                />
                {/* Dual-label overlay: black base + white clipped to bar width */}
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

		{/* Desktop pinned bottom countdown card */}
		<div className="fixed inset-x-0 bottom-0 z-40 hidden md:block">
			<div className="px-6 pb-6">
				<div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.18)] border border-black/5 ring-1 ring-black/5">
					<div className="px-6 pt-5 text-center text-midnight text-sm leading-snug font-nhd font-medium">
						Before you get your Free voucher... Check out what people like you had to say!
					</div>
					<div className="p-5 pt-3">
						<button
							ref={buttonRef}
							className={`relative w-full overflow-hidden rounded-full h-14 px-6 py-0 text-lg font-extrabold tracking-tight transition-colors ${!done ? 'opacity-70 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
							style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.12)' }}
							disabled={!done}
							onClick={() => { if (done) { router.push('/Demonstration'); } }}
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
    </div>
  );
}

"use client";
import Image from "next/image";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useMemo, useEffect, useRef } from "react";
// import { supabase } from "../lib/supabase";
// import { Lead } from "../types/leads";

// Import calculator components
import { QuoteInput } from "../types/quote";
import { computeQuote, validateQuoteInput } from "../lib/quote";
import { CONFIG } from "../lib/config";
import FrequencyField from "../components/QuoteForm/FrequencyField";
import NumberField from "../components/QuoteForm/NumberField";
import AddonsField from "../components/QuoteForm/AddonsField";
import LeadForm from "../components/LeadModal/LeadForm";
import dynamic from "next/dynamic";

const HouseVisualization = dynamic(() => import("../components/HouseVisualization"), { ssr: false });

const testimonials = [
  {
    name: "Deja J.",
    text: "Absolutely amazing service! My first cleaning was completely free and my bathroom looks spectacular! Will definitely be booking more cleanings with Curated Cleanings!",
    stars: 5,
    img: "/1.webp",
  },
  {
    name: "Hani S.",
    text: "Angelica's service is 10/10. After her service my place smelled so good and everything was cleaned to perfection. Will definitely reach out again for services.",
    stars: 5,
    img: "/2.webp",
  },
  {
    name: "Madeline R.",
    text: "Attention to detail, Trustworthy, Friendly!",
    stars: 5,
    img: "/3.webp",
  },
  {
    name: "Teri L.",
    text: "Angelica was right on time, willing to listen to and address my cleaning needs and was very helpful! Extremely considerate of us and our property! Will definitely be using her regularly.",
    stars: 5,
    img: "/4.webp",
  },
  {
    name: "Lauren H.",
    text: "Angelica was extremely hard working, thorough, and professional. She arrived on time, asked what was important to me about the cleaning, and then delivered even more than I expected with cleaning every nook and cranny... undoubtedly will use her again and will be recommending her to others.",
    stars: 5,
    img: "/5.webp",
  },
  {
    name: "N'kila G.",
    text: "ABSOLUTELY OPTIMAL SERVICES! Angel was very respectful of my space, very THOROUGH! It was sooo dusty in here and I'm no longer sneezing! Angel was also quick! I appreciate her time management and thorough cleaning of my space! I would 100% recommend her services!",
    stars: 5,
    img: "/6.webp",
  },
];

// Optimized animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
};

export default function Home() {
  // Original form state
  // const [formData, setFormData] = useState({
  //   name: '',
  //   address: '',
  //   phone: '',
  //   email: '',
  //   service: ''
  // });

  // Calculator state
  const [quoteInput, setQuoteInput] = useState<QuoteInput>({
    frequency: "monthly",
    bedrooms: 3, // min 3
    bathrooms: 2, // min 2
    addons: [],
  });

  const [showLeadModal, setShowLeadModal] = useState(false);
  const [isCalculatorSubmitting, setIsCalculatorSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Compute quote from input
  const quote = useMemo(() => computeQuote(quoteInput), [quoteInput]);
  
  // Validate quote input
  const validation = useMemo(() => validateQuoteInput(quoteInput), [quoteInput]);

  // Initialize Cal.com calendar widget
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as Window & { Cal?: unknown }).Cal) {
      // Create script element with Cal.com initialization
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
        
        Cal("init", "walkthrough", {origin:"https://app.cal.com"});
        Cal.ns.walkthrough("ui", {"theme":"dark","hideEventTypeDetails":false,"layout":"month_view"});
      `;
      document.head.appendChild(script);
    }
  }, []);

  const handleQuoteInputChange = <K extends keyof QuoteInput>(field: K, value: QuoteInput[K]) => {
    setQuoteInput(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBookNow = () => {
    if (validation.isValid) {
      setShowLeadModal(true);
      setSubmitError(null);
      setSubmitSuccess(null);
    }
  };

  // Remove handleLeadSubmit function

  const handleLeadCancel = () => {
    setShowLeadModal(false);
    setIsCalculatorSubmitting(false);
    setSubmitError(null);
    setSubmitSuccess(null);
  };

  // TESTIMONIALS SECTION
  const [carouselX, setCarouselX] = useState(0);
  const carouselAnimRef = useRef<number | null>(null);
  const speed = 0.02; // px per ms, ultra slow
  const totalCards = testimonials.length * 2;
  const cardWidth = 370; // px, min-w-[350px] + gap
  useEffect(() => {
    let lastTimestamp: number | null = null;
    function animate(ts: number) {
      if (lastTimestamp === null) lastTimestamp = ts;
      const delta = ts - lastTimestamp;
      lastTimestamp = ts;
      setCarouselX((prev) => {
        const next = prev - speed * delta;
        if (Math.abs(next) >= cardWidth * testimonials.length) {
          return 0;
        }
        return next;
      });
      carouselAnimRef.current = requestAnimationFrame(animate);
    }
    carouselAnimRef.current = requestAnimationFrame(animate);
    return () => {
      if (carouselAnimRef.current) cancelAnimationFrame(carouselAnimRef.current);
    };
  }, []);

  // Add mobile detection at the top of the Home component
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 1. Place team photos first in the array
  const galleryImages = [
    "/Gallery/cleans/IMG_2538.webp",
    "/Gallery/cleans/IMG_2603.webp",
    "/Gallery/team/IMG_5963.webp",
    "/Gallery/team/IMG_5984.webp",
    "/Gallery/cleans/IMG_2587.webp",
    "/Gallery/cleans/IMG_0952.webp",
    "/Gallery/cleans/IMG_1910.webp",
    "/Gallery/cleans/IMG_2422.webp",
    "/Gallery/cleans/IMG_1973.webp",
    "/Gallery/cleans/IMG_0935.webp",
    "/Gallery/cleans/IMG_0959.webp",
    "/Gallery/cleans/IMG_1378.webp",
    "/Gallery/cleans/IMG_2537.webp",
    "/Gallery/cleans/IMG_2529.webp",
    "/Gallery/cleans/IMG_2479.webp",
    "/Gallery/cleans/IMG_2420.webp",
    "/Gallery/cleans/IMG_2361.webp",
    "/Gallery/cleans/IMG_2360.webp"
  ];
  // 2. Add state and effect for auto-scrolling
  const [galleryScroll, setGalleryScroll] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setGalleryScroll((prev) => prev + 1);
    }, 30);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (galleryRef.current) {
      galleryRef.current.scrollLeft = galleryScroll;
      // Loop back to start if at end
      if (galleryRef.current.scrollLeft + galleryRef.current.offsetWidth >= galleryRef.current.scrollWidth) {
        setGalleryScroll(0);
      }
    }
  }, [galleryScroll]);

  return (
    <div className="textured-background min-h-screen w-full font-sans text-midnight">
      {/* HERO SECTION - ABOVE THE FOLD */}
      <section className="bg-gradient-to-br from-snow via-arctic/50 to-slopes/20 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex flex-row justify-between items-center py-2 sm:py-4 px-4 sm:px-8 max-w-7xl mx-auto w-full backdrop-blur-sm gap-2 sm:gap-0">
          {/* Mobile: Phone left, Call Now right, Logo centered below; Desktop: Logo left, phone/button right */}
          <div className="flex flex-1 items-center sm:hidden">
            <a 
              href="tel:4072700379" 
              className="text-xs font-semibold tracking-wider text-mountain hover:text-midnight transition-colors duration-300 whitespace-nowrap truncate max-w-[90vw]"
              style={{ minWidth: 0 }}
            >
              (407) 270-0379
            </a>
          </div>
          <div className="hidden sm:flex items-center">
            <Image src="/Logo.png" alt="Curated Cleanings Logo" width={160} height={64} className="h-16 w-auto sm:h-32 sm:w-auto max-w-[60vw]" priority />
          </div>
          <div className="flex-1 flex justify-center sm:hidden">
            <Image src="/Logo.png" alt="Curated Cleanings Logo" width={240} height={96} className="h-24 w-auto max-w-[80vw]" priority />
          </div>
          <div className="flex flex-1 justify-end items-center sm:hidden">
            <a 
              href="tel:4072700379" 
              className="bg-midnight text-snow px-4 py-2 rounded-full font-semibold hover:bg-mountain hover:text-snow transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-xs"
            >
              CALL NOW
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <a 
              href="tel:4072700379" 
              className="text-xl font-semibold tracking-wider text-mountain hover:text-midnight transition-colors duration-300 whitespace-nowrap"
            >
              (407) 270-0379
            </a>
            <a 
              href="tel:4072700379" 
              className="bg-midnight text-snow px-5 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-mountain hover:text-snow transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              CALL NOW
            </a>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-8 max-w-7xl mx-auto w-full">
          {/* Hero Text */}
          <motion.div
            className="text-center mb-4 sm:mb-12"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h1 className="text-2xl xs:text-3xl md:text-4xl xl:text-5xl font-extralight mb-4 leading-tight text-midnight">
              <span className="text-mountain font-bold bg-yellow-100 px-2 py-1 rounded">$100 Off</span> first recurring house cleaning in <span className="text-mountain font-normal">Orlando, Lake Mary, Winter Park, Oviedo & Nearby Cities</span>
            </h1>
          </motion.div>

          {/* Main Sections */}
          <div className="flex flex-row gap-6 mb-8 max-xl:flex-col-reverse">
            {/* Left Section - 3D GUI */}
            {!isMobile && (
              <motion.div 
                className="group relative"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-arctic/40 backdrop-blur-sm border border-slopes/30 rounded-2xl flex flex-col justify-center items-center p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.01]">
                  <div className="text-center w-full">
                    <div className="relative bg-gradient-to-br from-snow to-arctic/80 rounded-xl p-4 border border-slopes/20 shadow-inner">
                      <div className="absolute top-3 left-3 flex gap-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="mt-6">
                        <HouseVisualization quoteInput={quoteInput} />
                      </div>
                    </div>
                    
                    {/* Assurance Circles */}
                    <div className="mt-4 p-2 sm:p-4 bg-gradient-to-br from-arctic/60 to-slopes/30 rounded-xl border border-slopes/20">
                      <div className="flex flex-row flex-wrap sm:grid sm:grid-cols-5 gap-2 sm:gap-4 justify-center items-center">
                        <div className="text-center group">
                          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-arctic to-slopes border-2 border-apres-ski/30 mx-auto mb-1 sm:mb-2 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                            <span className="text-lg">🛡️</span>
                          </div>
                          <div className="text-[10px] sm:text-xs font-semibold text-midnight">1M$ Insured</div>
                          <div className="text-[10px] sm:text-xs text-apres-ski">Bonded Pros</div>
                        </div>
                        
                        <div className="text-center group">
                          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-arctic to-slopes border-2 border-apres-ski/30 mx-auto mb-1 sm:mb-2 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                            <span className="text-lg">✓</span>
                          </div>
                          <div className="text-[10px] sm:text-xs font-semibold text-midnight">Background</div>
                          <div className="text-[10px] sm:text-xs text-apres-ski">Verified</div>
                        </div>
                        
                        <div className="text-center group">
                          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-arctic to-slopes border-2 border-apres-ski/30 mx-auto mb-1 sm:mb-2 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                            <span className="text-lg">💯</span>
                          </div>
                          <div className="text-[10px] sm:text-xs font-semibold text-midnight">Satisfaction</div>
                          <div className="text-[10px] sm:text-xs text-apres-ski">Guaranteed</div>
                        </div>
                        
                        <div className="text-center group">
                          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-arctic to-slopes border-2 border-apres-ski/30 mx-auto mb-1 sm:mb-2 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                            <span className="text-lg">💰</span>
                          </div>
                          <div className="text-[10px] sm:text-xs font-semibold text-midnight">No Hidden</div>
                          <div className="text-[10px] sm:text-xs text-apres-ski">Fees</div>
                        </div>
                        
                        <div className="text-center group col-span-2 md:col-span-1">
                          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-arctic to-slopes border-2 border-apres-ski/30 mx-auto mb-1 sm:mb-2 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                            <span className="text-lg">⭐</span>
                          </div>
                          <div className="text-[10px] sm:text-xs font-semibold text-midnight">5 Star</div>
                          <div className="text-[10px] sm:text-xs text-apres-ski">Google Reviews</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Right Section - Calculator */}
            <motion.div 
              className="group relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="bg-arctic/40 backdrop-blur-sm border border-slopes/30 rounded-2xl flex flex-col p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.01]">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 mb-2 sm:mb-4 px-2 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-mountain/10 to-apres-ski/10 rounded-full border border-mountain/20">
                    <div className="w-2 h-2 bg-gradient-to-r from-mountain to-midnight rounded-full animate-pulse"></div>
                    <h2 className="text-base sm:text-lg font-semibold text-midnight tracking-wider">Get Estimate Now</h2>
                  </div>
                </div>
                
                {/* Quote Form */}
                <div className="space-y-4 flex-grow">
                  <div className="bg-gradient-to-r from-arctic/60 to-snow rounded-lg p-3 border border-slopes/30">
                    <FrequencyField
                      value={quoteInput.frequency}
                      onChange={(frequency) => handleQuoteInputChange('frequency', frequency)}
                      error={validation.errors.frequency}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-r from-arctic/60 to-snow rounded-lg p-3 border border-slopes/30">
                      <NumberField
                        label={CONFIG.COPY.bedroomsLabel}
                        value={quoteInput.bedrooms}
                        onChange={(bedrooms) => handleQuoteInputChange('bedrooms', bedrooms)}
                        min={3}
                        max={8}
                        error={validation.errors.bedrooms}
                      />
                    </div>

                    <div className="bg-gradient-to-r from-arctic/60 to-snow rounded-lg p-3 border border-slopes/30">
                      <NumberField
                        label={CONFIG.COPY.bathroomsLabel}
                        value={quoteInput.bathrooms}
                        onChange={(bathrooms) => handleQuoteInputChange('bathrooms', bathrooms)}
                        min={2}
                        max={8}
                        error={validation.errors.bathrooms}
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-arctic/60 to-snow rounded-lg p-3 border border-slopes/30">
                    <AddonsField
                      value={quoteInput.addons}
                      onChange={(addons) => handleQuoteInputChange('addons', addons)}
                      error={validation.errors.addons}
                    />
                  </div>
                </div>

                {/* Price and Book Now */}
                <div className="mt-4 pt-4 border-t border-slopes/30">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-mountain to-midnight text-snow rounded-lg px-4 py-3 shadow-lg flex-shrink-0">
                      <div className="text-xs text-mountain">Price</div>
                      <div className="text-xl font-bold relative text-midnight">
                        <span className="blur-md select-none">
                          ${quote.subtotal.toFixed(0)}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleBookNow}
                      disabled={!validation.isValid || isCalculatorSubmitting}
                      className="flex-1 bg-midnight text-snow px-4 py-3 rounded-lg text-base font-bold hover:bg-mountain hover:text-snow transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isCalculatorSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-arctic border-t-transparent rounded-full animate-spin"></div>
                          PROCESSING...
                        </span>
                      ) : (
                        'SEE ESTIMATE'
                      )}
                    </button>
                  </div>
                </div>

                {submitError && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg shadow-sm">
                    <p className="text-sm text-red-800">{submitError}</p>
                  </div>
                )}

                {submitSuccess && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                    <p className="text-sm text-green-800">{submitSuccess}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Photo Gallery Section */}
          <section className="py-2 flex flex-col items-center bg-transparent">
            <div className="relative w-full max-w-5xl h-40 sm:h-80 overflow-hidden">
              <div
                ref={galleryRef}
                className="flex h-full items-center gap-4 sm:gap-8 overflow-x-auto scrollbar-hide no-scrollbar"
                style={{
                  width: "100%",
                  scrollBehavior: "smooth",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none"
                }}
              >
                {galleryImages.map((src, i) => (
                  <div key={i} className="relative min-w-[175px] sm:min-w-[350px] max-w-xs rounded-3xl overflow-hidden shadow-lg h-40 sm:h-80 flex items-center justify-center border border-slopes/20 bg-snow">
                    <Image 
                      src={src} 
                      alt={`Gallery photo ${i+1}`} 
                      width={350}
                      height={320}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      priority={i < 2}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Customer Reviews Section - moved here */}
          <section id="testimonials" className="py-6 sm:py-12 flex flex-col items-center bg-transparent">
            <div className="relative w-full max-w-5xl h-40 sm:h-80 overflow-hidden">
              <div
                className="flex h-full items-center gap-4 sm:gap-8"
                style={{
                  width: `${cardWidth * totalCards}px`,
                  transform: `translateX(${carouselX}px)`,
                  transition: 'none',
                }}
              >
                {testimonials.concat(testimonials).map((t, i) => (
                  <div key={i} className="relative min-w-[175px] sm:min-w-[350px] max-w-xs rounded-3xl overflow-hidden shadow-lg h-40 sm:h-80 flex flex-col items-center justify-center border border-slopes/20 bg-snow">
                    <div className="absolute inset-0">
                      <Image 
                        src={t.img} 
                        alt={t.name} 
                        width={350}
                        height={320}
                        className="object-cover w-full h-full"
                        priority={i < 2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 max-w-4xl text-center text-xl text-midnight font-light leading-relaxed">
              At CURATED CLEANINGS, our customers are at the heart of everything we do. We believe that a truly exceptional cleaning experience starts with genuine care and servant hood, because when you invite us into your home, it&apos;s not just a job; it&apos;s a relationship built on trust and respect. That&apos;s why we listen first, train for excellency, and we treat your home like our home.
            </div>
          </section>

          {/* PACKAGES SECTION */}
          <section id="packages" className="py-12 flex flex-col items-center bg-gradient-to-b from-snow to-arctic/30">
            {/* Standard Cleaning Card */}
            <div className="mb-12 w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl border border-slopes/30 p-4 sm:p-10 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <h2 className="text-2xl sm:text-3xl tracking-[0.2em] text-center mb-2 font-light text-midnight">STANDARD HOUSE CLEANING</h2>
              <div className="text-center text-sm sm:text-base text-mountain mb-2 font-light">A light clean, thorough clean</div>
              <div className="text-center text-sm sm:text-base text-mountain mb-4 sm:mb-6 font-light">estimate starting at $125</div>
              <ul className="text-base sm:text-lg text-midnight flex flex-col gap-2 sm:gap-4 mb-6 sm:mb-10 font-light leading-snug sm:leading-relaxed">
                <li>Dusting all surfaces (furniture, shelves, baseboards)</li>
                <li>Vacuuming carpets and rugs</li>
                <li>Sweeping and mopping floors</li>
                <li>Cleaning and disinfecting bathroom(s): toilet, sink, shower/tub, mirrors</li>
                <li>Wiping kitchen counters and exterior of appliances (fridge, oven, microwave)</li>
                <li>Emptying trash bins and replacing liners</li>
                <li>Making beds (not changing linens)</li>
              </ul>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-12">
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded-full border border-mountain py-2 px-6 sm:py-4 sm:px-10 text-sm sm:text-base tracking-[0.2em] sm:tracking-[0.3em] font-medium bg-mountain text-snow hover:bg-midnight transition-colors">GET ESTIMATE</button>
                <a href="tel:4072700379" className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-midnight text-snow hover:bg-mountain transition-colors text-xl sm:text-2xl shadow-lg" aria-label="Call Curated Cleanings">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.3 1.2a2 2 0 01-.45 1.95l-.96.96a16.001 16.001 0 006.586 6.586l.96-.96a2 2 0 011.95-.45l1.2.3A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z" />
                  </svg>
                </a>
              </div>
            </div>
            {/* Deep Clean Card */}
            <div className="mb-12 w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl border border-slopes/30 p-4 sm:p-10 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <h2 className="text-2xl sm:text-3xl tracking-[0.2em] text-center mb-2 font-light text-midnight">DEEP CLEANING SERVICES</h2>
              <div className="text-center text-sm sm:text-base text-mountain mb-2 font-light">Here comes that deep scrubbing</div>
              <div className="text-center text-sm sm:text-base text-mountain mb-4 sm:mb-6 font-light">estimate starting at $150</div>
              <ul className="text-base sm:text-lg text-midnight flex flex-col gap-2 sm:gap-4 mb-6 sm:mb-10 font-light leading-snug sm:leading-relaxed">
                <li>Everything the Standard Clean provides, plus</li>
                <li>Dusting of baseboards</li>
                <li>Back of the toilet</li>
                <li>Inside the Microwave</li>
                <li>Exterior of Kitchen Cabinets</li>
                <li>Change Bed Linens</li>
              </ul>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-12">
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded-full border border-mountain py-2 px-6 sm:py-4 sm:px-10 text-sm sm:text-base tracking-[0.2em] sm:tracking-[0.3em] font-medium bg-mountain text-snow hover:bg-midnight transition-colors">GET ESTIMATE</button>
                <a href="tel:4072700379" className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-midnight text-snow hover:bg-mountain transition-colors text-xl sm:text-2xl shadow-lg" aria-label="Call Curated Cleanings">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.3 1.2a2 2 0 01-.45 1.95l-.96.96a16.001 16.001 0 006.586 6.586l.96-.96a2 2 0 011.95-.45l1.2.3A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z" />
                  </svg>
                </a>
              </div>
            </div>
          </section>

          {/* SERVICE AREA SECTION */}
          <section className="py-12 flex flex-col items-center bg-gradient-to-br from-arctic/20 to-snow">
            <div className="max-w-4xl text-center">
              <h3 className="text-3xl font-light mb-6 text-midnight">Serving Oviedo and Surrounding Areas</h3>
              <p className="text-lg text-mountain mb-8 font-light leading-relaxed">
                Proudly providing professional house cleaning services throughout Central Florida. Our experienced team serves homeowners in:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-base text-midnight">
                <div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20 transform transition-transform duration-200 hover:scale-105">
                  <strong>Orlando, FL</strong><br />
                  <span className="text-sm text-mountain">32801, 32803</span>
                </div>
                <div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20 transform transition-transform duration-200 hover:scale-105">
                  <strong>Winter Park, FL</strong><br />
                  <span className="text-sm text-mountain">32789, 32792</span>
                </div>
                <div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20 transform transition-transform duration-200 hover:scale-105">
                  <strong>Lake Mary, FL</strong><br />
                  <span className="text-sm text-mountain">32746</span>
                </div>
                <div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20 transform transition-transform duration-200 hover:scale-105">
                  <strong>Oviedo, FL</strong><br />
                  <span className="text-sm text-mountain">32765, 32766</span>
                </div>
                <div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20 transform transition-transform duration-200 hover:scale-105">
                  <strong>Apopka, FL</strong><br />
                  <span className="text-sm text-mountain">32703, 32712</span>
                </div>
                <div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20 transform transition-transform duration-200 hover:scale-105">
                  <strong>Longwood, FL</strong><br />
                  <span className="text-sm text-mountain">32750, 32779</span>
                </div>
                <div className="p-4 bg-snow/80 rounded-lg shadow-sm border border-slopes/20 transform transition-transform duration-200 hover:scale-105">
                  <strong>Altamonte Springs, FL</strong><br />
                  <span className="text-sm text-mountain">32701, 32714</span>
                </div>
              </div>
            </div>
          </section>

          {/* ESTIMATE SECTION */}
          <section id="estimate" className="py-24 flex flex-col items-center">
            <div className="text-center text-base text-black mb-8">Call or text us to schedule your free estimate and receive a detailed cleaning proposal</div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-12">
              <a href="tel:4072700379" className="flex items-center gap-4 text-xl text-black hover:text-gray-700 transition-colors">
                <FaPhone className="text-2xl" />
                <span>(407) 270-0379</span>
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
              Curated Cleanings provides trusted house cleaning and maid services in Oviedo, Winter Park, Lake Mary, and surrounding Central Florida areas. Licensed, insured, and 5-star rated. Call (407) 270-0379 or email admin@curatedcleanings.com for a free estimate.
            </div>
            <div className="flex gap-6 text-base mt-2">
              <a href="mailto:admin@curatedcleanings.com" aria-label="Email" className="hover:text-blue-600 transition-colors flex items-center gap-2">
                <FaEnvelope /> admin@curatedcleanings.com
              </a>
              <a href="tel:4072700379" aria-label="Phone" className="hover:text-blue-600 transition-colors flex items-center gap-2">
                <FaPhone /> (407) 270-0379
              </a>
            </div>
            <div className="text-xs text-mountain mt-2">© Curated Cleanings. All rights reserved.</div>
          </footer>
        </div>

        {/* Hidden Cal.com trigger button */}
        <button
          id="cal-trigger-button"
          data-cal-link="curatedcleanings/walkthrough"
          data-cal-namespace="walkthrough"
          data-cal-config='{"layout":"month_view","theme":"dark"}'
          style={{ display: 'none' }}
          aria-hidden="true"
        >
          Hidden Cal Trigger
        </button>

        {/* Lead Capture Modal */}
        {showLeadModal && (
          <LeadForm
            quote={quote}
            onCancel={handleLeadCancel}
            isSubmitting={isCalculatorSubmitting}
          />
        )}
      </section>
    </div>
  );
}

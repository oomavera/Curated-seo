import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import logo from "../../public/Logo2.png";
import { QuoteInput } from "../types/quote";
import { computeQuote, validateQuoteInput } from "../lib/quote";
import { CONFIG } from "../lib/config";
import FrequencyField from "./QuoteForm/FrequencyField";
import NumberField from "./QuoteForm/NumberField";
import AddonsField from "./QuoteForm/AddonsField";
import { usePrefersReducedMotion } from "../utils/usePrefersReducedMotion";

const HouseVisualization = dynamic(() => import("./HouseVisualization"), { ssr: false });
const DynamicLeadForm = dynamic(() => import("./LeadModal/LeadForm"), { ssr: false });

interface CityPageLayoutProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  children: React.ReactNode;
}

// Generate array of review image paths and randomize order - WebP optimized
const reviewImages = Array.from({ length: 22 }, (_, i) => `/Gallery/reviews/${i + 1}.webp`)
  .sort(() => Math.random() - 0.5);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
};

export default function CityPageLayout({
  title,
  subtitle,
  children,
}: CityPageLayoutProps) {
  const [quoteInput, setQuoteInput] = useState<QuoteInput>({
    frequency: "monthly",
    bedrooms: 3,
    bathrooms: 2,
    addons: [],
  });

  const [showLeadModal, setShowLeadModal] = useState(false);
  const [isCalculatorSubmitting, setIsCalculatorSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const quote = useMemo(() => computeQuote(quoteInput), [quoteInput]);
  const validation = useMemo(() => validateQuoteInput(quoteInput), [quoteInput]);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Removed Cal.com

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

  const handleLeadCancel = () => {
    setShowLeadModal(false);
    setIsCalculatorSubmitting(false);
    setSubmitError(null);
    setSubmitSuccess(null);
  };


  // Photo gallery
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const galleryImages = [
    "/Gallery/team/IMG_5963.webp",
    "/Gallery/cleans/IMG_2538.webp",
    "/Gallery/cleans/IMG_2603.webp",
    "/Gallery/cleans/IMG_2587.webp",
    "/Gallery/team/IMG_5984.webp",
    "/Gallery/cleans/IMG_0952.webp",
    "/Gallery/cleans/IMG_1910.webp",
    "/Gallery/cleans/IMG_2422.webp",
    "/Gallery/team/ChatGPT Image Aug 23, 2025, 11_33_53 AM.webp",
    "/Gallery/cleans/IMG_1973.webp",
    "/Gallery/cleans/IMG_0935.webp",
    "/Gallery/cleans/IMG_0959.webp",
    "/Gallery/team/ChatGPT Image Aug 24, 2025, 09_12_39 AM.webp",
    "/Gallery/cleans/IMG_1378.webp",
    "/Gallery/cleans/IMG_2537.webp",
    "/Gallery/cleans/IMG_2529.webp",
    "/Gallery/team/IMG_6841(1).webp",
    "/Gallery/cleans/IMG_2479.webp",
    "/Gallery/cleans/IMG_2420.webp",
    "/Gallery/cleans/IMG_2361.webp",
    "/Gallery/cleans/IMG_2360.webp"
  ];

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
      if (galleryRef.current.scrollLeft + galleryRef.current.offsetWidth >= galleryRef.current.scrollWidth) {
        setGalleryScroll(0);
      }
    }
  }, [galleryScroll]);

  return (
    <div id="main-content" className="textured-background min-h-screen w-full font-sans text-midnight">
      {/* HERO SECTION - ABOVE THE FOLD */}
      <section className="bg-gradient-to-br from-snow via-arctic/50 to-slopes/20 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex flex-row justify-between items-center py-2 sm:py-4 px-4 sm:px-8 max-w-7xl mx-auto w-full backdrop-blur-sm gap-2 sm:gap-0">
          <div className="flex flex-1 items-center sm:hidden">
            <a 
              href="tel:+14074701780" 
              className="text-xs font-semibold tracking-wider text-mountain hover:text-midnight transition-colors duration-300 whitespace-nowrap truncate max-w-[90vw]"
              style={{ minWidth: 0 }}
            >
              (407) 470-1780
            </a>
          </div>
          <div className="hidden sm:flex items-center">
            <Image src={logo} alt="Curated Cleanings Logo" width={160} height={64} priority placeholder="blur" />
          </div>
          <div className="flex-1 flex justify-center sm:hidden">
            <Image src={logo} alt="Curated Cleanings Logo" width={240} height={96} className="h-24 w-auto max-w-[80vw]" />
          </div>
          <div className="flex flex-1 justify-end items-center sm:hidden">
            <a 
              href="tel:+14074701780" 
              className="bg-midnight text-snow px-4 py-2 rounded-full font-semibold hover:bg-mountain hover:text-snow transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-xs"
            >
              CALL NOW
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <a 
              href="tel:+14074701780" 
              className="text-xl font-semibold tracking-wider text-mountain hover:text-midnight transition-colors duration-300 whitespace-nowrap"
            >
              (407) 470-1780
            </a>
            <a 
              href="tel:+14074701780" 
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
            initial={prefersReducedMotion ? false : "initial"}
            animate={prefersReducedMotion ? false : "animate"}
            variants={fadeInUp}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
          >
            <h1 className="text-2xl xs:text-3xl md:text-4xl xl:text-5xl font-extralight mb-2 leading-tight text-midnight">
              {title}
            </h1>
            <div className="text-base xs:text-lg md:text-xl font-light text-mountain mb-4">
              {subtitle}
            </div>
          </motion.div>

          {/* Main Sections */}
          <div className="flex flex-row gap-6 mb-8 max-xl:flex-col-reverse justify-center items-center">
            {/* Left Section - 3D GUI */}
            {!isMobile && (
              <motion.div 
                className="group relative"
                initial={prefersReducedMotion ? false : { opacity: 0, x: -50 }}
                animate={prefersReducedMotion ? false : { opacity: 1, x: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.3 }}
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
              initial={prefersReducedMotion ? false : { opacity: 0, x: 50 }}
              animate={prefersReducedMotion ? false : { opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.5 }}
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
            <div className="relative w-full max-w-6xl h-60 sm:h-96 overflow-hidden">
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
                  <div key={i} className="relative min-w-[220px] sm:min-w-[400px] max-w-sm sm:max-w-lg rounded-3xl overflow-hidden shadow-lg h-60 sm:h-96 flex items-center justify-center border border-slopes/20 bg-snow">
                    <Image 
                      src={src} 
                      alt={`Gallery photo ${i+1}`} 
                      width={400}
                      height={380}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Customer Reviews Grid Section */}
          <section id="reviews" className="py-6 sm:py-12 relative z-10">
            <div className="max-w-7xl mx-auto px-4">
              {/* Reviews Image Grid - 2x2 on mobile, 4x4 on desktop */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {reviewImages.slice(0, 8).map((imageSrc, i) => (
                  <div key={i} className="relative py-2">
                    <Image 
                      src={imageSrc} 
                      alt={`Customer review ${i + 1}`} 
                      width={800}
                      height={800}
                      className="w-full h-auto"
                      style={{ 
                        filter: 'none',
                        mixBlendMode: 'normal',
                        opacity: 1,
                        backdropFilter: 'none'
                      } as React.CSSProperties}
                      loading={i < 4 ? "eager" : "lazy"}
                      priority={i < 4}
                      sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 22vw"
                      quality={95}
                      placeholder="empty"
                    />
                  </div>
                ))}
              </div>
              
              {/* Show fewer reviews on city pages to keep focus on local content */}
              {reviewImages.length > 8 && (
                <div className="text-center mt-6">
                  <p className="text-sm text-mountain opacity-75">
                    Showing 8 of {reviewImages.length} customer reviews
                  </p>
                </div>
              )}
              
              {/* Company Description */}
              <div className="mt-16 max-w-4xl mx-auto text-left text-lg text-black font-light leading-relaxed">
                <div className="mb-6 text-center">
                  <h2 className="text-6xl font-black mb-6 text-black font-sans tracking-tight">Without Us</h2>
                  <p className="text-black">After a 10-hour shift, you&apos;re still brushing, scrubbing, and mopping. On your knees cleaning toilets, wiping mirrors that never come streak-free, sneezing from dust, sick from fumes. Hours gone—time stolen from family, rest, or building your future. Or worse: you hire a cleaner who shows up late, rushes, leaves the job half-done, and never comes back. Guests notice. Family judges. And you&apos;re stuck in the same cycle: tired, behind, frustrated.</p>
                </div>
                
                <div className="mb-6 text-center">
                  <h2 className="text-6xl font-black mb-6 text-black font-sans tracking-tight">With Curated Cleanings</h2>
                  <p className="text-black">Instead, imagine walking in the door to a spotless, fresh, perfectly organized home—without lifting a finger. One call, and your home stays effortlessly clean. You gain back hours every week. You relax with family. You focus on what matters. Guests are impressed. Your kids learn order. Your health improves in a disinfected, clutter-free space. Even your relationships thrive when the stress of cleaning is gone.</p>
                </div>
                
              </div>
            </div>
          </section>
        </div>

        {/* Cal.com removed */}

        {/* Lead Capture Modal */}
        {showLeadModal && (
          <DynamicLeadForm
            quote={quote}
            onCancel={handleLeadCancel}
            isSubmitting={isCalculatorSubmitting}
          />
        )}
      </section>

      {/* BELOW THE FOLD CONTENT */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {children}
      </main>
    </div>
  );
} 
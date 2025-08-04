"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";

// Import calculator components
import { QuoteInput } from "../../types/quote";
import { computeQuote, validateQuoteInput } from "../../lib/quote";
import { CONFIG } from "../../lib/config";
import FrequencyField from "../../components/QuoteForm/FrequencyField";
import NumberField from "../../components/QuoteForm/NumberField";
import AddonsField from "../../components/QuoteForm/AddonsField";
import { usePrefersReducedMotion } from "../../utils/usePrefersReducedMotion";
import logo from "../../../public/Logo.png";

const HouseVisualization = dynamic(() => import("../../components/HouseVisualization"), { ssr: false });
const DynamicLeadForm = dynamic(() => import("../../components/LeadModal/LeadForm"), { ssr: false });

// Optimized animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
};

export default function BookOnline() {
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
  const [isMobile, setIsMobile] = useState(false);

  // Compute quote from input
  const quote = useMemo(() => computeQuote(quoteInput), [quoteInput]);
  
  // Validate quote input
  const validation = useMemo(() => validateQuoteInput(quoteInput), [quoteInput]);

  const prefersReducedMotion = usePrefersReducedMotion();

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
        
        Cal("init", "firstclean", {origin:"https://app.cal.com"});
        Cal.ns.firstclean("ui", {"theme":"light","hideEventTypeDetails":false,"layout":"month_view"});
      `;
      document.head.appendChild(script);
    }
  }, []);

  // Add mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

  const handleLeadCancel = () => {
    setShowLeadModal(false);
    setIsCalculatorSubmitting(false);
    setSubmitError(null);
    setSubmitSuccess(null);
  };

  return (
    <div className="textured-background min-h-screen w-full font-sans text-midnight">
      {/* Header */}
      <header className="bg-gradient-to-br from-snow via-arctic/50 to-slopes/20 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image src={logo} alt="Curated Cleanings Logo" width={120} height={48} priority placeholder="blur" />
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="tel:4072700379" 
              className="text-lg font-semibold tracking-wider text-mountain hover:text-midnight transition-colors duration-300"
            >
              (407) 270-0379
            </a>
            <Link 
              href="/" 
              className="bg-mountain text-snow px-4 py-2 rounded-full font-semibold hover:bg-midnight transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="bg-gradient-to-br from-snow via-arctic/50 to-slopes/20 py-12">
        <div className="max-w-7xl mx-auto px-8">
          {/* Page Title */}
          <motion.div
            className="text-center mb-12"
            initial={prefersReducedMotion ? false : "initial"}
            animate={prefersReducedMotion ? false : "animate"}
            variants={fadeInUp}
          >
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-extralight mb-4 leading-tight text-midnight">
              Book Your House Cleaning Online
            </h1>
            <div className="text-lg md:text-xl font-light text-mountain mb-6">
              Get an instant estimate and schedule your cleaning service
            </div>
          </motion.div>

          {/* Main Sections */}
          <div className="flex flex-row gap-8 justify-center items-start max-xl:flex-col-reverse">
            {/* Left Section - 3D GUI */}
            {!isMobile && (
              <motion.div 
                className="group relative flex-1 max-w-lg"
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
                    <div className="mt-4 p-4 bg-gradient-to-br from-arctic/60 to-slopes/30 rounded-xl border border-slopes/20">
                      <div className="grid grid-cols-3 gap-4 justify-center items-center">
                        <div className="text-center group">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-arctic to-slopes border-2 border-apres-ski/30 mx-auto mb-2 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                            <span className="text-lg">🛡️</span>
                          </div>
                          <div className="text-xs font-semibold text-midnight">Insured</div>
                        </div>
                        
                        <div className="text-center group">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-arctic to-slopes border-2 border-apres-ski/30 mx-auto mb-2 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                            <span className="text-lg">✓</span>
                          </div>
                          <div className="text-xs font-semibold text-midnight">Verified</div>
                        </div>
                        
                        <div className="text-center group">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-arctic to-slopes border-2 border-apres-ski/30 mx-auto mb-2 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                            <span className="text-lg">⭐</span>
                          </div>
                          <div className="text-xs font-semibold text-midnight">5 Star</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Right Section - Calculator */}
            <motion.div 
              className="group relative flex-1 max-w-lg"
              initial={prefersReducedMotion ? false : { opacity: 0, x: 50 }}
              animate={prefersReducedMotion ? false : { opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.5 }}
            >
              <div className="bg-arctic/40 backdrop-blur-sm border border-slopes/30 rounded-2xl flex flex-col p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.01]">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-mountain/10 to-apres-ski/10 rounded-full border border-mountain/20">
                    <div className="w-2 h-2 bg-gradient-to-r from-mountain to-midnight rounded-full animate-pulse"></div>
                    <h2 className="text-lg font-semibold text-midnight tracking-wider">Customize Your Service</h2>
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
                <div className="mt-6 pt-4 border-t border-slopes/30">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-mountain to-midnight text-snow rounded-lg px-4 py-3 shadow-lg flex-shrink-0">
                      <div className="text-xs text-arctic">Estimated Price</div>
                      <div className="text-xl font-bold">
                        ${quote.subtotal.toFixed(0)}
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
                        'BOOK NOW'
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
        </div>
      </section>

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

      {/* Lead Capture Modal */}
      {showLeadModal && (
        <DynamicLeadForm
          quote={quote}
          onCancel={handleLeadCancel}
          isSubmitting={isCalculatorSubmitting}
        />
      )}
    </div>
  );
}
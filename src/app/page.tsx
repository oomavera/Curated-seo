"use client";
import Image from "next/image";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useMemo, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
// import { Lead } from "../types/leads";

// Import calculator components
import { QuoteInput, LeadForm as LeadFormType, LeadPayload } from "../types/quote";
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
    img: "/1.jpg",
  },
  {
    name: "Hani S.",
    text: "Angelica's service is 10/10. After her service my place smelled so good and everything was cleaned to perfection. Will definitely reach out again for services.",
    stars: 5,
    img: "/2.jpg",
  },
  {
    name: "Madeline R.",
    text: "Attention to detail, Trustworthy, Friendly!",
    stars: 5,
    img: "/3.jpg",
  },
  {
    name: "Teri L.",
    text: "Angelica was right on time, willing to listen to and address my cleaning needs and was very helpful! Extremely considerate of us and our property! Will definitely be using her regularly.",
    stars: 5,
    img: "/4.jpg",
  },
  {
    name: "Lauren H.",
    text: "Angelica was extremely hard working, thorough, and professional. She arrived on time, asked what was important to me about the cleaning, and then delivered even more than I expected with cleaning every nook and cranny... undoubtedly will use her again and will be recommending her to others.",
    stars: 5,
    img: "/5.jpg",
  },
  {
    name: "N'kila G.",
    text: "ABSOLUTELY OPTIMAL SERVICES! Angel was very respectful of my space, very THOROUGH! It was sooo dusty in here and I'm no longer sneezing! Angel was also quick! I appreciate her time management and thorough cleaning of my space! I would 100% recommend her services!",
    stars: 5,
    img: "/6.jpg",
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
    bedrooms: 2,
    bathrooms: 1,
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

  const handleLeadSubmit = async (leadData: LeadFormType) => {
    setIsCalculatorSubmitting(true);
    setSubmitError(null);

    try {
      const leadPayload: LeadPayload = {
        ...leadData,
        quote
      };

      // Format address as string for current database structure
      const addressString = `${leadPayload.address.street}, ${leadPayload.address.city}${leadPayload.address.state ? `, ${leadPayload.address.state}` : ''}${leadPayload.address.zip ? ` ${leadPayload.address.zip}` : ''}`;

      // Create a name with quote info until migration is run
      const nameWithQuote = `${leadPayload.name} [EST: $${quote.subtotal} - ${quoteInput.bedrooms}bed/${quoteInput.bathrooms}bath - ${quoteInput.frequency}]`;

      // Insert lead into Supabase (using current database structure)
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          name: nameWithQuote,
          phone: leadPayload.phone,
          email: leadPayload.email,
          address: addressString,
          service: 'standard' // Use existing service type for now
        }])
        .select();

      if (error) {
        throw error;
      }

      // Success - close modal and show success message
      setShowLeadModal(false);
      setIsCalculatorSubmitting(false);
      setSubmitError(null);
      setSubmitSuccess('✅ Lead saved! Opening calendar to schedule your first clean...');
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitSuccess(null), 5000);
      
      // Open Cal.com calendar popup
      setTimeout(() => {
        // Add metadata to the booking
        const bookingData = {
          lead_id: data[0].id,
          price: quote.subtotal,
          bedrooms: quoteInput.bedrooms,
          bathrooms: quoteInput.bathrooms,
          frequency: quoteInput.frequency,
          addons: quoteInput.addons.join(', ')
        };
        
        // Store booking data for pre-filling
        localStorage.setItem('estimate_booking_data', JSON.stringify(bookingData));
        
        // Look for the hidden Cal.com trigger button and click it
        const calTrigger = document.getElementById('cal-trigger-button');
        if (calTrigger) {
          calTrigger.click();
        } else {
          // Fallback to external calendar if embed fails
          const calendarUrl = `https://curatedcleanings.cal.com/walkthrough?lead_id=${data[0].id}&price=${quote.subtotal}&beds=${quoteInput.bedrooms}&baths=${quoteInput.bathrooms}`;
          window.open(calendarUrl, '_blank');
        }
      }, 500);

      return; // Don't set isSubmitting to false again below

    } catch (error) {
      console.error('Error submitting lead:', error);
      setSubmitError('Failed to submit your request. Please try again or call us directly.');
      setSubmitSuccess(null);
      setIsCalculatorSubmitting(false);
    }
  };

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

  return (
    <div className="textured-background min-h-screen w-full font-sans text-midnight">
      {/* HERO SECTION - ABOVE THE FOLD */}
      <section className="bg-gradient-to-br from-snow via-arctic/50 to-slopes/20 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center py-4 px-8 max-w-7xl mx-auto w-full backdrop-blur-sm">
          <div className="flex items-center">
            <Image src="/Logo.png" alt="Curated Cleanings Logo" width={320} height={128} className="h-32 w-auto" priority />
          </div>
          <div className="flex items-center gap-6">
            <a 
              href="tel:4072700379" 
              className="text-xl font-semibold tracking-wider text-mountain hover:text-midnight transition-colors duration-300"
            >
              (407) 270-0379
            </a>
            <a 
              href="tel:4072700379" 
              className="bg-midnight text-snow px-8 py-3 rounded-full font-semibold hover:bg-mountain hover:text-snow transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              CALL NOW
            </a>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-8 max-w-7xl mx-auto w-full">
          {/* Hero Text */}
          <motion.div
            className="text-center mb-12"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-extralight mb-4 leading-tight text-midnight">
              Trusted House Cleaning in <span className="text-mountain font-normal">Orlando, Lake Mary, Winter Park, Oviedo & Nearby Cities</span>
            </h1>
          </motion.div>

          {/* Main Sections */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            {/* Left Section - 3D GUI */}
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
                    <div className="mt-6 aspect-video">
                      <HouseVisualization quoteInput={quoteInput} />
                    </div>
                  </div>
                  
                  {/* Assurance Circles */}
                  <div className="mt-4 p-4 bg-gradient-to-br from-arctic/60 to-slopes/30 rounded-xl border border-slopes/20">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
                      <div className="text-center group">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-arctic to-slopes border-2 border-apres-ski/30 mx-auto mb-2 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                          <span className="text-lg">🛡️</span>
                        </div>
                        <div className="text-xs font-semibold text-midnight">1M$ Insured</div>
                        <div className="text-xs text-apres-ski">Bonded Pros</div>
                      </div>
                      
                      <div className="text-center group">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-arctic to-slopes border-2 border-apres-ski/30 mx-auto mb-2 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                          <span className="text-lg">✓</span>
                        </div>
                        <div className="text-xs font-semibold text-midnight">Background</div>
                        <div className="text-xs text-apres-ski">Verified</div>
                      </div>
                      
                      <div className="text-center group">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-arctic to-slopes border-2 border-apres-ski/30 mx-auto mb-2 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                          <span className="text-lg">💯</span>
                        </div>
                        <div className="text-xs font-semibold text-midnight">Satisfaction</div>
                        <div className="text-xs text-apres-ski">Guaranteed</div>
                      </div>
                      
                      <div className="text-center group">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-arctic to-slopes border-2 border-apres-ski/30 mx-auto mb-2 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                          <span className="text-lg">💰</span>
                        </div>
                        <div className="text-xs font-semibold text-midnight">No Hidden</div>
                        <div className="text-xs text-apres-ski">Fees</div>
                      </div>
                      
                      <div className="text-center group col-span-2 md:col-span-1">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-arctic to-slopes border-2 border-apres-ski/30 mx-auto mb-2 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                          <span className="text-lg">⭐</span>
                        </div>
                        <div className="text-xs font-semibold text-midnight">5 Star</div>
                        <div className="text-xs text-apres-ski">Google Reviews</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Section - Calculator */}
            <motion.div 
              className="group relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="bg-arctic/40 backdrop-blur-sm border border-slopes/30 rounded-2xl flex flex-col p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.01]">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-mountain/10 to-apres-ski/10 rounded-full border border-mountain/20">
                    <div className="w-2 h-2 bg-gradient-to-r from-mountain to-midnight rounded-full animate-pulse"></div>
                    <h2 className="text-lg font-semibold text-midnight tracking-wider">INSTANT CALCULATOR</h2>
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
                        min={2}
                        max={CONFIG.QUOTE_MAX_BEDROOMS}
                        error={validation.errors.bedrooms}
                      />
                    </div>

                    <div className="bg-gradient-to-r from-arctic/60 to-snow rounded-lg p-3 border border-slopes/30">
                      <NumberField
                        label={CONFIG.COPY.bathroomsLabel}
                        value={quoteInput.bathrooms}
                        onChange={(bathrooms) => handleQuoteInputChange('bathrooms', bathrooms)}
                        min={1}
                        max={CONFIG.QUOTE_MAX_BATHROOMS}
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

          {/* Customer Reviews Section - moved here */}
          <section id="testimonials" className="py-12 flex flex-col items-center bg-transparent">
            <div className="relative w-full max-w-5xl h-96 overflow-hidden">
              <div
                className="flex h-full items-center gap-8"
                style={{
                  width: `${cardWidth * totalCards}px`,
                  transform: `translateX(${carouselX}px)`,
                  transition: 'none',
                }}
              >
                {testimonials.concat(testimonials).map((t, i) => (
                  <div key={i} className="relative min-w-[350px] max-w-xs rounded-3xl overflow-hidden shadow-lg h-80 flex flex-col items-center justify-center border border-slopes/20 bg-snow">
                    <div className="absolute inset-0">
                      <Image 
                        src={t.img} 
                        alt={t.name} 
                        fill
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
            <div className="mb-12 w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl border border-slopes/30 p-10 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <h2 className="text-3xl tracking-[0.2em] text-center mb-2 font-light text-midnight">STANDARD HOUSE CLEANING</h2>
              <div className="text-center text-base text-mountain mb-2 font-light">A light clean, thorough clean</div>
              <div className="text-center text-base text-mountain mb-6 font-light">estimate starting at $125</div>
              <ul className="text-lg text-midnight flex flex-col gap-4 mb-10 font-light leading-relaxed">
                <li>Dusting all surfaces (furniture, shelves, baseboards)</li>
                <li>Vacuuming carpets and rugs</li>
                <li>Sweeping and mopping floors</li>
                <li>Cleaning and disinfecting bathroom(s): toilet, sink, shower/tub, mirrors</li>
                <li>Wiping kitchen counters and exterior of appliances (fridge, oven, microwave)</li>
                <li>Emptying trash bins and replacing liners</li>
                <li>Making beds (not changing linens)</li>
              </ul>
              <div className="flex justify-center gap-4 mt-12">
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded-full border border-mountain py-4 px-10 text-base tracking-[0.3em] font-medium bg-mountain text-snow hover:bg-midnight transition-colors">GET ESTIMATE</button>
                <a href="tel:4072700379" className="flex items-center justify-center w-14 h-14 rounded-full bg-midnight text-snow hover:bg-mountain transition-colors text-2xl shadow-lg" aria-label="Call Curated Cleanings">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.3 1.2a2 2 0 01-.45 1.95l-.96.96a16.001 16.001 0 006.586 6.586l.96-.96a2 2 0 011.95-.45l1.2.3A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z" />
                  </svg>
                </a>
              </div>
            </div>
            {/* Deep Clean Card */}
            <div className="mb-12 w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl border border-slopes/30 p-10 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
              <h2 className="text-3xl tracking-[0.2em] text-center mb-2 font-light text-midnight">DEEP CLEANING SERVICES</h2>
              <div className="text-center text-base text-mountain mb-2 font-light">Here comes that deep scrubbing</div>
              <div className="text-center text-base text-mountain mb-6 font-light">estimate starting at $150</div>
              <ul className="text-lg text-midnight flex flex-col gap-4 mb-10 font-light leading-relaxed">
                <li>Everything the Standard Clean provides, plus</li>
                <li>Dusting of baseboards</li>
                <li>Back of the toilet</li>
                <li>Inside the Microwave</li>
                <li>Exterior of Kitchen Cabinets</li>
                <li>Change Bed Linens</li>
              </ul>
              <div className="flex justify-center gap-4 mt-12">
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded-full border border-mountain py-4 px-10 text-base tracking-[0.3em] font-medium bg-mountain text-snow hover:bg-midnight transition-colors">GET ESTIMATE</button>
                <a href="tel:4072700379" className="flex items-center justify-center w-14 h-14 rounded-full bg-midnight text-snow hover:bg-mountain transition-colors text-2xl shadow-lg" aria-label="Call Curated Cleanings">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
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
            onSubmit={handleLeadSubmit}
            onCancel={handleLeadCancel}
            isSubmitting={isCalculatorSubmitting}
          />
        )}
      </section>
    </div>
  );
}

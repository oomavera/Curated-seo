"use client";
import Image from "next/image";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "../utils/usePrefersReducedMotion";
import logo from "../../public/Logo2.png";

const QuickEstimateForm = dynamic(() => import("../components/QuickEstimateForm"), { ssr: false });

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


  const prefersReducedMotion = usePrefersReducedMotion();

  // TESTIMONIALS SECTION - Using CSS animations for better performance

  // Removed unused mobile detection code

  // 1. Place team photos first in the array
  const galleryImages = [
    "/Gallery/team/IMG_5963.webp",
    "/Gallery/cleans/IMG_1378.webp",
    "/Gallery/cleans/IMG_2647.webp",
    "/Gallery/cleans/IMG_2655.webp",
    "/Gallery/cleans/IMG_2727.webp",
    "/Gallery/cleans/IMG_2731.webp",
    "/Gallery/cleans/IMG_2780.webp",
    "/Gallery/cleans/IMG_2845.webp",
    "/Gallery/cleans/IMG_2538.webp",
    "/Gallery/cleans/IMG_2603.webp",
    "/Gallery/team/IMG_5984.webp",
    "/Gallery/cleans/IMG_2587.webp",
    "/Gallery/cleans/IMG_0952.webp",
    "/Gallery/cleans/IMG_1910.webp",
    "/Gallery/cleans/IMG_2422.webp",
    "/Gallery/cleans/IMG_1973.webp",
    "/Gallery/cleans/IMG_0935.webp",
    "/Gallery/cleans/IMG_0959.webp",
    "/Gallery/cleans/IMG_2537.webp",
    "/Gallery/cleans/IMG_2529.webp",
    "/Gallery/cleans/IMG_2479.webp",
    "/Gallery/cleans/IMG_2420.webp",
    "/Gallery/cleans/IMG_2361.webp",
    "/Gallery/cleans/IMG_2360.webp"
  ];
  // Smooth CSS-based gallery animation - no JavaScript intervals or state updates needed

  return (
    <div id="main-content" className="textured-background min-h-screen w-full font-sans text-midnight">
      {/* HERO SECTION - ABOVE THE FOLD */}
      <section className="bg-gradient-to-br from-snow via-arctic/50 to-slopes/20 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-center sm:justify-between items-center py-4 sm:py-6 px-4 sm:px-8 max-w-7xl mx-auto w-full backdrop-blur-sm gap-2 sm:gap-4">
          {/* Mobile: Centered Logo First */}
          <div className="flex justify-center items-center sm:hidden order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <Image 
                src={logo} 
                alt="Curated Cleanings Logo" 
                width={360} 
                height={72} 
                className="object-cover max-w-[70vw]" 
                style={{ height: '36px', width: 'auto', objectFit: 'cover', objectPosition: 'center', opacity: 0.8 }}
              />
            </motion.div>
          </div>

          {/* Mobile: Phone and Call Now Button Row */}
          <div className="flex justify-between items-center w-full sm:hidden order-2 mt-2">
            <a 
              href="tel:4072700379" 
              className="text-xs font-semibold tracking-wider text-mountain hover:text-midnight transition-colors duration-300 whitespace-nowrap"
            >
              (407) 270-0379
            </a>
            <a 
              href="tel:4072700379" 
              className="bg-midnight text-snow px-4 py-2 rounded-full font-semibold hover:bg-mountain hover:text-snow transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-xs"
            >
              CALL NOW
            </a>
          </div>

          {/* Desktop Layout */}
          {/* Phone Number - Left */}
          <div className="hidden sm:flex items-center flex-1 -mt-3 sm:-mt-4">
            <a 
              href="tel:4072700379" 
              className="text-xl font-semibold tracking-wider text-mountain hover:text-midnight transition-colors duration-300 whitespace-nowrap"
            >
              (407) 270-0379
            </a>
          </div>
          
          {/* Logo - Center */}
          <div className="hidden sm:flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative mt-2 sm:mt-3"
            >
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
            </motion.div>
          </div>
          
          {/* Navigation & Call Now Button - Right */}
          <div className="hidden sm:flex items-center justify-end flex-1 -mt-3 sm:-mt-4 gap-4">
            <Link 
              href="/blog" 
              className="text-mountain hover:text-midnight transition-colors duration-300 font-medium text-sm sm:text-base hidden sm:block"
            >
              Blog
            </Link>
            <a 
              href="tel:4072700379" 
              className="bg-midnight text-snow px-5 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-mountain hover:text-snow transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-xs sm:text-base"
            >
              CALL NOW
            </a>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-8 max-w-7xl mx-auto w-full mt-8 sm:mt-12">
          {/* Hero Text */}
          <motion.div
            className="text-center mb-4 sm:mb-12"
            initial={prefersReducedMotion ? false : "initial"}
            animate={prefersReducedMotion ? false : "animate"}
            variants={fadeInUp}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
          >
            <h1 className="text-2xl xs:text-3xl md:text-4xl xl:text-5xl font-extralight mb-2 leading-tight text-midnight">
              Trusted House Cleaning for Greater Orlando
            </h1>
            <div className="text-base xs:text-lg md:text-xl font-light text-mountain mb-4">
              Licensed, insured cleaners serving Lake Mary, Winter Park, Oviedo & more - book in 60 seconds
            </div>
          </motion.div>

          {/* Main Sections - Desktop: Left Photo Gallery, Right Form | Mobile: Form Center */}
          <div className="flex flex-row gap-8 mb-8 max-md:flex-col justify-center items-start">
            {/* Left Section - Photo Gallery (Desktop only) */}
            <div className="hidden md:flex flex-1 max-w-lg">
              <div className="gallery-container relative w-full h-96 overflow-hidden rounded-2xl shadow-xl border border-slopes/20 bg-snow">
                <div className="relative w-full h-full">
                  <div 
                    className="gallery-slider flex h-full items-center gap-4 absolute"
                    style={{
                      width: `${galleryImages.length * 370}px`,
                      animation: prefersReducedMotion ? 'none' : `slideGallery ${galleryImages.length * 5}s linear infinite`,
                      transform: 'translate3d(0, 0, 0)',
                      willChange: 'transform'
                    }}
                  >
                    {[...galleryImages, ...galleryImages].map((src, i) => (
                      <div key={i} className="relative min-w-[350px] max-w-xs rounded-2xl overflow-hidden shadow-lg h-full flex items-center justify-center border border-slopes/20 bg-snow">
                        <Image 
                          src={src} 
                          alt={`Gallery photo ${(i % galleryImages.length) + 1}`} 
                          width={350}
                          height={320}
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Lead Form */}
            <div className="flex-1 max-w-lg mx-auto md:mx-0">
              <QuickEstimateForm />
            </div>
          </div>

          {/* Mobile Photo Gallery Section */}
          <section className="py-2 flex flex-col items-center bg-transparent md:hidden">
            <div className="gallery-container relative w-full max-w-5xl h-40 overflow-hidden">
              <div className="relative w-full h-full">
                <div 
                  className="gallery-slider flex h-full items-center gap-4 absolute"
                  style={{
                    width: `${galleryImages.length * 195}px`,
                    animation: prefersReducedMotion ? 'none' : `slideGalleryMobile ${galleryImages.length * 3.5}s linear infinite`,
                    transform: 'translate3d(0, 0, 0)',
                    willChange: 'transform'
                  }}
                >
                  {[...galleryImages, ...galleryImages].map((src, i) => (
                    <div key={i} className="relative min-w-[175px] max-w-xs rounded-3xl overflow-hidden shadow-lg h-40 flex items-center justify-center border border-slopes/20 bg-snow">
                      <Image 
                        src={src} 
                        alt={`Gallery photo ${(i % galleryImages.length) + 1}`} 
                        width={350}
                        height={320}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>



          {/* Customer Reviews Section - moved here */}
          <section id="testimonials" className="py-6 sm:py-12 flex flex-col items-center bg-transparent">
            <div className="testimonials-container relative w-full max-w-5xl h-40 sm:h-80 overflow-hidden rounded-2xl">
              <div className="relative w-full h-full">
                <div 
                  className="testimonials-slider flex h-full items-center gap-4 sm:gap-8 absolute"
                  style={{
                    width: `${testimonials.length * 380}px`,
                    animation: prefersReducedMotion ? 'none' : `slideTestimonials ${testimonials.length * 6}s linear infinite`,
                    transform: 'translate3d(0, 0, 0)',
                    willChange: 'transform'
                  }}
                >
                  {[...testimonials, ...testimonials].map((t, i) => (
                    <div key={i} className="relative min-w-[175px] sm:min-w-[350px] max-w-xs rounded-3xl overflow-hidden shadow-lg h-40 sm:h-80 flex flex-col items-center justify-center border border-slopes/20 bg-snow">
                      <div className="absolute inset-0">
                        <Image 
                          src={t.img} 
                          alt={t.name} 
                          width={350}
                          height={320}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
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
          data-cal-link="curatedcleanings/firstclean"
          data-cal-namespace="firstclean"
          data-cal-config='{"layout":"month_view","theme":"light"}'
          style={{ display: 'none' }}
          aria-hidden="true"
        >
          Hidden Cal Trigger
        </button>

      </section>
    </div>
  );
}

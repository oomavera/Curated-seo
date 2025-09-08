"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "./ui/GlassCard";
import PillButton from "./ui/PillButton";

interface ScrollPopupFormProps {
  triggerElement?: string; // CSS selector for trigger element
  callout?: string; // Custom headline text
  trackMetaLead?: boolean;
  metaEventName?: string;
}

export default function ScrollPopupForm({ triggerElement = "#reviews", callout = "Wait! Get Your Free Quote 🎁", trackMetaLead = false, metaEventName = "Lead" }: ScrollPopupFormProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasTriggered) return; // Only trigger once per session

      const trigger = document.querySelector(triggerElement);
      if (!trigger) return;

      const triggerRect = trigger.getBoundingClientRect();
      const isInView = triggerRect.top <= window.innerHeight && triggerRect.bottom >= 0;

      if (isInView) {
        setShowPopup(true);
        setHasTriggered(true);
      }
    };

    // Add scroll listener with throttling
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [triggerElement, hasTriggered]);

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate dedup event id
      const eventId = `lead-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      const externalId = formData.phone || formData.name || undefined;
      const payload = {
        ...formData,
        email: 'popup@curatedcleanings.com', // Default email since database requires it
        source: 'Popup Lead Form',
        eventId,
        externalId,
      };
      
      console.log('Submitting popup form with:', payload);

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`Failed to submit form: ${response.status}`);
      }

      setSuccess(true);

      // Meta Pixel conversion (only when enabled)
      if (trackMetaLead && typeof window !== 'undefined') {
        const fbq = (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq;
        try {
          fbq?.('track', metaEventName, {
            event_id: eventId,
            content_name: 'Offer Lead',
            event_source: 'offer',
            lead_source: 'popup_form'
          });
        } catch {}
      }
      // Redirect to schedule after success
      if (typeof window !== 'undefined') {
        window.location.assign('/schedule');
        return;
      }
      setTimeout(() => {
        closePopup();
      }, 10000); // Auto-close after 10 seconds
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Submission failed. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-200"
              aria-label="Close popup"
            >
              <span className="text-midnight font-bold">✕</span>
            </button>

            {/* Popup Content */}
            <GlassCard className="p-6 overflow-hidden">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {callout}
                </h3>
              </div>

              {success ? (
                /* Success Message */
                <div className="text-center py-4 space-y-4">
                  <div className="text-green-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Awesome!</h4>
                  <p className="text-arctic">We will call you from 407-470-1780</p>
                  <PillButton 
                    onClick={() => window.location.href = 'tel:+14074701780'}
                    className="w-full justify-center mt-4"
                  >
                    Call Now
                  </PillButton>
                </div>
              ) : (
                /* Simple Lead Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/80 border border-white/60 rounded-full text-midnight placeholder-mountain focus:outline-none focus:ring-2 focus:ring-white/70 focus:bg-white/90"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/80 border border-white/60 rounded-full text-midnight placeholder-mountain focus:outline-none focus:ring-2 focus:ring-white/70 focus:bg-white/90"
                      required
                    />
                  </div>
                  <PillButton 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full justify-center"
                    animated={!isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-arctic border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </span>
                    ) : (
                      "Get Free Quote"
                    )}
                  </PillButton>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
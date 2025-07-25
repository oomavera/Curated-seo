"use client";

import { useState, useMemo, useEffect } from "react";
import { QuoteInput } from "../../types/quote";
import { computeQuote, validateQuoteInput } from "../../lib/quote";
import { CONFIG } from "../../lib/config";

import FrequencyField from "../../components/QuoteForm/FrequencyField";
import NumberField from "../../components/QuoteForm/NumberField";
import AddonsField from "../../components/QuoteForm/AddonsField";
import EstimateBar from "../../components/QuoteForm/EstimateBar";
import LeadForm from "../../components/LeadModal/LeadForm";
import HouseVisualization from "../../components/HouseVisualization";

export default function EstimatePage() {
  const [quoteInput, setQuoteInput] = useState<QuoteInput>({
    frequency: "monthly",
    bedrooms: 3, // min 3
    bathrooms: 2, // min 2
    addons: [],
  });

  const [showLeadModal, setShowLeadModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleLeadCancel = () => {
    setShowLeadModal(false);
    setIsSubmitting(false);
    setSubmitError(null);
    setSubmitSuccess(null);
  };

  return (
    <div className="min-h-screen bg-snow">
      {/* Header */}
      <div className="bg-arctic/60 shadow-sm border-b border-slopes/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-midnight">Get Your Cleaning Estimate</h1>
              <p className="text-mountain font-light">Professional house cleaning in Oviedo, FL</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-mountain font-light">Questions?</div>
              <a href="tel:4072700379" className="text-lg font-semibold text-midnight hover:text-mountain">
                (407) 270-0379
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - 3D Visualization */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-8">
              <HouseVisualization quoteInput={quoteInput} />
            </div>
          </div>

          {/* Right Column - Quote Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <FrequencyField
                value={quoteInput.frequency}
                onChange={(frequency) => handleQuoteInputChange('frequency', frequency)}
                error={validation.errors.frequency}
              />

              <div className="grid grid-cols-2 gap-4">
                <NumberField
                  label={CONFIG.COPY.bedroomsLabel}
                  value={quoteInput.bedrooms}
                  onChange={(bedrooms) => handleQuoteInputChange('bedrooms', bedrooms)}
                  min={3}
                  max={CONFIG.QUOTE_MAX_BEDROOMS}
                  error={validation.errors.bedrooms}
                />

                <NumberField
                  label={CONFIG.COPY.bathroomsLabel}
                  value={quoteInput.bathrooms}
                  onChange={(bathrooms) => handleQuoteInputChange('bathrooms', bathrooms)}
                  min={2}
                  max={CONFIG.QUOTE_MAX_BATHROOMS}
                  error={validation.errors.bathrooms}
                />
              </div>

              <AddonsField
                value={quoteInput.addons}
                onChange={(addons) => handleQuoteInputChange('addons', addons)}
                error={validation.errors.addons}
              />

              <EstimateBar
                subtotal={quote.subtotal}
                isValid={validation.isValid}
                onBookNow={handleBookNow}
                isSubmitting={isSubmitting}
                frequency={quoteInput.frequency}
              />

              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{submitError}</p>
                </div>
              )}

              {submitSuccess && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">{submitSuccess}</p>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Schedule your first clean at your convenience</li>
                <li>• We&apos;ll confirm your quote and discuss any special requirements</li>
                <li>• Complete your cleaning service (starting from just ${quote.subtotal.toFixed(2)})</li>
              </ul>
            </div>
          </div>
        </div>
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
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
} 
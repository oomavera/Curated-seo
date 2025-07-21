"use client";

import { useState } from "react";
import { LeadForm as LeadFormType, Quote } from "../../types/quote";
import { supabase } from "../../lib/supabase";

interface LeadFormProps {
  quote: Quote;
  onSubmit: (leadData: LeadFormType) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

// Standard cleaning services list
const STANDARD_SERVICES = [
  "Dusting all surfaces and furniture",
  "Vacuum and mop all floors", 
  "Clean and sanitize bathrooms",
  "Kitchen cleaning and appliance wipe-down",
  "Empty trash and replace liners",
  "Make beds and tidy rooms",
  "Clean mirrors and glass surfaces",
  "Sanitize frequently touched surfaces"
];

export default function LeadForm({ quote, onSubmit, onCancel, isSubmitting }: LeadFormProps) {
  const [step, setStep] = useState<'contact' | 'estimate'>(  'contact');
  const [formData, setFormData] = useState<Partial<LeadFormType>>({
    name: '',
    phone: '',
    email: '',
    address: {
      street: '',
      city: 'Oviedo',
      state: 'FL',
      zip: ''
    }
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleShowEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate just the basic contact info
    const basicValidation = {
      isValid: true,
      errors: {} as Record<string, string>
    };
    
    if (!formData.name?.trim()) {
      basicValidation.errors.name = 'Name is required';
      basicValidation.isValid = false;
    }
    
    if (!formData.email?.trim()) {
      basicValidation.errors.email = 'Email is required';
      basicValidation.isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      basicValidation.errors.email = 'Please enter a valid email';
      basicValidation.isValid = false;
    }
    
    if (!formData.phone?.trim()) {
      basicValidation.errors.phone = 'Phone is required';
      basicValidation.isValid = false;
    }
    
    if (!basicValidation.isValid) {
      setErrors(basicValidation.errors);
      return;
    }
    
    // Store lead in Supabase (contact info + estimated price only)
    try {
      const { error } = await supabase.from('leads').insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          estimated_price: quote.subtotal,
        }
      ]);
      if (error) {
        // Optionally handle/log error
        console.error('Error saving lead on Show Estimate:', error);
      }
    } catch (err) {
      console.error('Unexpected error saving lead on Show Estimate:', err);
    }
    // Move to estimate step
    setStep('estimate');
    setErrors({});
  };

  const handleBookNow = () => {
    // Submit with minimal address info
    const leadData: LeadFormType = {
      name: formData.name!,
      phone: formData.phone!,
      email: formData.email!,
      address: {
        street: '',
        city: 'Oviedo',
        state: 'FL',
        zip: ''
      }
    };
    
    onSubmit(leadData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-midnight/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-snow rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-slopes/20">
        <div className="p-6">
          {step === 'contact' ? (
            <>
              {/* Step 1: Contact Information */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-light text-midnight">
                  Get Your Estimate
                </h2>
                <button
                  onClick={onCancel}
                  className="text-mountain hover:text-midnight transition-colors"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-mountain mb-6 font-light leading-relaxed">
                Enter your details to see your personalized cleaning estimate
              </p>

              <form onSubmit={handleShowEstimate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-midnight mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-slopes/30 rounded-lg bg-snow text-midnight focus:outline-none focus:ring-2 focus:ring-mountain focus:border-transparent font-light"
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-midnight mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-slopes/30 rounded-lg bg-snow text-midnight focus:outline-none focus:ring-2 focus:ring-mountain focus:border-transparent font-light"
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-midnight mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-slopes/30 rounded-lg bg-snow text-midnight focus:outline-none focus:ring-2 focus:ring-mountain focus:border-transparent font-light"
                    placeholder="(407) 555-0123"
                  />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-mountain transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Show Estimate
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Step 2: Estimate Reveal */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-light text-midnight">
                  Your Cleaning Estimate
                </h2>
                <button
                  onClick={onCancel}
                  className="text-mountain hover:text-midnight transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Price Display */}
              <div className="mb-6 p-4 bg-gradient-to-r from-arctic/60 to-slopes/30 rounded-lg border border-slopes/20">
                <div className="text-center">
                  <div className="text-sm text-mountain font-light">Price</div>
                  <div className="text-3xl font-light text-midnight mb-1">
                    ${quote.subtotal.toFixed(0)}
                  </div>
                  <div className="text-sm text-mountain font-light">
                    {quote.input.bedrooms} bed, {quote.input.bathrooms} bath • {quote.input.frequency} cleaning
                    {quote.input.addons.length > 0 && ` • ${quote.input.addons.length} add-ons`}
                  </div>
                </div>
              </div>

              {/* Services Included */}
              <div className="mb-6">
                <h3 className="text-lg font-light text-midnight mb-3">What&apos;s Included:</h3>
                <ul className="space-y-2">
                  {STANDARD_SERVICES.map((service, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-mountain font-light">
                      <span className="text-mountain mt-0.5">✓</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleBookNow}
                disabled={isSubmitting}
                className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-mountain transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-snow border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  'Book Now'
                )}
              </button>

              <p className="text-xs text-mountain text-center mt-3 font-light">
                You&apos;ll be redirected to schedule your first cleaning
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 
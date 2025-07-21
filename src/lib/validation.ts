import { LeadForm, LeadPayload } from "../types/quote";



export function validatePhone(phone: string): boolean {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid US phone number (10 or 11 digits)
  return cleaned.length === 10 || (cleaned.length === 11 && cleaned[0] === '1');
}

export function normalizePhone(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Add country code if missing
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+${cleaned}`;
  }
  
  return phone; // Return original if can't normalize
}

export function validateZip(zip: string): boolean {
  // US ZIP code: 5 digits or 5+4 format
  const zipRegex = /^\d{5}(-?\d{4})?$/;
  return zipRegex.test(zip);
}

export function validateLeadForm(form: Partial<LeadForm>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  // Name validation
  if (!form.name || form.name.trim().length < 1) {
    errors.name = "This field is required.";
  } else if (form.name.trim().length > 100) {
    errors.name = "Name is too long.";
  }

  // Phone validation
  if (!form.phone || form.phone.trim().length === 0) {
    errors.phone = "This field is required.";
  } else if (!validatePhone(form.phone)) {
    errors.phone = "Enter a valid phone number.";
  }



  // Address validation
  if (!form.address?.street || form.address.street.trim().length === 0) {
    errors.street = "This field is required.";
  } else if (form.address.street.trim().length > 200) {
    errors.street = "Address is too long.";
  }

  if (!form.address?.city || form.address.city.trim().length === 0) {
    errors.city = "This field is required.";
  } else if (form.address.city.trim().length > 100) {
    errors.city = "City name is too long.";
  }

  // ZIP validation (optional but if provided, must be valid)
  if (form.address?.zip && form.address.zip.trim().length > 0) {
    if (!validateZip(form.address.zip)) {
      errors.zip = "Enter a valid ZIP code.";
    }
  }

  // State validation (optional, defaults to FL)
  if (form.address?.state && form.address.state.length !== 2) {
    errors.state = "State must be 2 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function sanitizeLeadForm(form: LeadPayload): LeadPayload {
  return {
    name: form.name.trim(),
    phone: normalizePhone(form.phone),
    email: form.email.trim(),
    address: {
      street: form.address.street.trim(),
      city: form.address.city.trim(),
      state: form.address.state?.toUpperCase() || "FL",
      zip: form.address.zip?.trim() || undefined
    },
    quote: form.quote
  };
} 
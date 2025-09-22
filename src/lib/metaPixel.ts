/**
 * Meta Pixel utility functions for reliable event tracking
 */

type FbqFunction = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}

/**
 * Safely fires a Meta Pixel event with retry logic
 * @param eventName - The event name to track (e.g., 'Lead', 'Purchase')
 * @param eventData - Optional event data object
 * @param maxRetries - Maximum number of retry attempts (default: 10)
 * @param retryDelay - Delay between retries in milliseconds (default: 100)
 */
export function fireMetaPixelEvent(
  eventName: string,
  eventData?: Record<string, unknown>,
  maxRetries: number = 10,
  retryDelay: number = 100
): Promise<void> {
  return new Promise((resolve) => {
    let attempts = 0;

    const attemptFire = () => {
      attempts++;
      
      if (typeof window === 'undefined') {
        resolve();
        return;
      }

      const w = window as Window & { fbq?: FbqFunction };
      
      if (w.fbq && typeof w.fbq === 'function') {
        try {
          w.fbq('track', eventName, eventData);
          console.log(`Meta Pixel ${eventName} event fired successfully`);
          resolve();
        } catch (error) {
          console.error(`Error firing Meta Pixel ${eventName} event:`, error);
          resolve(); // Resolve even on error to prevent hanging
        }
      } else if (attempts < maxRetries) {
        // Retry after delay
        setTimeout(attemptFire, retryDelay);
      } else {
        console.warn(`Meta Pixel ${eventName} event failed after ${maxRetries} attempts - fbq not available`);
        resolve();
      }
    };

    // Start attempting immediately
    attemptFire();
  });
}

/**
 * Fires a Lead event specifically for page views
 * @param pageName - Name of the page (e.g., 'Schedule Page Load')
 * @param eventSource - Source identifier (e.g., 'schedule_page')
 */
export function fireLeadEvent(pageName: string, eventSource: string): Promise<void> {
  const eventId = `lead-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  
  return fireMetaPixelEvent('Lead', {
    event_id: eventId,
    content_name: pageName,
    event_source: eventSource
  });
}

/**
 * Checks if Meta Pixel is available and ready
 */
export function isMetaPixelReady(): boolean {
  if (typeof window === 'undefined') return false;
  
  const w = window as Window & { fbq?: FbqFunction };
  return !!(w.fbq && typeof w.fbq === 'function');
}

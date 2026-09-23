/**
 * Client-side utilities for Opinly Pixel & Analytics
 */

declare global {
  interface Window {
    opinly?: {
      anonId?: string;
      identify: (data: { email: string; userId?: string }) => void;
      track: (
        event: string,
        properties?: Record<string, any>,
        options?: { externalEventId?: string }
      ) => void;
    };
  }
}

/**
 * Get the visitor's anonymous ID assigned by Opinly pixel.
 */
export function getOpinlyAnonId(): string | undefined {
  if (typeof window !== 'undefined' && window.opinly?.anonId) {
    return window.opinly.anonId;
  }
  return undefined;
}

/**
 * Explicitly identify a visitor when their email is known.
 */
export function identifyOpinly(email: string, userId?: string) {
  if (typeof window !== 'undefined' && window.opinly?.identify && email) {
    try {
      window.opinly.identify({ email, userId });
    } catch (e) {
      console.warn('Opinly identify error:', e);
    }
  }
}

/**
 * Fire standard conversion event from browser
 */
export function trackOpinlyEvent(
  event: string,
  properties?: Record<string, any>,
  options?: { externalEventId?: string }
) {
  if (typeof window !== 'undefined' && window.opinly?.track) {
    try {
      window.opinly.track(event, properties, options);
    } catch (e) {
      console.warn('Opinly track error:', e);
    }
  }
}

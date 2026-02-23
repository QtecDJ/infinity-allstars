/**
 * WCAG 2.1/2.2 Level AA Utilities
 * Web Content Accessibility Guidelines Compliance Helpers
 */

// Minimum contrast ratios (WCAG 2.1 Success Criterion 1.4.3)
export const CONTRAST_RATIOS = {
  NORMAL_TEXT: 4.5,
  LARGE_TEXT: 3.0,
  UI_COMPONENTS: 3.0,
};

// Focus management for keyboard navigation
export class FocusManager {
  private static focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  /**
   * Get all focusable elements within a container
   */
  static getFocusableElements(container: HTMLElement): HTMLElement[] {
    return Array.from(
      container.querySelectorAll<HTMLElement>(this.focusableSelectors)
    );
  }

  /**
   * Trap focus within a container (for modals, dialogs)
   * WCAG 2.1 SC 2.1.2 - No Keyboard Trap (with escape)
   */
  static trapFocus(container: HTMLElement, onEscape?: () => void): () => void {
    const focusableElements = this.getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC key to exit trap
      if (e.key === 'Escape' && onEscape) {
        onEscape();
        return;
      }

      // TAB key handling
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }

  /**
   * Restore focus to previously focused element
   */
  static saveFocus(): () => void {
    const previouslyFocused = document.activeElement as HTMLElement;
    return () => {
      previouslyFocused?.focus();
    };
  }
}

// Live Region Announcer for screen readers
// WCAG 2.1 SC 4.1.3 - Status Messages
export class LiveRegion {
  private static instance: LiveRegion;
  private announcer: HTMLDivElement | null = null;

  private constructor() {
    this.createAnnouncer();
  }

  static getInstance(): LiveRegion {
    if (!LiveRegion.instance) {
      LiveRegion.instance = new LiveRegion();
    }
    return LiveRegion.instance;
  }

  private createAnnouncer() {
    if (typeof document === 'undefined') return;

    this.announcer = document.createElement('div');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('aria-atomic', 'true');
    this.announcer.setAttribute('role', 'status');
    this.announcer.className = 'sr-only';
    document.body.appendChild(this.announcer);
  }

  /**
   * Announce a message to screen readers
   * @param message - Message to announce
   * @param priority - 'polite' (default) or 'assertive'
   */
  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    if (!this.announcer) return;

    this.announcer.setAttribute('aria-live', priority);
    this.announcer.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      if (this.announcer) {
        this.announcer.textContent = '';
      }
    }, 1000);
  }
}

// Timeout management for WCAG 2.1 SC 2.2.1 - Timing Adjustable
export class TimeoutManager {
  private timeouts: Map<string, NodeJS.Timeout> = new Map();
  private minTimeout = 20000; // 20 seconds minimum

  /**
   * Set a timeout with user warning before expiration
   */
  setAccessibleTimeout(
    id: string,
    callback: () => void,
    duration: number,
    warningCallback?: (remaining: number) => void
  ) {
    // Clear existing timeout
    this.clearTimeout(id);

    // Ensure minimum duration
    const safeDuration = Math.max(duration, this.minTimeout);
    const warningTime = safeDuration - 10000; // Warn 10 seconds before

    // Set warning
    if (warningCallback && warningTime > 0) {
      const warningTimeout = setTimeout(() => {
        warningCallback(10);
      }, warningTime);
      this.timeouts.set(`${id}-warning`, warningTimeout);
    }

    // Set main timeout
    const mainTimeout = setTimeout(callback, safeDuration);
    this.timeouts.set(id, mainTimeout);
  }

  clearTimeout(id: string) {
    const timeout = this.timeouts.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.timeouts.delete(id);
    }

    // Clear warning too
    const warningTimeout = this.timeouts.get(`${id}-warning`);
    if (warningTimeout) {
      clearTimeout(warningTimeout);
      this.timeouts.delete(`${id}-warning`);
    }
  }

  clearAll() {
    this.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.timeouts.clear();
  }
}

/**
 * Check if user prefers reduced motion
 * WCAG 2.1 SC 2.3.3 - Animation from Interactions
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user prefers high contrast
 */
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Generate a unique ID for ARIA relationships
 */
export function generateAriaId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate color contrast ratio
 * WCAG 2.1 SC 1.4.3 & 1.4.6
 */
export function getContrastRatio(color1: string, color2: string): number {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getLuminance = (_color: string): number => {
    // Simplified luminance calculation
    // In production, use a proper color library like tinycolor2 or chroma-js
    return 0.5; // Placeholder
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Debounce function for input handlers
 * Helps with WCAG 2.1 SC 2.2.4 - Interruptions
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Keyboard navigation helpers
 */
export const KeyboardKeys = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  TAB: 'Tab',
  HOME: 'Home',
  END: 'End',
} as const;

/**
 * Check if key is an activation key (Enter or Space)
 * WCAG 2.1 SC 2.1.1 - Keyboard
 */
export function isActivationKey(event: KeyboardEvent): boolean {
  return event.key === KeyboardKeys.ENTER || event.key === KeyboardKeys.SPACE;
}

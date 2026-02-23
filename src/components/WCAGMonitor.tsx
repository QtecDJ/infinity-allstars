import { useEffect } from 'react';
import { LiveRegion } from '@/utils/wcag-utils';

/**
 * WCAG Monitor Component
 * Automatically checks for common accessibility issues
 * WCAG 2.1/2.2 Level AA Compliance
 */

export function WCAGMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const liveRegion = LiveRegion.getInstance();
    const issues: string[] = [];

    // Check for images without alt text (WCAG 2.1 SC 1.1.1)
    const checkImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        if (!img.hasAttribute('alt')) {
          issues.push(`Image ${index + 1} missing alt attribute`);
          console.warn('WCAG Issue: Image missing alt text', img);
        }
      });
    };

    // Check for links without accessible names (WCAG 2.1 SC 2.4.4)
    const checkLinks = () => {
      const links = document.querySelectorAll('a');
      links.forEach((link, index) => {
        const hasText = link.textContent?.trim();
        const hasAriaLabel = link.hasAttribute('aria-label');
        const hasAriaLabelledBy = link.hasAttribute('aria-labelledby');
        
        if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
          issues.push(`Link ${index + 1} has no accessible name`);
          console.warn('WCAG Issue: Link without accessible name', link);
        }
      });
    };

    // Check for buttons without accessible names (WCAG 2.1 SC 4.1.2)
    const checkButtons = () => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach((button, index) => {
        const hasText = button.textContent?.trim();
        const hasAriaLabel = button.hasAttribute('aria-label');
        const hasAriaLabelledBy = button.hasAttribute('aria-labelledby');
        
        if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
          issues.push(`Button ${index + 1} has no accessible name`);
          console.warn('WCAG Issue: Button without accessible name', button);
        }
      });
    };

    // Check for form inputs without labels (WCAG 2.1 SC 3.3.2)
    const checkFormInputs = () => {
      const inputs = document.querySelectorAll('input:not([type="hidden"]), textarea, select');
      inputs.forEach((input, index) => {
        const hasLabel = input.hasAttribute('aria-label') || 
                        input.hasAttribute('aria-labelledby') ||
                        document.querySelector(`label[for="${input.id}"]`);
        
        if (!hasLabel) {
          issues.push(`Form input ${index + 1} has no label`);
          console.warn('WCAG Issue: Form input without label', input);
        }
      });
    };

    // Check for heading hierarchy (WCAG 2.1 SC 1.3.1)
    const checkHeadingHierarchy = () => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      let previousLevel = 0;
      
      headings.forEach((heading) => {
        const level = parseInt(heading.tagName.substring(1));
        
        if (previousLevel > 0 && level > previousLevel + 1) {
          issues.push(`Heading hierarchy skipped from h${previousLevel} to h${level}`);
          console.warn('WCAG Issue: Heading hierarchy skipped', heading);
        }
        
        previousLevel = level;
      });
    };

    // Check for color contrast (simplified check)
    const checkContrast = () => {
      // This is a simplified check - in production, use a proper contrast checker
      const textElements = document.querySelectorAll('p, span, a, button, li');
      textElements.forEach((element) => {
        const styles = window.getComputedStyle(element);
        const fontSize = parseFloat(styles.fontSize);
        const fontWeight = styles.fontWeight;
        
        // Flag small text (< 14px) or thin text (< 400 weight)
        if (fontSize < 14 || parseInt(fontWeight) < 400) {
          // In production, calculate actual contrast ratio
          // For now, just log a warning
          console.info('WCAG Info: Small or thin text detected. Ensure 4.5:1 contrast ratio', element);
        }
      });
    };

    // Check for videos with controls (WCAG 2.1 SC 1.2.1)
    const checkVideos = () => {
      const videos = document.querySelectorAll('video');
      videos.forEach((video, index) => {
        if (!video.hasAttribute('controls') && !video.muted) {
          issues.push(`Video ${index + 1} should have controls or be muted`);
          console.warn('WCAG Issue: Video without controls', video);
        }
        
        if (!video.hasAttribute('aria-label') && !video.hasAttribute('title')) {
          issues.push(`Video ${index + 1} should have accessible name`);
          console.warn('WCAG Issue: Video without accessible name', video);
        }
      });
    };

    // Run all checks after a delay to allow for dynamic content
    const runChecks = () => {
      setTimeout(() => {
        checkImages();
        checkLinks();
        checkButtons();
        checkFormInputs();
        checkHeadingHierarchy();
        checkContrast();
        checkVideos();

        if (issues.length > 0) {
          console.group('🎯 WCAG 2.1/2.2 Issues Found:');
          issues.forEach(issue => console.warn('⚠️', issue));
          console.groupEnd();
          
          liveRegion.announce(`${issues.length} accessibility issues found. Check console for details.`);
        } else {
          console.log('✅ No obvious WCAG issues detected');
        }
      }, 2000);
    };

    runChecks();

    // Re-check on route changes or dynamic content
    const observer = new MutationObserver(() => {
      issues.length = 0;
      runChecks();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}

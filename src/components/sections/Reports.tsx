import { Separator } from '@/components/ui/separator';
import { Spotlight } from '@/components/ui/spotlight';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

// Extend Window interface for Elfsight
declare global {
  interface Window {
    Elfsight?: {
      init?: () => void;
    };
  }
}

export function Reports() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]');
    
    if (existingScript) {
      scriptLoadedRef.current = true;
      setIsLoading(false);
      // Reinitialize Elfsight if needed
      if (window.Elfsight?.init) {
        window.Elfsight.init();
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    
    script.onload = () => {
      scriptLoadedRef.current = true;
      setIsLoading(false);
      // Initialize Elfsight if needed
      if (window.Elfsight?.init) {
        window.Elfsight.init();
      }
    };

    script.onerror = () => {
      setHasError(true);
      setIsLoading(false);
      console.error('Failed to load Elfsight widget');
    };

    document.body.appendChild(script);

    return () => {
      // Don't remove script on unmount as it might be used by other components
    };
  }, []);

  return (
    <section id="reports" className="relative py-24 bg-black overflow-hidden">
      <Spotlight className="-top-40 right-0 md:right-60 md:-top-20" fill="#FF6B35" />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t('reports.title')} <span className="text-primary">{t('reports.titleHighlight')}</span>
          </h2>
          <Separator className="w-24 mx-auto mb-6 bg-white/20" />
          <p className="text-lg text-white/80 leading-relaxed">
            {t('reports.description')}
          </p>
        </div>

        {/* Elfsight Blog Widget with Loading State */}
        <div className="max-w-6xl mx-auto">
          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <span className="ml-4 text-white/60">{t('reports.loading')}</span>
            </div>
          )}

          {/* Error State */}
          {hasError && (
            <div className="text-center py-20">
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-400">
                  {t('reports.errorLoading')}
                </p>
              </div>
            </div>
          )}

          {/* Widget Container */}
          <div 
            ref={widgetRef}
            className={`
              transition-opacity duration-700
              ${isLoading || hasError ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}
            `}
          >
            <div 
              className="elfsight-app-0718991f-510b-4b8c-adc6-7badc2d6cc7b" 
              data-elfsight-app-lazy
            />
          </div>
        </div>
      </div>
    </section>
  );
}

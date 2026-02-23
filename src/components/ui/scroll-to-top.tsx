import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function ScrollToTop() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          size="icon"
          variant="outline"
          className="fixed bottom-24 right-4 md:bottom-24 md:right-6 z-[60] w-12 h-12 rounded-full shadow-2xl bg-secondary hover:bg-primary hover:text-white border-2 border-border transition-all duration-300"
          aria-label={t('scrollToTop.label', { defaultValue: 'Nach oben scrollen' })}
          title={t('scrollToTop.label', { defaultValue: 'Nach oben scrollen' })}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </>
  );
}

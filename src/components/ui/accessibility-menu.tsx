import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Accessibility, 
  Eye, 
  Minus, 
  Plus, 
  Contrast, 
  Type,
  MousePointerClick,
  X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function AccessibilityMenu() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [largerCursor, setLargerCursor] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };
    setIsTouchDevice(checkTouchDevice());
  }, []);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setFontSize(settings.fontSize || 100);
      setHighContrast(settings.highContrast || false);
      setReducedMotion(settings.reducedMotion || false);
      setLargerCursor(settings.largerCursor || false);
    }

    // Check system preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && !savedSettings) {
      setReducedMotion(true);
    }
  }, []);

  // Apply settings
  useEffect(() => {
    const root = document.documentElement;
    
    // Font size
    root.style.fontSize = `${fontSize}%`;
    
    // High contrast
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reduced motion
    if (reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    
    // Larger cursor
    if (largerCursor) {
      root.classList.add('large-cursor');
    } else {
      root.classList.remove('large-cursor');
    }

    // Save settings
    localStorage.setItem('accessibility-settings', JSON.stringify({
      fontSize,
      highContrast,
      reducedMotion,
      largerCursor
    }));
  }, [fontSize, highContrast, reducedMotion, largerCursor]);

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 10, 150));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 10, 80));
  };

  const resetAll = () => {
    setFontSize(100);
    setHighContrast(false);
    setReducedMotion(false);
    setLargerCursor(false);
    localStorage.removeItem('accessibility-settings');
  };

  return (
    <>
      {/* Accessibility Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        variant="outline"
        className="fixed bottom-6 right-4 md:right-6 z-[60] w-12 h-12 rounded-full shadow-2xl bg-primary hover:bg-primary/90 text-white border-2 border-white/20"
        aria-label={t('accessibility.toggle', { defaultValue: 'Barrierefreiheit-Menü öffnen' })}
        title={t('accessibility.toggle', { defaultValue: 'Barrierefreiheit-Menü' })}
      >
        <Accessibility className="h-5 w-5" />
      </Button>

      {/* Accessibility Menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <Card 
            className="w-full max-w-md max-h-[85vh] overflow-y-auto bg-background/95 backdrop-blur-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="accessibility-title"
            aria-modal="true"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle id="accessibility-title" className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <Accessibility className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                {t('accessibility.title', { defaultValue: 'Barrierefreiheit' })}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label={t('accessibility.close', { defaultValue: 'Schließen' })}
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Font Size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    {t('accessibility.fontSize', { defaultValue: 'Schriftgröße' })}
                  </label>
                  <span className="text-sm text-muted-foreground">{fontSize}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={decreaseFontSize}
                    disabled={fontSize <= 80}
                    aria-label={t('accessibility.decreaseFont', { defaultValue: 'Schrift verkleinern' })}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all" 
                      style={{ width: `${((fontSize - 80) / 70) * 100}%` }}
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={increaseFontSize}
                    disabled={fontSize >= 150}
                    aria-label={t('accessibility.increaseFont', { defaultValue: 'Schrift vergrößern' })}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <label htmlFor="high-contrast" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                  <Contrast className="h-4 w-4" />
                  {t('accessibility.highContrast', { defaultValue: 'Hoher Kontrast' })}
                </label>
                <Button
                  id="high-contrast"
                  size="sm"
                  variant={highContrast ? "default" : "outline"}
                  onClick={() => setHighContrast(!highContrast)}
                  aria-pressed={highContrast}
                  aria-label={t('accessibility.toggleHighContrast', { defaultValue: 'Hohen Kontrast umschalten' })}
                >
                  {highContrast ? t('accessibility.on', { defaultValue: 'An' }) : t('accessibility.off', { defaultValue: 'Aus' })}
                </Button>
              </div>

              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <label htmlFor="reduced-motion" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                  <Eye className="h-4 w-4" />
                  {t('accessibility.reducedMotion', { defaultValue: 'Bewegung reduzieren' })}
                </label>
                <Button
                  id="reduced-motion"
                  size="sm"
                  variant={reducedMotion ? "default" : "outline"}
                  onClick={() => setReducedMotion(!reducedMotion)}
                  aria-pressed={reducedMotion}
                  aria-label={t('accessibility.toggleReducedMotion', { defaultValue: 'Bewegung reduzieren umschalten' })}
                >
                  {reducedMotion ? t('accessibility.on', { defaultValue: 'An' }) : t('accessibility.off', { defaultValue: 'Aus' })}
                </Button>
              </div>

              {/* Larger Cursor - Only on Desktop */}
              {!isTouchDevice && (
                <div className="flex items-center justify-between">
                  <label htmlFor="larger-cursor" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                    <MousePointerClick className="h-4 w-4" />
                    {t('accessibility.largerCursor', { defaultValue: 'Größerer Mauszeiger' })}
                  </label>
                  <Button
                    id="larger-cursor"
                    size="sm"
                    variant={largerCursor ? "default" : "outline"}
                    onClick={() => setLargerCursor(!largerCursor)}
                    aria-pressed={largerCursor}
                    aria-label={t('accessibility.toggleLargerCursor', { defaultValue: 'Größeren Mauszeiger umschalten' })}
                  >
                    {largerCursor ? t('accessibility.on', { defaultValue: 'An' }) : t('accessibility.off', { defaultValue: 'Aus' })}
                  </Button>
                </div>
              )}

              {/* Reset Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={resetAll}
              >
                {t('accessibility.reset', { defaultValue: 'Alle Einstellungen zurücksetzen' })}
              </Button>

              {/* Info Text */}
              <p className="text-xs text-muted-foreground text-center pt-2 border-t">
                {t('accessibility.info', { 
                  defaultValue: 'Diese Einstellungen werden lokal in Ihrem Browser gespeichert.' 
                })}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

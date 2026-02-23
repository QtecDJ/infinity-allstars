import { useState, useEffect } from 'react';
import { Settings, X, Plus, Minus, Eye, MousePointer, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
  largerCursor: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  reducedMotion: false,
  largerCursor: false,
};

export function AccessibilityMenu() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (e) {
        console.error('Failed to parse accessibility settings', e);
      }
    }
  }, []);

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Font size
    root.style.fontSize = `${settings.fontSize}%`;
    
    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    
    // Larger cursor
    if (settings.largerCursor) {
      root.classList.add('large-cursor');
    } else {
      root.classList.remove('large-cursor');
    }
    
    // Save to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('accessibility-settings');
  };

  const increaseFontSize = () => {
    if (settings.fontSize < 150) {
      updateSetting('fontSize', settings.fontSize + 10);
    }
  };

  const decreaseFontSize = () => {
    if (settings.fontSize > 80) {
      updateSetting('fontSize', settings.fontSize - 10);
    }
  };

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
      >
        {t('accessibility.skipToContent')}
      </a>

      {/* Floating Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-110 transition-transform flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary/50"
        aria-label={t('accessibility.title')}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Settings size={24} />}
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] bg-background border border-border rounded-lg shadow-2xl p-6 max-h-[80vh] overflow-y-auto"
            role="dialog"
            aria-labelledby="accessibility-title"
            aria-modal="true"
          >
            <h2 id="accessibility-title" className="text-xl font-bold mb-4 text-primary">
              {t('accessibility.title')}
            </h2>

            <div className="space-y-6">
              {/* Font Size */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  {t('accessibility.fontSize')}
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={decreaseFontSize}
                    disabled={settings.fontSize <= 80}
                    aria-label={t('accessibility.decreaseFont')}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="text-sm font-medium min-w-[4rem] text-center">
                    {settings.fontSize}%
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={increaseFontSize}
                    disabled={settings.fontSize >= 150}
                    aria-label={t('accessibility.increaseFont')}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye size={20} className="text-muted-foreground" />
                  <label htmlFor="high-contrast" className="text-sm font-semibold">
                    {t('accessibility.highContrast')}
                  </label>
                </div>
                <button
                  id="high-contrast"
                  role="switch"
                  aria-checked={settings.highContrast}
                  onClick={() => updateSetting('highContrast', !settings.highContrast)}
                  className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50 ${
                    settings.highContrast ? 'bg-primary' : 'bg-secondary'
                  }`}
                  aria-label={t('accessibility.toggleHighContrast')}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.highContrast ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap size={20} className="text-muted-foreground" />
                  <label htmlFor="reduced-motion" className="text-sm font-semibold">
                    {t('accessibility.reducedMotion')}
                  </label>
                </div>
                <button
                  id="reduced-motion"
                  role="switch"
                  aria-checked={settings.reducedMotion}
                  onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                  className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50 ${
                    settings.reducedMotion ? 'bg-primary' : 'bg-secondary'
                  }`}
                  aria-label={t('accessibility.toggleReducedMotion')}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.reducedMotion ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Larger Cursor */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MousePointer size={20} className="text-muted-foreground" />
                  <label htmlFor="larger-cursor" className="text-sm font-semibold">
                    {t('accessibility.largerCursor')}
                  </label>
                </div>
                <button
                  id="larger-cursor"
                  role="switch"
                  aria-checked={settings.largerCursor}
                  onClick={() => updateSetting('largerCursor', !settings.largerCursor)}
                  className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50 ${
                    settings.largerCursor ? 'bg-primary' : 'bg-secondary'
                  }`}
                  aria-label={t('accessibility.toggleLargerCursor')}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.largerCursor ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Reset Button */}
              <Button
                onClick={resetSettings}
                variant="outline"
                className="w-full"
                size="sm"
              >
                {t('accessibility.reset')}
              </Button>

              {/* Info Text */}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('accessibility.info')}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

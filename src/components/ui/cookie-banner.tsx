import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Cookie, Shield } from 'lucide-react';

interface CookieConsent {
  essential: boolean;
  googleFonts: boolean;
  timestamp: number;
}

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

export function CookieBanner({ onOpenPrivacy }: CookieBannerProps) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [googleFontsEnabled, setGoogleFontsEnabled] = useState(true);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (googleFonts: boolean) => {
    const consent: CookieConsent = {
      essential: true,
      googleFonts,
      timestamp: Date.now(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setIsVisible(false);

    // Apply Google Fonts consent
    if (!googleFonts) {
      // Remove Google Fonts from head
      const links = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
      links.forEach((link) => link.remove());
    }
  };

  const handleAcceptAll = () => {
    saveConsent(true);
  };

  const handleRejectOptional = () => {
    saveConsent(false);
  };

  const handleSavePreferences = () => {
    saveConsent(googleFontsEnabled);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500">
      <div className="bg-card/95 backdrop-blur-lg border-t border-border shadow-2xl">
        <div className="container mx-auto px-4 py-4 md:py-6">
          {!showDetails ? (
            // Compact View
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              {/* Icon and Text */}
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Cookie className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {t('cookies.banner.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('cookies.banner.description')}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => setShowDetails(true)}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  {t('cookies.banner.showDetails')}
                </button>
                <button
                  onClick={onOpenPrivacy}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Shield className="h-3.5 w-3.5" />
                  {t('cookies.banner.privacyLink')}
                </button>
                <div className="w-full md:w-auto flex gap-2">
                  <button
                    onClick={handleRejectOptional}
                    className="flex-1 md:flex-none px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    {t('cookies.banner.rejectOptional')}
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 md:flex-none px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    {t('cookies.banner.acceptAll')}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Detailed View
            <div className="space-y-4">
              {/* Header with back button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Cookie className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {t('cookies.banner.title')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('cookies.banner.subtitle')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  {t('cookies.banner.hideDetails')}
                </button>
              </div>

              {/* Cookie Options */}
              <div className="grid md:grid-cols-2 gap-3">
                {/* Essential */}
                <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg border border-border">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="mt-0.5 h-4 w-4 rounded border-border cursor-not-allowed"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-foreground">
                        {t('cookies.banner.essential.title')}
                      </h4>
                      <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full border border-green-500/20">
                        {t('cookies.banner.required')}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t('cookies.banner.essential.description')}
                    </p>
                  </div>
                </div>

                {/* Google Fonts */}
                <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg border border-border">
                  <input
                    type="checkbox"
                    checked={googleFontsEnabled}
                    onChange={(e) => setGoogleFontsEnabled(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-border cursor-pointer accent-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-foreground">
                        {t('cookies.banner.googleFonts.title')}
                      </h4>
                      <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20">
                        {t('cookies.banner.optional')}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t('cookies.banner.googleFonts.description')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={onOpenPrivacy}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1"
                >
                  <Shield className="h-3.5 w-3.5" />
                  {t('cookies.banner.privacyLink')}
                </button>
                <div className="flex-1" />
                <button
                  onClick={handleRejectOptional}
                  className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-secondary transition-colors"
                >
                  {t('cookies.banner.rejectOptional')}
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 bg-secondary text-foreground rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                  {t('cookies.banner.savePreferences')}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  {t('cookies.banner.acceptAll')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 animate-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Cookie className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('cookies.banner.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('cookies.banner.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            {t('cookies.banner.description')}
          </p>

          {/* Toggle Details */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium flex items-center gap-1"
          >
            {showDetails ? t('cookies.banner.hideDetails') : t('cookies.banner.showDetails')}
          </button>

          {/* Details */}
          {showDetails && (
            <div className="space-y-4 mt-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              {/* Essential Cookies */}
              <div className="flex items-start gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 cursor-not-allowed"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {t('cookies.banner.essential.title')}
                    </h3>
                    <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                      {t('cookies.banner.required')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('cookies.banner.essential.description')}
                  </p>
                </div>
              </div>

              {/* Google Fonts */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={googleFontsEnabled}
                  onChange={(e) => setGoogleFontsEnabled(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {t('cookies.banner.googleFonts.title')}
                    </h3>
                    <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                      {t('cookies.banner.optional')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('cookies.banner.googleFonts.description')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Policy Link */}
          <button
            onClick={onOpenPrivacy}
            className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Shield className="h-4 w-4" />
            {t('cookies.banner.privacyLink')}
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleRejectOptional}
            className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {t('cookies.banner.rejectOptional')}
          </button>
          {showDetails && (
            <button
              onClick={handleSavePreferences}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {t('cookies.banner.savePreferences')}
            </button>
          )}
          <button
            onClick={handleAcceptAll}
            className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
          >
            {t('cookies.banner.acceptAll')}
          </button>
        </div>
      </div>
    </div>
  );
}

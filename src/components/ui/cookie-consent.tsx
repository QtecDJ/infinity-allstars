import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Cookie, X, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
}

export function CookieConsent() {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, can't be disabled
    functional: false,
    analytics: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    savePreferences({
      essential: true,
      functional: true,
      analytics: true,
    });
  };

  const acceptEssentialOnly = () => {
    savePreferences({
      essential: true,
      functional: false,
      analytics: false,
    });
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-2xl">
        <Card className="bg-background/95 backdrop-blur-xl border-2 shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Cookie className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <CardTitle className="text-xl">
                    {t('cookies.title', { defaultValue: 'Cookie-Einstellungen' })}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {t('cookies.subtitle', { 
                      defaultValue: 'Wir respektieren deine Privatsphäre' 
                    })}
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => acceptEssentialOnly()}
                className="flex-shrink-0"
                aria-label={t('cookies.close', { defaultValue: 'Schließen' })}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {!showSettings ? (
              <>
                {/* Simple View */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('cookies.description', {
                    defaultValue: 'Diese Webseite nutzt nur essenzielle lokale Speicherung (localStorage) für Barrierefreiheits-Einstellungen. Externe Dienste wie Google Fonts werden nur mit deiner Zustimmung geladen.'
                  })}
                </p>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button
                    onClick={acceptAll}
                    className="flex-1"
                    size="lg"
                  >
                    {t('cookies.acceptAll', { defaultValue: 'Alle akzeptieren' })}
                  </Button>
                  <Button
                    onClick={acceptEssentialOnly}
                    variant="outline"
                    className="flex-1"
                    size="lg"
                  >
                    {t('cookies.essentialOnly', { defaultValue: 'Nur essenzielle' })}
                  </Button>
                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="ghost"
                    className="flex-1"
                    size="lg"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {t('cookies.customize', { defaultValue: 'Anpassen' })}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center pt-2">
                  {t('cookies.moreInfo', {
                    defaultValue: 'Weitere Informationen in unserer Datenschutzerklärung'
                  })}
                </p>
              </>
            ) : (
              <>
                {/* Detailed Settings View */}
                <div className="space-y-4">
                  {/* Essential Cookies */}
                  <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-secondary/50">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">
                        {t('cookies.essential.title', { defaultValue: 'Essenzielle Speicherung' })}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {t('cookies.essential.description', {
                          defaultValue: 'Notwendig für Barrierefreiheits-Funktionen (Schriftgröße, Kontrast). Diese können nicht deaktiviert werden.'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs font-medium text-primary">
                        {t('cookies.required', { defaultValue: 'Erforderlich' })}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Functional Cookies (Google Fonts) */}
                  <div className="flex items-start justify-between gap-4 p-4 rounded-lg border">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">
                        {t('cookies.functional.title', { defaultValue: 'Funktionale Dienste' })}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {t('cookies.functional.description', {
                          defaultValue: 'Externe Dienste wie Google Fonts für optimale Darstellung.'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        size="sm"
                        variant={preferences.functional ? "default" : "outline"}
                        onClick={() => setPreferences({
                          ...preferences,
                          functional: !preferences.functional
                        })}
                      >
                        {preferences.functional 
                          ? t('cookies.enabled', { defaultValue: 'An' })
                          : t('cookies.disabled', { defaultValue: 'Aus' })
                        }
                      </Button>
                    </div>
                  </div>

                  {/* Analytics - Not used but shown for completeness */}
                  <div className="flex items-start justify-between gap-4 p-4 rounded-lg border opacity-50">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">
                        {t('cookies.analytics.title', { defaultValue: 'Analyse & Statistiken' })}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {t('cookies.analytics.description', {
                          defaultValue: 'Derzeit nicht verwendet. Keine Analytics oder Tracking.'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-muted-foreground">
                        {t('cookies.notUsed', { defaultValue: 'Nicht aktiv' })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-4">
                  <Button
                    onClick={saveCustomPreferences}
                    className="flex-1"
                    size="lg"
                  >
                    {t('cookies.savePreferences', { defaultValue: 'Einstellungen speichern' })}
                  </Button>
                  <Button
                    onClick={() => setShowSettings(false)}
                    variant="outline"
                    className="flex-1"
                    size="lg"
                  >
                    {t('cookies.back', { defaultValue: 'Zurück' })}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper function to check consent
export function hasConsent(type: keyof CookiePreferences): boolean {
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) return false;
  
  try {
    const preferences: CookiePreferences = JSON.parse(consent);
    return preferences[type] === true;
  } catch {
    return false;
  }
}

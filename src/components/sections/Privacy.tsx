import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface PrivacyProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Privacy({ isOpen, onClose }: PrivacyProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-background border border-border rounded-lg shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {t('privacy.title')}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label={t('privacy.close')}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 md:p-8 space-y-6 text-sm md:text-base leading-relaxed">
          {/* Stand */}
          <p className="text-sm text-muted-foreground italic">
            {t('privacy.lastUpdated', { date: new Date().toLocaleDateString() })}
          </p>

          {/* Verantwortlicher */}
          <section>
            <h2 className="text-xl font-bold mb-3">{t('privacy.responsible.title')}</h2>
            <p className="text-muted-foreground">
              {t('privacy.responsible.name')}<br />
              {t('privacy.responsible.street')}<br />
              {t('privacy.responsible.city')}<br />
              <br />
              E-Mail: {t('privacy.responsible.email')}<br />
              Telefon: {t('privacy.responsible.phone')}
            </p>
          </section>

          {/* Datenverarbeitung */}
          <section>
            <h2 className="text-xl font-bold mb-3">{t('privacy.dataProcessing.title')}</h2>
            
            <h3 className="text-lg font-semibold mt-4 mb-2">{t('privacy.dataProcessing.localStorage.title')}</h3>
            <p className="text-muted-foreground mb-2">
              {t('privacy.dataProcessing.localStorage.description')}
            </p>
            <p className="text-muted-foreground mt-2 italic">
              {t('privacy.dataProcessing.localStorage.legalBasis')}
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-2">{t('privacy.dataProcessing.googleFonts.title')}</h3>
            <p className="text-muted-foreground mb-2">
              {t('privacy.dataProcessing.googleFonts.description')}
            </p>
            <p className="text-muted-foreground mt-2 italic">
              {t('privacy.dataProcessing.googleFonts.legalBasis')}
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              {t('privacy.dataProcessing.googleFonts.provider')}
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-bold mb-3">{t('privacy.cookies.title')}</h2>
            <p className="text-muted-foreground">
              {t('privacy.cookies.description')}
            </p>
          </section>

          {/* Ihre Rechte */}
          <section>
            <h2 className="text-xl font-bold mb-3">{t('privacy.rights.title')}</h2>
            <p className="text-muted-foreground mb-3">{t('privacy.rights.description')}</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <strong>{t('privacy.rights.info.title')}</strong>
                <br />
                {t('privacy.rights.info.description')}
              </li>
              <li>
                <strong>{t('privacy.rights.rectification.title')}</strong>
                <br />
                {t('privacy.rights.rectification.description')}
              </li>
              <li>
                <strong>{t('privacy.rights.erasure.title')}</strong>
                <br />
                {t('privacy.rights.erasure.description')}
              </li>
              <li>
                <strong>{t('privacy.rights.restriction.title')}</strong>
                <br />
                {t('privacy.rights.restriction.description')}
              </li>
              <li>
                <strong>{t('privacy.rights.dataPortability.title')}</strong>
                <br />
                {t('privacy.rights.dataPortability.description')}
              </li>
              <li>
                <strong>{t('privacy.rights.objection.title')}</strong>
                <br />
                {t('privacy.rights.objection.description')}
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              {t('privacy.rights.contact')}
            </p>
          </section>

          {/* Hosting */}
          <section>
            <h2 className="text-xl font-bold mb-3">{t('privacy.hosting.title')}</h2>
            <p className="text-muted-foreground">
              {t('privacy.hosting.description')}
            </p>
          </section>

          {/* Änderungen */}
          <section>
            <h2 className="text-xl font-bold mb-3">{t('privacy.changes.title')}</h2>
            <p className="text-muted-foreground">
              {t('privacy.changes.description')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


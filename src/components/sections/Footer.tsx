import { Separator } from '@/components/ui/separator';
import { Instagram, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '@/utils/paths';

// TikTok Icon Component
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Facebook Icon Component
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// WhatsApp Icon Component
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://www.instagram.com/infinity_cheer_allstars/',
      label: 'Instagram',
    },
    {
      icon: TikTokIcon,
      href: 'https://www.tiktok.com/@infinitycheerallstars',
      label: 'TikTok',
    },
    {
      icon: FacebookIcon,
      href: 'https://www.facebook.com/CheerleaderPlattenhardt/',
      label: 'Facebook',
    },
    {
      icon: WhatsAppIcon,
      href: 'https://whatsapp.com/channel/0029Vb90CDpBadmj4Dmf461X',
      label: 'WhatsApp Kanal',
    },
  ];

  const footerLinks: Array<{ title: string; links: Array<{ label: string; href: string; external?: boolean }> }> = [
    {
      title: 'TSV Plattenhardt',
      links: [
        { label: 'Cheerleading-Seite', href: 'https://www.tsvplattenhardt.de/cheerleading46a5e1b6', external: true },
        { label: 'Berichte', href: 'https://www.tsvplattenhardt.de/schnupperstunden-cheerleading', external: true },
        { label: 'Mitgliedschaft/Beiträge', href: 'https://www.tsvplattenhardt.de/mitgliedschaft', external: true },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: 'cheerleader@tsvplattenhardt.de',
      href: 'mailto:cheerleader@tsvplattenhardt.de',
    },
    {
      icon: Phone,
      label: 'Sandra Pohl: 0176 74798642',
      href: 'tel:017674798642',
    },
    {
      icon: Phone,
      label: 'Kai Püttmann: 0176 55772423',
      href: 'tel:017655772423',
    },
    {
      icon: MapPin,
      label: 'Höhensporthalle Weilerhau',
      href: 'https://maps.google.com/?q=Höhensporthalle+Weilerhau+Filderstadt',
    },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">INFINITY CHEER ALLSTARS</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-secondary hover:bg-primary transition-colors flex items-center justify-center"
                  target="_blank"
                  rel="noreferrer"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.sections.contact')}</h4>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => (
                <li key={index}>
                  <a
                    href={contact.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    <contact.icon size={16} className="flex-shrink-0" />
                    <span>{contact.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noreferrer' : undefined}
                    >
                      <span>{link.label}</span>
                      {link.external ? <ExternalLink size={14} /> : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col items-start">
            <h4 className="font-semibold mb-4">Partner & Verbände</h4>
            <div className="flex items-center gap-6">
              <a
                href="https://www.tsvplattenhardt.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="TSV Plattenhardt 1895 e.V."
              >
                <img
                  src={getAssetPath('/media/ica/tsvlogo.webp')}
                  alt="TSV Plattenhardt Logo"
                  className="w-auto h-16 object-contain"
                />
              </a>
              <a
                href="https://cheersport.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="CCVD - Cheerleading und Cheersport Verband Deutschland"
              >
                <img
                  src={getAssetPath('/media/ica/ccvd.webp')}
                  alt="CCVD Logo"
                  className="w-auto h-16 object-contain"
                />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>{t('footer.copyright', { year: currentYear })}</p>
          <p>
            Mit <span className="text-primary">♥</span> in{' '}
            <a
              href="https://www.filderstadt.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Filderstadt
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

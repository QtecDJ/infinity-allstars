import { useState, useEffect } from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Teams } from '@/components/sections/Teams';
import { Achievements } from '@/components/sections/Achievements';
import { Gallery } from '@/components/sections/Gallery';
import { Videos } from '@/components/sections/Videos';
import { Reports } from '@/components/sections/Reports';
import { Events } from '@/components/sections/Events';
import { CallToAction } from '@/components/sections/CallToAction';
import { Footer } from '@/components/sections/Footer';
import { Privacy } from '@/components/sections/Privacy';
import { AccessibilityMenu } from '@/components/ui/accessibility-menu';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { CookieBanner } from '@/components/ui/cookie-banner';
import { SEO } from '@/components/SEO';
import { WCAGMonitor } from '@/components/WCAGMonitor';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // WCAG 2.1 SC 3.1.1 - Language of Page
  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* WCAG 2.1/2.2 Monitoring in Development */}
      {process.env.NODE_ENV === 'development' && <WCAGMonitor />}
      
      {/* SEO Meta Tags and Structured Data */}
      <SEO />
      
      {/* Skip to Content Link for Screen Readers and Keyboard Navigation */}
      <a 
        href="#main-content" 
        className="skip-to-content"
        aria-label={t('accessibility.skipToContent', { defaultValue: 'Zum Hauptinhalt springen' })}
      >
        {t('accessibility.skipToContent', { defaultValue: 'Zum Hauptinhalt springen' })}
      </a>

      <Navbar />
      
      <main id="main-content" role="main" aria-label={t('accessibility.mainContent', { defaultValue: 'Hauptinhalt' })}>
        <Hero />
        <About />
        <Teams />
        <Achievements />
        <Gallery />
        <Videos />
        <Reports />
        <Events />
        <CallToAction />
      </main>
      
      <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} />
      
      {/* Privacy Policy Modal */}
      <Privacy isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      
      {/* Accessibility Menu */}
      <AccessibilityMenu />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
      
      {/* Cookie Consent Banner */}
      <CookieBanner onOpenPrivacy={() => setIsPrivacyOpen(true)} />
    </div>
  );
}

export default App;


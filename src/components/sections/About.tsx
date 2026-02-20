import { Separator } from '@/components/ui/separator';
import { Spotlight } from '@/components/ui/spotlight';
import { Trophy, Users, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function About() {
  const { t } = useTranslation();
  
  const stats = [
    { icon: Trophy, label: t('about.stats.teams'), value: '4' },
    { icon: Users, label: t('about.stats.members'), value: '60+' },
    { icon: Target, label: t('about.stats.founded'), value: '2019' },
  ];

  return (
    <section id="about" className="relative py-24 bg-black overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#FF6B35" />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t('about.title')} <span className="text-primary">{t('about.titleHighlight')}</span>
          </h2>
          <Separator className="w-24 mx-auto mb-6 bg-white/20" />
          <p className="text-lg text-white/80 leading-relaxed">
            {t('about.intro')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 transition-colors backdrop-blur-sm"
            >
              <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2 text-white">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">{t('about.program.title')}</h3>
              <p className="text-white/70 leading-relaxed">
                {t('about.program.description')}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">{t('about.values.title')}</h3>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{t('about.values.fairness')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{t('about.values.support')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{t('about.values.joy')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{t('about.values.unity')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

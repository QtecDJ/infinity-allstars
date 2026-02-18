import { Separator } from '@/components/ui/separator';
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
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('about.title')} <span className="text-primary">{t('about.titleHighlight')}</span>
          </h2>
          <Separator className="w-24 mx-auto mb-6" />
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('about.intro')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{t('about.program.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.program.description')}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{t('about.values.title')}</h3>
              <ul className="space-y-2 text-muted-foreground">
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

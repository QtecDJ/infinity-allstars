import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Users, Award, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function CallToAction() {
  const { t } = useTranslation();
  
  const benefits = [
    {
      icon: Star,
      title: t('cta.benefits.acrobatics.title'),
      description: t('cta.benefits.acrobatics.description'),
    },
    {
      icon: Users,
      title: t('cta.benefits.teamSpirit.title'),
      description: t('cta.benefits.teamSpirit.description'),
    },
    {
      icon: Award,
      title: t('cta.benefits.competitions.title'),
      description: t('cta.benefits.competitions.description'),
    },
    {
      icon: Heart,
      title: t('cta.benefits.strength.title'),
      description: t('cta.benefits.strength.description'),
    },
  ];

  return (
    <section id="join" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('cta.title')} <span className="text-primary">{t('cta.titleHighlight')}</span>
            </h2>
            <Separator className="w-24 mx-auto mb-6" />
            <p className="text-xl text-muted-foreground">
              {t('cta.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-border hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <benefit.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {t('cta.interested.title')}
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('cta.interested.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8" asChild>
                  <a
                    href="mailto:cheerleader@tsvplattenhardt.de?subject=Probetraining%20Infinity%20Cheer%20Allstars"
                  >
                    {t('cta.interested.btnTrial')}
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="px-8" asChild>
                  <a
                    href="https://www.tsvplattenhardt.de/cheerleading46a5e1b6"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('cta.interested.btnInfo')}
                  </a>
                </Button>
              </div>
              <div className="mt-8 pt-8 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-2">Kontakt</p>
                <div className="flex flex-col gap-2 justify-center text-sm">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="mailto:cheerleader@tsvplattenhardt.de" className="text-primary hover:underline">
                      cheerleader@tsvplattenhardt.de
                    </a>
                    <span className="hidden sm:inline text-muted-foreground">|</span>
                    <a href="tel:017674798642" className="text-primary hover:underline">
                      Sandra Pohl: 0176 74798642
                    </a>
                    <span className="hidden sm:inline text-muted-foreground">|</span>
                    <a href="tel:017655772423" className="text-primary hover:underline">
                      Kai Püttmann: 0176 55772423
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                    <a
                      href="mailto:Geschaeftsstelle@tsvplattenhardt.de"
                      className="text-primary hover:underline"
                    >
                      Geschäftsstelle: geschaeftsstelle@tsvplattenhardt.de
                    </a>
                    <span className="hidden sm:inline text-muted-foreground">|</span>
                    <a href="tel:0711771393" className="text-primary hover:underline">
                      TSV: 0711 771393
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

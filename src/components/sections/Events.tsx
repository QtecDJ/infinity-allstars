import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '@/utils/paths';

type Event = {
  title: string;
  date: string;
  location: string;
  time: string;
  image: string;
  description: string;
};

export function Events() {
  const { t } = useTranslation();
  
  const events: Event[] = [
    {
      title: 'Showcase',
      date: t('events.showcase.date'),
      location: t('events.showcase.location'),
      time: t('events.showcase.time'),
      image: getAssetPath('/media/Event/showcase26.jpeg'),
      description: t('events.showcase.description')
    }
  ];

  return (
    <section id="events" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('events.title')} <span className="text-primary">{t('events.titleHighlight')}</span>
          </h2>
          <Separator className="w-24 mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            {t('events.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-card border-2 border-border hover:border-primary/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-full overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                    {event.title}
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-base">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-base">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-base">{event.time}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {event.description}
                  </p>

                  <Button 
                    className="w-full sm:w-auto group-hover:scale-105 transition-transform" 
                    size="lg"
                    onClick={() => window.open('https://form.jotform.com/260401385105345', '_blank')}
                  >
                    <Ticket className="w-5 h-5 mr-2" />
                    {t('events.showcase.presale')}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

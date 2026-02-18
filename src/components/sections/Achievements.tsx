import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Medal, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface Achievement {
  year: number;
  event: string;
  result: string;
  type: 'gold' | 'silver' | 'bronze' | 'top5' | 'placement';
}

interface TeamAchievements {
  team: string;
  achievements: Achievement[];
}

const teamAchievementsData: TeamAchievements[] = [
  {
    team: 'King & Queen',
    achievements: [
      { year: 2025, event: 'Meisterschaft', result: '1. Platz', type: 'gold' },
    ],
  },
  {
    team: 'Kings & Queens',
    achievements: [
      { year: 2025, event: 'Meisterschaft', result: '2. Platz', type: 'silver' },
      { year: 2025, event: 'Meisterschaft', result: '6. Platz', type: 'placement' },
    ],
  },
  {
    team: 'Infinity Divas',
    achievements: [
      { year: 2025, event: 'Meisterschaft', result: '5. Platz', type: 'top5' },
      { year: 2024, event: 'SpringCheerMaster Heidelberg (13. April)', result: 'Platz 4', type: 'top5' },
    ],
  },
  {
    team: 'Diva5',
    achievements: [
      { year: 2025, event: 'Meisterschaft', result: '2. Platz (Hit 0 – fehlerfreie Routine)', type: 'silver' },
    ],
  },
  {
    team: 'Infinity Princesses',
    achievements: [
      { year: 2025, event: 'Meisterschaft', result: '3. Platz', type: 'bronze' },
      { year: 2025, event: 'Meisterschaft', result: '6. Platz', type: 'placement' },
      { year: 2024, event: 'SpringCheerMaster Heidelberg (13. April)', result: 'Platz 13', type: 'placement' },
    ],
  },
  {
    team: 'Infinity Queens',
    achievements: [
      { year: 2024, event: 'SpringCheerMaster Heidelberg (13. April)', result: 'Platz 4', type: 'top5' },
    ],
  },
  {
    team: 'Best of 5',
    achievements: [
      { year: 2024, event: 'SpringCheerMaster Heidelberg (13. April)', result: 'Platz 4', type: 'top5' },
    ],
  },
  {
    team: 'Power Puff Girls',
    achievements: [
      { year: 2024, event: 'SpringCheerMaster Heidelberg (13. April)', result: 'Platz 6', type: 'placement' },
    ],
  },
  {
    team: 'Kim Possible',
    achievements: [
      { year: 2024, event: 'SpringCheerMaster Heidelberg (13. April)', result: 'Platz 7', type: 'placement' },
    ],
  },
];

const getBadgeVariant = (type: 'gold' | 'silver' | 'bronze' | 'top5' | 'placement') => {
  switch (type) {
    case 'gold':
      return 'default';
    case 'silver':
      return 'secondary';
    case 'bronze':
      return 'outline';
    case 'top5':
      return 'secondary';
    case 'placement':
      return 'outline';
    default:
      return 'outline';
  }
};

const getIcon = (type: 'gold' | 'silver' | 'bronze' | 'top5' | 'placement') => {
  switch (type) {
    case 'gold':
      return Trophy;
    case 'silver':
      return Award;
    case 'bronze':
      return Medal;
    case 'top5':
      return Star;
    case 'placement':
      return Trophy;
    default:
      return Trophy;
  }
};

const getIconColor = (type: 'gold' | 'silver' | 'bronze' | 'top5' | 'placement') => {
  switch (type) {
    case 'gold':
      return 'text-yellow-400';
    case 'silver':
      return 'text-gray-300';
    case 'bronze':
      return 'text-orange-400';
    case 'top5':
      return 'text-primary';
    case 'placement':
      return 'text-muted-foreground';
    default:
      return 'text-muted-foreground';
  }
};

export function Achievements() {
  const { t } = useTranslation();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };
  
  return (
    <section id="achievements" className="py-20 bg-gradient-to-b from-background to-background/50 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('achievements.title')} <span className="text-primary">{t('achievements.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('achievements.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {teamAchievementsData.map((teamData, teamIndex) => {
            const topAchievement = teamData.achievements[0];
            const Icon = getIcon(topAchievement.type);
            const iconColor = getIconColor(topAchievement.type);
            const isTopTeam = ['gold', 'silver', 'bronze'].some(t => 
              teamData.achievements.some(a => a.type === t)
            );
            
            return (
              <motion.div
                key={teamIndex}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group"
              >
                <div className={`relative h-full bg-card/50 backdrop-blur-sm border-2 rounded-xl p-6 transition-all duration-300 overflow-hidden
                  ${isTopTeam ? 'border-primary/30 hover:border-primary hover:shadow-xl hover:shadow-primary/30' : 'border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20'}
                `}>
                  
                  {/* Subtle glow effect */}
                  {isTopTeam && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  
                  {/* Header with team name and icon */}
                  <div className="relative flex items-center gap-3 mb-4 pb-4 border-b border-border/50">
                    <div className={`p-2.5 rounded-lg ${isTopTeam ? 'bg-primary/15' : 'bg-muted'} transition-all duration-300 group-hover:scale-110`}>
                      <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex-1">
                      {teamData.team}
                    </h3>
                  </div>
                  
                  {/* Achievements list */}
                  <div className="relative space-y-3">
                    {teamData.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start gap-2">
                        <Badge 
                          variant={getBadgeVariant(achievement.type)} 
                          className="text-xs font-semibold shrink-0 mt-0.5"
                        >
                          {achievement.year}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium leading-tight mb-0.5">
                            {achievement.event}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {achievement.result}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Bottom accent for top teams */}
                  {isTopTeam && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

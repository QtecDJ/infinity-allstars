import { useState } from 'react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '@/utils/paths';
import type { Team } from '@/types';

const useTeamsData = (): Team[] => {
  const { t } = useTranslation();
  
  return [
    {
      id: 'sparkles',
      name: t('teams.sparkles.name'),
      description: t('teams.sparkles.description'),
      level: t('teams.sparkles.level'),
      ageGroup: t('teams.sparkles.ageGroup'),
      birthYears: t('teams.sparkles.birthYears'),
      image: getAssetPath('/media/ica/spark.jpeg'),
      coaches: ['Adriana Wenzel', 'Cetric Kaiser'],
      trainingTimes: ['Freitags 15:30–17:00 Uhr / Fridays 3:30–5:00 PM'],
      trainingLocations: ['Höhensporthalle (Gymnastikraum)'],
    },
    {
      id: 'princesses',
      name: t('teams.princesses.name'),
      description: t('teams.princesses.description'),
      level: t('teams.princesses.level'),
      ageGroup: t('teams.princesses.ageGroup'),
      birthYears: t('teams.princesses.birthYears'),
      image: getAssetPath('/media/ica/Princ.jpg'),
      coaches: ['Chantal Pohl', 'Julia Rebman'],
      trainingTimes: ['Freitags 15:30–17:00 Uhr / Fridays 3:30–5:00 PM'],
      trainingLocations: ['Weilerhauhalle'],
    },
    {
      id: 'divas',
      name: t('teams.divas.name'),
      description: t('teams.divas.description'),
      level: t('teams.divas.level'),
      ageGroup: t('teams.divas.ageGroup'),
      birthYears: t('teams.divas.birthYears'),
      image: getAssetPath('/media/ica/Divas.jpg'),
      coaches: ['Sandra Pohl'],
      trainingTimes: ['Dienstags 17:15–18:30 Uhr / Tuesdays 5:15–6:30 PM', 'Freitags 16:30–18:00 Uhr / Fridays 4:30–6:00 PM'],
      trainingLocations: ['Höhensporthalle (Gymnastikraum)', 'Weilerhauhalle'],
    },
    {
      id: 'kings-queens',
      name: t('teams.kingsQueens.name'),
      description: t('teams.kingsQueens.description'),
      level: t('teams.kingsQueens.level'),
      ageGroup: t('teams.kingsQueens.ageGroup'),
      birthYears: t('teams.kingsQueens.birthYears'),
      image: getAssetPath('/media/ica/queens2.jpg'),
      coaches: ['Sandra Pohl', 'Sabrina Hertfelder'],
      trainingTimes: ['Dienstags 18:00–19:30 Uhr / Tuesdays 6:00–7:30 PM', 'Freitags 19:30–21:15 Uhr / Fridays 7:30–9:15 PM'],
      trainingLocations: ['Höhensporthalle (Gymnastikraum)', 'Weilerhauhalle'],
    },
  ];
};

export function Teams() {
  const { t } = useTranslation();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const teamsData = useTeamsData();

  return (
    <section id="teams" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('teams.title')} <span className="text-primary">{t('teams.titleHighlight')}</span>
          </h2>
          <Separator className="w-24 mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            {t('teams.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {teamsData.map((team) => (
            <Card
              key={team.id}
              className="overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col h-full"
            >
              <div
                className="h-64 bg-contain bg-center bg-no-repeat bg-black flex-shrink-0"
                style={{ backgroundImage: `url(${team.image})` }}
              />
              <CardHeader className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="default">{team.level}</Badge>
                  <span className="text-xs text-muted-foreground">{team.birthYears ?? team.ageGroup}</span>
                </div>
                <CardTitle className="text-xl">{team.name}</CardTitle>
                <CardDescription>{team.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex-shrink-0">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedTeam(team)}
                >
                  {t('teams.btnDetails')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedTeam} onOpenChange={() => setSelectedTeam(null)}>
        <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader className="pr-8">
            <DialogTitle className="text-xl sm:text-2xl">{selectedTeam?.name}</DialogTitle>
            <DialogDescription>
              <div className="flex gap-2 mt-2">
                <Badge>{selectedTeam?.level}</Badge>
                <Badge variant="outline">{selectedTeam?.birthYears ?? selectedTeam?.ageGroup}</Badge>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 sm:space-y-4">
            <div
              className="h-48 sm:h-80 bg-contain bg-center bg-no-repeat bg-black rounded-lg"
              style={{ backgroundImage: `url(${selectedTeam?.image})` }}
            />
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {selectedTeam?.description}
            </p>
            <Separator />
            <div className="space-y-2 sm:space-y-3">
              <h4 className="font-semibold text-base sm:text-lg">{t('teams.dialog.trainingInfo')}</h4>
              <div className="grid grid-cols-1 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <p className="text-muted-foreground text-xs sm:text-sm">{t('teams.dialog.coaches')}</p>
                  <p className="font-medium text-sm sm:text-base">
                    {(selectedTeam?.coaches ?? []).length > 0
                      ? (selectedTeam?.coaches ?? []).join(', ')
                      : t('teams.dialog.coachesFallback')}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs sm:text-sm">{t('teams.dialog.trainingTimes')}</p>
                  <p className="font-medium text-sm sm:text-base leading-relaxed">
                    {(selectedTeam?.trainingTimes ?? []).length > 0
                      ? (selectedTeam?.trainingTimes ?? []).map((time, i) => (
                          <span key={i} className="block">{time}</span>
                        ))
                      : t('teams.dialog.trainingTimesFallback')}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs sm:text-sm">{t('teams.dialog.locations')}</p>
                  <p className="font-medium text-sm sm:text-base">
                    {(selectedTeam?.trainingLocations ?? []).length > 0
                      ? (selectedTeam?.trainingLocations ?? []).join(' · ')
                      : t('teams.dialog.locationsFallback')}
                  </p>
                </div>
              </div>
            </div>
            <Button className="w-full" onClick={() => {
              const element = document.getElementById('join');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setSelectedTeam(null);
              }
            }}>
              {t('cta.interested.btnTrial')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

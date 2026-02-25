import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Play, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Video = {
  title: string;
  platform: 'instagram' | 'tiktok';
  url: string;
  embedUrl: string;
  thumbnail?: string;
};

export function Videos() {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const videos: Video[] = [
    {
      title: 'Team Performance',
      platform: 'instagram',
      url: 'https://www.instagram.com/reel/C6CU2X_qCAB/',
      embedUrl: 'https://www.instagram.com/reel/C6CU2X_qCAB/embed',
    },
    {
      title: 'TikTok Performance',
      platform: 'tiktok',
      url: 'https://www.tiktok.com/@infinitycheerallstars/video/7231606496025431322',
      embedUrl: 'https://www.tiktok.com/embed/v2/7231606496025431322',
    },
    // Weitere Videos hier hinzufügen
  ];

  return (
    <section id="videos" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('videos.title')} <span className="text-primary">{t('videos.titleHighlight')}</span>
          </h2>
          <Separator className="w-24 mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            {t('videos.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {videos.map((video, index) => (
            <Card 
              key={index} 
              className="overflow-hidden border-border hover:border-primary/50 transition-all cursor-pointer group"
              onClick={() => setSelectedVideo(video)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedVideo(video);
                }
              }}
              aria-label={`${t('aria.openVideo')}: ${video.title}`}
            >
              <div className="relative bg-gradient-to-b from-black/50 to-black/80 aspect-[9/16] flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-10 h-10 text-white ml-1" fill="white" />
                  </div>
                  <p className="text-white text-lg font-semibold px-4 text-center">{video.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-[500px] md:max-w-[600px] p-0 bg-black border border-primary/20">
          <DialogTitle className="sr-only">
            {selectedVideo?.title || 'Video'}
          </DialogTitle>
          
          {/* Close Button */}
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute -top-10 right-0 z-50 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
            aria-label="Video schließen"
          >
            <X className="w-5 h-5" />
          </button>

          {selectedVideo && (
            <div className="relative w-full bg-black overflow-hidden" style={{ aspectRatio: '9/16', maxHeight: '80vh' }}>
              <iframe
                src={selectedVideo.embedUrl}
                className="w-full h-full"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title={selectedVideo.title}
                loading="lazy"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

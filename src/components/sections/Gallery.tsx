import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '@/utils/paths';
import type { GalleryImage } from '@/types';

const galleryData: GalleryImage[] = [
  {
    id: '1',
    url: getAssetPath('/media/tsv/10-b62b6d4f-1920w.jpg'),
    thumbnail: getAssetPath('/media/tsv/10-b62b6d4f-640w.jpg'),
    alt: 'Auftritt bei einem Wettkampf',
    category: 'competition',
  },
  {
    id: '2',
    url: getAssetPath('/media/tsv/IMG-20230503-WA0019-1920w.jpg'),
    alt: 'Training: Stunts und Technik',
    category: 'training',
  },
  {
    id: '3',
    url: getAssetPath('/media/tsv/DSCN9194-1920w.JPG'),
    alt: 'Siegerehrung und Teamjubel',
    category: 'success',
  },
  {
    id: '4',
    url: getAssetPath('/media/tsv/DSCN9272-1920w.JPG'),
    alt: 'Teamgeist und Zusammenhalt',
    category: 'team',
  },
  {
    id: '5',
    url: getAssetPath('/media/tsv/9-00a8ac77-1920w.jpg'),
    thumbnail: getAssetPath('/media/tsv/9-00a8ac77-640w.jpg'),
    alt: 'Stunt-Element im Wettkampf',
    category: 'competition',
  },
  {
    id: '6',
    url: getAssetPath('/media/tsv/7-38276b71-1920w.jpg'),
    thumbnail: getAssetPath('/media/tsv/7-38276b71-640w.jpg'),
    alt: 'Training im Nachwuchsbereich',
    category: 'training',
  },
  {
    id: '7',
    url: getAssetPath('/media/tsv/8-8ac61970-1920w.jpg'),
    thumbnail: getAssetPath('/media/tsv/8-8ac61970-640w.jpg'),
    alt: 'Formation auf der Fläche',
    category: 'competition',
  },
  {
    id: '8',
    url: getAssetPath('/media/tsv/14-1920w.jpg'),
    alt: 'Gemeinsames Feiern nach dem Auftritt',
    category: 'success',
  },
  {
    id: '9',
    url: getAssetPath('/media/fasching/WhatsApp Image 2026-02-19 at 13.10.57.jpeg'),
    alt: 'Auftritt Fasching 2026',
    category: 'performance',
  },
  {
    id: '10',
    url: getAssetPath('/media/fasching/WhatsApp Image 2026-02-19 at 13.10.57 (1).jpeg'),
    alt: 'Auftritt Fasching 2026',
    category: 'performance',
  },
  {
    id: '11',
    url: getAssetPath('/media/fasching/WhatsApp Image 2026-02-19 at 13.10.57 (2).jpeg'),
    alt: 'Auftritt Fasching 2026',
    category: 'performance',
  },
  {
    id: '12',
    url: getAssetPath('/media/fasching/WhatsApp Image 2026-02-19 at 13.10.57 (3).jpeg'),
    alt: 'Auftritt Fasching 2026',
    category: 'performance',
  },
  {
    id: '13',
    url: getAssetPath('/media/fasching/WhatsApp Image 2026-02-19 at 13.10.58.jpeg'),
    alt: 'Auftritt Fasching 2026',
    category: 'performance',
  },
  {
    id: '14',
    url: getAssetPath('/media/fasching/WhatsApp Image 2026-02-19 at 13.10.58 (1).jpeg'),
    alt: 'Auftritt Fasching 2026',
    category: 'performance',
  },
  {
    id: '15',
    url: getAssetPath('/media/fasching/WhatsApp Image 2026-02-19 at 13.10.58 (2).jpeg'),
    alt: 'Auftritt Fasching 2026',
    category: 'performance',
  },
  {
    id: '16',
    url: getAssetPath('/media/fasching/WhatsApp Image 2026-02-19 at 13.10.58 (3).jpeg'),
    alt: 'Auftritt Fasching 2026',
    category: 'performance',
  },
];

export function Gallery() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  const categories: Array<{ key: string; label: string }> = [
    { key: 'all', label: t('gallery.categories.all') },
    { key: 'competition', label: t('gallery.categories.competition') },
    { key: 'training', label: t('gallery.categories.training') },
    { key: 'success', label: t('gallery.categories.success') },
    { key: 'team', label: t('gallery.categories.team') },
    { key: 'performance', label: t('gallery.categories.performance') },
  ];

  const filteredImages =
    selectedCategory === 'all'
      ? galleryData
      : galleryData.filter((img) => img.category === selectedCategory);

  const handlePrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < filteredImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  };

  return (
    <section id="gallery" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">{t('gallery.title')}</span>
          </h2>
          <Separator className="w-24 mx-auto mb-6" />
          <p className="text-lg text-muted-foreground mb-8">
            {t('gallery.subtitle')}
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Badge
                key={category.key}
                variant={selectedCategory === category.key ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2"
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-muted"
              onClick={() => setSelectedImageIndex(index)}
              style={{ 
                contentVisibility: 'auto',
                contain: 'layout style paint',
              }}
            >
              <img
                src={image.thumbnail || image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
                fetchPriority={index < 6 ? "high" : "low"}
                style={{ 
                  transform: 'translateZ(0)',
                  imageRendering: 'crisp-edges',
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <Badge variant="default" className="mb-2 text-xs sm:text-sm">
                    {t(`gallery.categories.${image.category}`)}
                  </Badge>
                  <p className="text-sm sm:text-base text-white font-medium">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent 
          className="max-w-[98vw] max-h-[98vh] w-auto h-auto p-0 bg-black/95 border-0"
          onKeyDown={handleKeyDown}
        >
          {selectedImageIndex !== null && filteredImages[selectedImageIndex] && (
            <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
              {/* Close Button */}
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 p-2 sm:p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 sm:w-6 sm:h-6 text-white" />
              </button>

              {/* Previous Button */}
              {selectedImageIndex > 0 && (
                <button
                  onClick={handlePrevious}
                  className="absolute left-2 sm:left-4 z-50 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
              )}

              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={filteredImages[selectedImageIndex].url}
                  alt={filteredImages[selectedImageIndex].alt}
                  className="max-w-full max-h-[90vh] sm:max-h-[85vh] w-auto h-auto object-contain rounded-lg"
                  decoding="async"
                  loading="eager"
                />
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 to-transparent rounded-b-lg">
                  <Badge variant="default" className="mb-1 sm:mb-2 text-xs">
                    {t(`gallery.categories.${filteredImages[selectedImageIndex].category}`)}
                  </Badge>
                  <p className="text-white text-xs sm:text-sm md:text-base">
                    {filteredImages[selectedImageIndex].alt}
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    {selectedImageIndex + 1} / {filteredImages.length}
                  </p>
                </div>
              </div>

              {/* Next Button */}
              {selectedImageIndex < filteredImages.length - 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 z-50 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

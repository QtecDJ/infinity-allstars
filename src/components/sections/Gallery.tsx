import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import type { GalleryImage } from '@/types';

const galleryData: GalleryImage[] = [
  {
    id: '1',
    url: '/media/tsv/10-b62b6d4f-1920w.jpg',
    alt: 'Auftritt bei einem Wettkampf',
    category: 'competition',
  },
  {
    id: '2',
    url: '/media/tsv/IMG-20230503-WA0019-1920w.jpg',
    alt: 'Training: Stunts und Technik',
    category: 'training',
  },
  {
    id: '3',
    url: '/media/tsv/DSCN9194-1920w.JPG',
    alt: 'Siegerehrung und Teamjubel',
    category: 'success',
  },
  {
    id: '4',
    url: '/media/tsv/DSCN9272-1920w.JPG',
    alt: 'Teamgeist und Zusammenhalt',
    category: 'team',
  },
  {
    id: '5',
    url: '/media/tsv/9-00a8ac77-1920w.jpg',
    alt: 'Stunt-Element im Wettkampf',
    category: 'competition',
  },
  {
    id: '6',
    url: '/media/tsv/7-38276b71-1920w.jpg',
    alt: 'Training im Nachwuchsbereich',
    category: 'training',
  },
  {
    id: '7',
    url: '/media/tsv/8-8ac61970-1920w.jpg',
    alt: 'Formation auf der Fläche',
    category: 'competition',
  },
  {
    id: '8',
    url: '/media/tsv/14-1920w.jpg',
    alt: 'Gemeinsames Feiern nach dem Auftritt',
    category: 'success',
  },
];

export function Gallery() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories: Array<{ key: string; label: string }> = [
    { key: 'all', label: t('gallery.categories.all') },
    { key: 'competition', label: t('gallery.categories.competition') },
    { key: 'training', label: t('gallery.categories.training') },
    { key: 'success', label: t('gallery.categories.success') },
    { key: 'team', label: t('gallery.categories.team') },
  ];

  const filteredImages =
    selectedCategory === 'all'
      ? galleryData
      : galleryData.filter((img) => img.category === selectedCategory);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Badge variant="default" className="mb-2">
                    {t(`gallery.categories.${image.category}`)}
                  </Badge>
                  <p className="text-sm text-white">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

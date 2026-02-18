export interface Team {
  id: string;
  name: string;
  description: string;
  level: string;
  ageGroup: string;
  birthYears?: string;
  image: string;
  coaches?: string[];
  trainingTimes?: string[];
  trainingLocations?: string[];
}

export interface Achievement {
  year: number;
  title: string;
  description: string;
  type: 'gold' | 'silver' | 'bronze' | 'champion' | 'top5' | 'placement';
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: string;
}

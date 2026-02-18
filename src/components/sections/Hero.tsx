import Hero01 from '@/components/shadcn-space/blocks/hero-01/hero';
import { getAssetPath } from '@/utils/paths';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Hero01
      id="hero"
      backgroundImageUrl={getAssetPath('/media/ica/infinity-kings-queens.jpg')}
      avatarList={[]}
      onPrimaryAction={() => scrollToSection('teams')}
      onSecondaryAction={() => scrollToSection('join')}
      onScrollDown={() => scrollToSection('about')}
    />
  );
}

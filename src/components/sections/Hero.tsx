import Hero01 from '@/components/shadcn-space/blocks/hero-01/hero';

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
      avatarList={[]}
      onPrimaryAction={() => scrollToSection('teams')}
      onSecondaryAction={() => scrollToSection('join')}
      onScrollDown={() => scrollToSection('about')}
    />
  );
}

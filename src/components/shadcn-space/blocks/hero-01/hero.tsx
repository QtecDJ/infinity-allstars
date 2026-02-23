import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { getAssetPath } from "@/utils/paths";

export type AvatarList = {
  image: string;
  alt?: string;
};

type HeroSectionProps = {
  id?: string;
  avatarList?: AvatarList[];
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  onScrollDown?: () => void;
};

function HeroSection({
  id,
  onPrimaryAction,
  onSecondaryAction,
  onScrollDown,
}: HeroSectionProps) {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Media slides configuration
  const mediaSlides = [
    { type: 'video', url: getAssetPath("/media/HeroMedia/icac.webm") },
    { type: 'image', url: getAssetPath("/media/ica/infinity-kings-queens.jpg") },
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  // Parallax Scroll Effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.9, 0.5]);
  
  // Countdown State
  const targetDate = new Date('2026-05-02T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);
  
  // Auto-slide functionality
  useEffect(() => {
    if (isVideoPlaying) return;
    
    // Only auto-advance from image (slide 1) back to video (slide 0)
    if (currentSlide === 1) {
      const timer = setTimeout(() => {
        setCurrentSlide(0); // Go back to video
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [currentSlide, isVideoPlaying]);
  
  // Handle video playback
  useEffect(() => {
    const currentMedia = mediaSlides[currentSlide];
    
    if (currentMedia.type === 'video' && videoRef.current) {
      setIsVideoPlaying(true);
      videoRef.current.play().catch(err => {
        console.error('Error playing video:', err);
        setIsVideoPlaying(false);
      });
    }
  }, [currentSlide]);
  
  // Handle video end event
  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    // Switch to image after video ends
    setCurrentSlide(1);
  };
  
  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .hero-bg-mobile {
            background-size: auto 100% !important;
            background-position: center center !important;
          }
        }
      `}</style>
      <section
        ref={heroRef}
        id={id}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        {/* Background Media with Sepia and Parallax */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          {mediaSlides.map((media, index) => {
            const isActive = index === currentSlide;
            
            if (media.type === 'image') {
              return (
                <motion.div
                  key={`image-${index}`}
                  className="absolute inset-0 hero-bg-mobile"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  style={{
                    backgroundImage: `url(${media.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    filter: "sepia(0.4) contrast(1.1) brightness(0.9)",
                    y: backgroundY,
                    willChange: "transform, opacity",
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                  }}
                />
              );
            } else if (media.type === 'video') {
              return (
                <motion.div
                  key={`video-${index}`}
                  className="absolute inset-0"
                  initial={{ opacity: index === 0 ? 1 : 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  style={{
                    willChange: "opacity",
                  }}
                >
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    style={{
                      filter: "sepia(0.4) contrast(1.1) brightness(0.9)",
                    }}
                    muted
                    playsInline
                    onEnded={handleVideoEnded}
                  >
                    <source src={media.url} type="video/webm" />
                  </video>
                </motion.div>
              );
            }
            return null;
          })}
        </div>
        
        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(139,69,19,0.3) 0%, rgba(0,0,0,0.6) 50%, rgba(25,25,112,0.4) 100%)",
            opacity: opacity,
            willChange: "opacity",
            zIndex: 1,
          }}
        />
      <motion.div 
        className="w-full h-full relative"
        style={{ 
          y: contentY,
          willChange: "transform",
          transform: "translateZ(0)",
          zIndex: 10,
        }}
      >
        <div className="relative w-full pt-24 md:pt-20 pb-10">
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col max-w-5xl mx-auto gap-8">
              <div className="relative flex flex-col text-center items-center sm:gap-6 gap-4">
                <style>{`
                  .hero-title-3d {
                    text-shadow: 
                      0 1px 0 rgba(0,0,0,0.3),
                      0 2px 0 rgba(0,0,0,0.25),
                      0 3px 0 rgba(0,0,0,0.2),
                      0 4px 0 rgba(0,0,0,0.15),
                      0 5px 0 rgba(0,0,0,0.1),
                      0 6px 1px rgba(0,0,0,0.1),
                      0 0 5px rgba(0,0,0,0.1),
                      0 1px 3px rgba(0,0,0,0.3),
                      0 3px 5px rgba(0,0,0,0.2),
                      0 5px 10px rgba(0,0,0,0.25),
                      0 10px 15px rgba(0,0,0,0.2),
                      0 15px 25px rgba(0,0,0,0.15);
                  }
                  .hero-title-3d .text-primary {
                    text-shadow: 
                      0 1px 0 rgba(var(--primary-rgb, 255, 0, 0), 0.7),
                      0 2px 0 rgba(0,0,0,0.25),
                      0 3px 0 rgba(0,0,0,0.2),
                      0 4px 0 rgba(0,0,0,0.15),
                      0 5px 0 rgba(0,0,0,0.1),
                      0 6px 1px rgba(0,0,0,0.1),
                      0 0 10px rgba(var(--primary-rgb, 255, 0, 0), 0.3),
                      0 1px 3px rgba(0,0,0,0.3),
                      0 3px 5px rgba(0,0,0,0.2),
                      0 5px 10px rgba(0,0,0,0.25),
                      0 10px 15px rgba(0,0,0,0.2),
                      0 15px 25px rgba(0,0,0,0.15);
                  }
                `}</style>
                <motion.h1
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="lg:text-8xl md:text-7xl text-5xl font-bold leading-tight text-white hero-title-3d"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}
                >
                  {t('hero.title').split(' ').slice(0, 1).join(' ')} <span className="text-primary">{t('hero.title').split(' ').slice(1).join(' ')}</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: "easeInOut" }}
                  className="text-base md:text-lg font-normal max-w-2xl text-foreground/90"
                >
                  {t('hero.subtitle')}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.15, ease: "easeInOut" }}
                  className="text-xl md:text-2xl font-bold text-primary text-center"
                >
                  {t('hero.motto')}
                </motion.p>

                {/* Countdown Timer - Professional */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                  className="w-full max-w-2xl mx-auto mt-10"
                >
                  <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl">
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide text-center mb-6">
                      STAGE Championship
                    </h3>
                    <div className="grid grid-cols-4 gap-3 md:gap-6">
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                          {timeLeft.days}
                        </div>
                        <span className="text-xs md:text-sm text-white/60 uppercase tracking-wider">Tage</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                          {timeLeft.hours}
                        </div>
                        <span className="text-xs md:text-sm text-white/60 uppercase tracking-wider">Stunden</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                          {timeLeft.minutes}
                        </div>
                        <span className="text-xs md:text-sm text-white/60 uppercase tracking-wider">Minuten</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-4xl md:text-6xl font-bold text-primary" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                          {timeLeft.seconds}
                        </div>
                        <span className="text-xs md:text-sm text-white/60 uppercase tracking-wider">Sekunden</span>
                      </div>
                    </div>
                    <div className="text-center mt-6 pt-6 border-t border-white/10">
                      <span className="text-sm text-white/70">02. Mai 2026</span>
                    </div>
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.25, ease: "easeInOut" }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button
                  onClick={onPrimaryAction}
                  className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden"
                >
                  <span className="relative z-10 transition-all duration-500">
                    {t('hero.btnDiscover')}
                  </span>
                  <span className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </Button>

                <Button
                  variant="outline"
                  onClick={onSecondaryAction}
                  className="rounded-full h-12 px-8"
                >
                  {t('hero.btnTrial')}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <button
        onClick={onScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/60 hover:text-primary transition-colors z-10"
        aria-label={t('hero.scrollDown')}
        type="button"
      >
        <ChevronDown size={32} className="animate-bounce" />
      </button>
    </section>
    </>
  );
}

export default HeroSection;

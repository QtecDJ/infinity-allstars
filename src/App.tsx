import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Teams } from '@/components/sections/Teams';
import { Achievements } from '@/components/sections/Achievements';
import { Gallery } from '@/components/sections/Gallery';
import { Videos } from '@/components/sections/Videos';
import { Events } from '@/components/sections/Events';
import { CallToAction } from '@/components/sections/CallToAction';
import { Footer } from '@/components/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Teams />
        <Achievements />
        <Gallery />
        <Videos />
        <Events />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default App;

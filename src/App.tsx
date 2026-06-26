import { useLayoutEffect } from "react";
import { CartProvider } from '@/context/CartContext';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import LogoMarquee from '@/sections/LogoMarquee';
import Features from '@/sections/Features';
import Products from '@/sections/Products';
import DynamicLayouts from '@/sections/DynamicLayouts';
import Testimonials from '@/sections/Testimonials';
import Footer from '@/sections/Footer';
import Lenis from "lenis";
import './App.css';

function App() {

  // ✅ SMOOTH SCROLL ENGINE (GLOBAL)
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);


  return (
    <CartProvider>
      <div className="min-h-screen bg-white grain-overlay">
        <Navigation />
        <main>
          <Hero />
          <LogoMarquee />
          <Features />
          <Products />
          <DynamicLayouts />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;

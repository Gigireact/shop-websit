import { CartProvider } from '@/context/CartContext';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import LogoMarquee from '@/sections/LogoMarquee';
import Features from '@/sections/Features';
import Products from '@/sections/Products';
import DynamicLayouts from '@/sections/DynamicLayouts';
import Testimonials from '@/sections/Testimonials';
import Footer from '@/sections/Footer';
import './App.css';

function App() {
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

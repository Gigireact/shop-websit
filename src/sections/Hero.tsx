import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateX = (e.clientY - centerY) / 20;
      const rotateY = (centerX - e.clientX) / 20;
      setMousePosition({ x: rotateY, y: rotateX });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-dark/40 via-transparent to-purple-dark/60" />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-white/90 text-sm font-medium">Premium Collection 2024</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
              Modern{' '}
              <span className="text-gradient bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
                WooCommerce
              </span>{' '}
              Theme
            </h1>

            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
              A powerful, user-friendly theme for creating stunning online stores.
              Elevate your brand with our cutting-edge design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-purple hover:bg-purple-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 group"
              >
                Purchase ShopHub
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm"
              >
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              {[
                { value: '10K+', label: 'Active Stores' },
                { value: '99%', label: 'Satisfaction' },
                { value: '24/7', label: 'Support' },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - 3D Product Card */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div
              ref={cardRef}
              className="relative w-full max-w-md aspect-[3/4] animate-float"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-purple/30 rounded-3xl blur-3xl transform scale-90" />
              
              {/* Card */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl overflow-hidden">
                {/* Product Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-light/50 to-white/30 mb-6">
                  <img
                    src="/images/hero-headphones.jpg"
                    alt="Premium Headphones"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-purple/20 text-purple-300 text-sm font-medium rounded-full">
                      Best Seller
                    </span>
                    <span className="text-white/60 text-sm">In Stock</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Premium Wireless Headphones</h3>
                  <p className="text-white/70 text-sm">Experience crystal-clear audio with active noise cancellation.</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold text-white">$299.00</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

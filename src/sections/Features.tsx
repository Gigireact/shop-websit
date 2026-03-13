import { useEffect, useRef, useState } from 'react';
import { Users, Layout, Star, Zap, Shield, Headphones } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Engage your visitors',
    description: 'Convert casual browsers into loyal customers with immersive product experiences.',
  },
  {
    icon: Layout,
    title: 'Sleek product displays',
    description: 'Showcase your products in stunning layouts that highlight every detail.',
  },
  {
    icon: Star,
    title: 'Build trust with reviews',
    description: 'Leverage social proof with integrated review and rating systems.',
  },
  {
    icon: Zap,
    title: 'Lightning fast',
    description: 'Optimized performance ensures your store loads in milliseconds.',
  },
  {
    icon: Shield,
    title: 'Secure checkout',
    description: 'Bank-level security protects every transaction on your store.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our expert team is always ready to help you succeed.',
  },
];

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Left - Image */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              {/* Background Decoration */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-light rounded-full blur-3xl opacity-60" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple/20 rounded-full blur-3xl opacity-60" />
              
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/feature-headphones.jpg"
                  alt="Featured Product"
                  className="w-full aspect-[4/5] object-cover"
                />
                
                {/* Overlay Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-purple-dark">Fast Delivery</p>
                      <p className="text-sm text-gray-500">Free shipping on orders over $50</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <span className="inline-block px-4 py-2 bg-purple-light text-purple text-sm font-semibold rounded-full mb-6">
              Why Choose Us
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-dark mb-6">
              Stunning{' '}
              <span className="text-purple">shop</span>{' '}
              layouts
            </h2>
            
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              Engage your visitors with a modern, clean design that highlights your products beautifully. 
              Our theme is built to convert visitors into customers.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      activeFeature === index
                        ? 'bg-purple-light border-purple/30 shadow-md'
                        : 'bg-gray-50 border-gray-100 hover:bg-purple-light/50 hover:border-purple/20'
                    }`}
                    onMouseEnter={() => setActiveFeature(index)}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                      activeFeature === index ? 'bg-purple' : 'bg-purple/10'
                    }`}>
                      <Icon className={`w-5 h-5 transition-colors ${
                        activeFeature === index ? 'text-white' : 'text-purple'
                      }`} />
                    </div>
                    <h3 className="font-semibold text-purple-dark mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

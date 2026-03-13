import { useEffect, useRef, useState } from 'react';
import { Palette, Code, Smartphone, Globe, Check } from 'lucide-react';

const features = [
  'Custom color schemes',
  'Responsive design',
  'Drag & drop builder',
  'SEO optimized',
  'Fast loading speed',
  'Regular updates',
];

export default function DynamicLayouts() {
  const [isVisible, setIsVisible] = useState(false);
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
    <section ref={sectionRef} className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Left - Content */}
          <div className={`order-2 lg:order-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="inline-block px-4 py-2 bg-purple-light text-purple text-sm font-semibold rounded-full mb-6">
              Customization
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-dark mb-6">
              Dynamic{' '}
              <span className="text-purple">layouts</span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Customize every detail to match your brand and captivate your audience. 
              Our flexible layout system gives you complete control over your store&apos;s appearance.
            </p>

            {/* Feature Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {[
                { icon: Palette, label: 'Colors' },
                { icon: Code, label: 'Code' },
                { icon: Smartphone, label: 'Mobile' },
                { icon: Globe, label: 'Global' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-purple-light transition-colors group"
                  >
                    <div className="w-12 h-12 bg-purple/10 rounded-xl flex items-center justify-center mb-2 group-hover:bg-purple transition-colors">
                      <Icon className="w-6 h-6 text-purple group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-medium text-gray-600 group-hover:text-purple-dark transition-colors">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Feature List */}
            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-purple" />
                  </div>
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div className={`order-1 lg:order-2 relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Background Decoration */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple/20 rounded-full blur-3xl opacity-60" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-light rounded-full blur-3xl opacity-60" />
              
              {/* Main Image with Morphing Mask */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/dynamic-headphones.jpg"
                  alt="Dynamic Layout"
                  className="w-full aspect-[4/5] object-cover"
                />
                
                {/* Floating Stats Cards */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-dark">+147%</p>
                      <p className="text-xs text-gray-500">Conversion Rate</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple/10 rounded-xl flex items-center justify-center">
                      <Palette className="w-5 h-5 text-purple" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-purple-dark">50+</p>
                      <p className="text-xs text-gray-500">Layout Options</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

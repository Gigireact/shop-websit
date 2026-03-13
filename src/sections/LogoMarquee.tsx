import { useEffect, useRef, useState } from 'react';

const logos = [
  { name: 'Elementor', icon: 'E' },
  { name: 'WPBakery', icon: 'W' },
  { name: 'WooCommerce', icon: 'WC' },
  { name: 'Contact Form 7', icon: 'CF' },
  { name: 'Yoast SEO', icon: 'Y' },
  { name: 'Slider Revolution', icon: 'SR' },
  { name: 'MailChimp', icon: 'M' },
  { name: 'Jetpack', icon: 'J' },
];

export default function LogoMarquee() {
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
    <section ref={sectionRef} className="py-16 lg:py-20 bg-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 mb-10">
        <p className={`text-center text-gray-500 text-sm uppercase tracking-wider transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Compatible with the best plugins
        </p>
      </div>

      <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Marquee Container */}
        <div className="flex animate-marquee">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-8 lg:mx-12 group"
            >
              <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-300 group-hover:bg-purple-light group-hover:border-purple/20 group-hover:shadow-lg">
                <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm transition-all duration-300 group-hover:bg-purple group-hover:text-white">
                  {logo.icon}
                </div>
                <span className="text-gray-600 font-medium whitespace-nowrap transition-colors group-hover:text-purple-dark">
                  {logo.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

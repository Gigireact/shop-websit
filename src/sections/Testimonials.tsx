import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Testimonial } from '@/types';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Jane Smith',
    role: 'Designer',
    content: 'ShopHub transformed my online store completely. The design is stunning and the customization options are endless. My sales have increased by 200% since switching to this theme.',
    image: '/images/testimonial-jane.jpg',
  },
  {
    id: 2,
    name: 'Michael Johnson',
    role: 'Developer',
    content: 'As a developer, I appreciate the clean code and excellent documentation. The theme is well-structured and easy to customize. Highly recommended for any e-commerce project.',
    image: '/images/testimonial-michael.jpg',
  },
  {
    id: 3,
    name: 'Sarah Williams',
    role: 'Marketer',
    content: 'The SEO optimization and fast loading speed have significantly improved our search rankings. Customer support is also top-notch. Best investment for our business!',
    image: '/images/testimonial-sarah.jpg',
  },
];

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeIndex]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-purple-light/30 to-white"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-4 py-2 bg-purple-light text-purple text-sm font-semibold rounded-full mb-6">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-dark">
              What our{' '}
              <span className="text-purple">clients</span>{' '}
              say
            </h2>
          </div>

          {/* Testimonial Carousel */}
          <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Main Testimonial */}
            <div className="relative bg-white rounded-3xl shadow-xl p-8 lg:p-12 overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 w-16 h-16 bg-purple-light rounded-full flex items-center justify-center opacity-50">
                <Quote className="w-8 h-8 text-purple" />
              </div>

              <div className="grid lg:grid-cols-3 gap-8 items-center">
                {/* Image */}
                <div className="relative flex justify-center lg:justify-start">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple rounded-full blur-xl opacity-30 scale-110" />
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      className={`relative w-32 h-32 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-purple-light shadow-lg transition-all duration-500 ${
                        isAnimating ? 'scale-90 opacity-50' : 'scale-100 opacity-100'
                      }`}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-2 text-center lg:text-left">
                  <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                      &ldquo;{testimonials[activeIndex].content}&rdquo;
                    </p>
                    <div>
                      <h4 className="text-xl font-bold text-purple-dark">{testimonials[activeIndex].name}</h4>
                      <p className="text-purple">{testimonials[activeIndex].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrev}
                className="w-12 h-12 rounded-full border-purple text-purple hover:bg-purple hover:text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        setActiveIndex(index);
                        setTimeout(() => setIsAnimating(false), 500);
                      }
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'bg-purple w-8'
                        : 'bg-purple/30 hover:bg-purple/50'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="w-12 h-12 rounded-full border-purple text-purple hover:bg-purple hover:text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {[
              { value: '15K+', label: 'Happy Customers' },
              { value: '4.9', label: 'Average Rating' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '50+', label: 'Countries' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl lg:text-4xl font-bold text-purple mb-2">{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

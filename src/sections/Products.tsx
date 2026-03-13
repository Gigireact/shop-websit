import { useEffect, useRef, useState } from 'react';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';

const products: Product[] = [
  {
    id: 1,
    name: 'White Sneakers',
    price: 499.00,
    image: '/images/product-sneakers.png',
    category: 'Footwear',
    description: 'Premium leather sneakers with cushioned sole',
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: 249.00,
    image: '/images/product-headphones.png',
    category: 'Electronics',
    description: 'Noise-cancelling over-ear headphones',
  },
  {
    id: 3,
    name: 'Smart Watch Pro',
    price: 199.00,
    image: '/images/product-watch.png',
    category: 'Electronics',
    description: 'Advanced fitness tracking smartwatch',
  },
];

export default function Products() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-white to-purple-light/30"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-4 py-2 bg-purple-light text-purple text-sm font-semibold rounded-full mb-6">
              Our Collection
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-dark mb-6">
              Check our{' '}
              <span className="text-purple">products</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our curated selection of premium products designed to elevate your lifestyle.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Image Container */}
                <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-purple-light/30 p-8 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-contain transition-transform duration-500 ${
                      hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-purple text-white text-xs font-semibold rounded-full">
                      New
                    </span>
                  </div>

                  {/* Quick Actions */}
                  <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${
                    hoveredProduct === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}>
                    <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-purple hover:shadow-lg transition-all">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-purple hover:shadow-lg transition-all">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Add to Cart Overlay */}
                  <div className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-white via-white/90 to-transparent transition-all duration-300 ${
                    hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-purple hover:bg-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-400 ml-2">(24)</span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                  <h3 className="text-lg font-bold text-purple-dark mb-2 group-hover:text-purple transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple">${product.price.toFixed(2)}</span>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="bg-purple-light text-purple hover:bg-purple hover:text-white transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Button
              size="lg"
              variant="outline"
              className="border-purple text-purple hover:bg-purple hover:text-white px-8 py-6 text-lg font-semibold rounded-xl"
            >
              View All Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

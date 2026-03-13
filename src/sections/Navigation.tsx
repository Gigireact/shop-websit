import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, items, totalPrice, removeFromCart, updateQuantity, setIsCartOpen, isCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Products', href: '#products' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-purple flex items-center justify-center">
              <span className="text-white font-bold text-lg lg:text-xl">S</span>
            </div>
            <span className={`font-bold text-xl lg:text-2xl transition-colors ${isScrolled ? 'text-purple-dark' : 'text-white'}`}>
              ShopHub
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-purple ${
                  isScrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Cart Button */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`relative ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                >
                  <ShoppingCart className="h-5 w-5 lg:h-6 lg:w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold text-purple-dark">Shopping Cart</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col h-[calc(100vh-180px)]">
                  {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">Your cart is empty</p>
                      <p className="text-gray-400 text-sm mt-1">Add some products to get started</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-auto space-y-4 pr-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-4 p-3 bg-gray-50 rounded-lg"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-purple-dark">{item.name}</h4>
                              <p className="text-purple font-medium">${item.price.toFixed(2)}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                                >
                                  -
                                </button>
                                <span className="text-sm font-medium w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                                >
                                  +
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="ml-auto text-red-500 hover:text-red-600 text-sm"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4 mt-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="text-xl font-bold text-purple-dark">
                            ${totalPrice.toFixed(2)}
                          </span>
                        </div>
                        <Button className="w-full bg-purple hover:bg-purple-600 text-white py-6 text-lg font-semibold">
                          Checkout
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${isScrolled ? 'text-gray-700' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t animate-slide-up">
            <div className="py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-3 text-gray-700 hover:bg-purple-light hover:text-purple font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

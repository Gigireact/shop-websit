export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

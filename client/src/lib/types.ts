// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: string;
  badge?: {
    text: string;
    color: string;
  };
  features?: string[];
  specifications?: {
    age?: string;
    experiments?: string;
    safety?: string;
    weight?: string;
    certificate?: string;
    language?: string;
  };
  educationalBenefits?: string[];
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

// Cart Context Types
export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}
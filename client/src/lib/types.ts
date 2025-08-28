// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
  specification: {
    weight: string;
    volume?: {
      length: string;
      width: string;
      height: string;
    };
   };
  badge?: {
    text: string;
    color: string;
  };
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
import { CartItem, Product } from "./types";

const CART_STORAGE_KEY = "cart";

// Load cart from localStorage
export const loadCart = (): CartItem[] => {
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  if (cartData) {
    try {
      return JSON.parse(cartData);
    } catch (error) {
      console.error("Failed to parse cart data:", error);
      return [];
    }
  }
  return [];
};

// Save cart to localStorage
export const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  // Dispatch custom event to notify other components
  window.dispatchEvent(new Event("cartUpdated"));
};

// Add item to cart
export const addToCart = (product: Product, quantity: number = 1): CartItem[] => {
  const cart = loadCart();
  const existingItemIndex = cart.findIndex(
    (item) => item.product.id === product.id
  );

  if (existingItemIndex >= 0) {
    // Update quantity if item already exists
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.push({ product, quantity });
  }

  saveCart(cart);
  return cart;
};

// Remove item from cart
export const removeFromCart = (productId: string): CartItem[] => {
  const cart = loadCart();
  const updatedCart = cart.filter((item) => item.product.id !== productId);
  saveCart(updatedCart);
  return updatedCart;
};

// Update item quantity
export const updateQuantity = (
  productId: string,
  quantity: number
): CartItem[] => {
  const cart = loadCart();
  const itemIndex = cart.findIndex((item) => item.product.id === productId);

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      return removeFromCart(productId);
    } else {
      // Update quantity
      cart[itemIndex].quantity = quantity;
      saveCart(cart);
    }
  }

  return cart;
};

// Clear cart
export const clearCart = (): void => {
  localStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
};

// Get cart total price
export const getCartTotal = (): number => {
  const cart = loadCart();
  return cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

// Get cart item count
export const getCartItemCount = (): number => {
  const cart = loadCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};
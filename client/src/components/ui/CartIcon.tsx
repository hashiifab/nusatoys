import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CartIconProps {
  className?: string;
}

const CartIcon = ({ className = "" }: CartIconProps) => {
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  useEffect(() => {
    // Load cart data from localStorage
    const loadCartData = () => {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        const parsedCart = JSON.parse(cartData);
        const itemCount = parsedCart.reduce(
          (total: number, item: { quantity: number }) => total + item.quantity,
          0
        );
        setCartItemCount(itemCount);
      }
    };

    // Initial load
    loadCartData();

    // Listen for storage events (when cart is updated from another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart") {
        loadCartData();
      }
    };

    // Listen for custom event (when cart is updated in the same tab)
    const handleCartUpdate = () => loadCartData();
    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Link to="/cart" className={`relative ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {cartItemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cartItemCount > 99 ? "99+" : cartItemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
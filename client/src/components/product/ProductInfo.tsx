import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../lib/types";
import { addToCart } from "../../lib/cartUtils";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative">
            <img
            src={product.image_url || '/placeholder.jpg'}
            alt={product.name}
            className="w-full rounded-lg object-cover aspect-square"
          />
            {product.badge && (
              <div
                className={`absolute top-3 left-3 text-white text-xs font-semibold px-2 py-1 rounded bg-${product.badge.color}-500`}
              >
                {product.badge.text}
              </div>
            )}
          </div>
          

        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
  
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          </div>



          {/* Price */}
          <div className="mt-2">
            <div className="text-2xl font-bold text-blue-700">
              Rp {product.price.toLocaleString()}
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-lg max-w-none">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi:</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
            
          </div>

          {/* Quantity Selector */}
          <div className="mt-6 flex items-center">
            <div className="mr-4">Jumlah</div>
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={handleDecreaseQuantity}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <div className="px-3 py-1 border-l border-r border-gray-300">
                {quantity}
              </div>
              <button
                onClick={handleIncreaseQuantity}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <div className="ml-4 text-gray-500">Stok: {product.stock}</div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-md flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              Tambah ke Keranjang
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md"
            >
              Beli Sekarang
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-600">Gratis Ongkir Min. Rp 500k</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="text-gray-600">Garansi 1 Tahun</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="text-gray-600">Return 7 Hari</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
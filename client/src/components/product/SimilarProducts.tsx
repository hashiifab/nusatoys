import { Product } from "../../lib/types";
import { Link } from "react-router-dom";
import { addToCart } from "../../lib/cartUtils";

interface SimilarProductsProps {
  products: Product[];
  currentProductId: string;
  showAddButton?: boolean;
}

const SimilarProducts = ({ products, currentProductId, showAddButton = true }: SimilarProductsProps) => {
  // Filter out the current product and limit to 4 products
  const similarProducts = products
    .filter((product) => product.id !== currentProductId)
    .slice(0, 4);

  if (similarProducts.length === 0) return null;

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Produk Serupa</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.badge && (
                    <div
                      className={`absolute top-2 left-2 text-white text-xs font-semibold px-2 py-1 rounded bg-${product.badge.color}-500`}
                    >
                      {product.badge.text}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <div className="mt-1 flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-1">
                      {product.rating}
                    </span>
                  </div>
                  <div className="mt-2 font-bold text-blue-700">
                    Rp {product.price.toLocaleString()}
                  </div>
                  <div className="mt-3 flex gap-2">
                    {showAddButton && (
                      <button 
                        onClick={(e) => {
                          e.preventDefault(); // Prevent navigation from Link
                          addToCart(product, 1);
                        }}
                        className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold py-1 px-3 rounded"
                      >
                        Tambah
                      </button>
                    )}
                    <Link
                      to={`/product/${product.id}`}
                      className="text-blue-700 text-sm font-semibold py-1 px-3 border border-blue-700 rounded hover:bg-blue-50"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;
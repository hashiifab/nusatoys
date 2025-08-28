import { Product } from "../../lib/types";
import { Link } from "react-router-dom";
import { addToCart, generateProductSlug } from "../../lib/cartUtils";

interface RecommendationProductProps {
  products: Product[];
  currentProductId: string;
  showAddButton?: boolean;
}

const RecommendationProduct = ({ products, currentProductId, showAddButton = true }: RecommendationProductProps) => {
  // Filter out the current product and limit to 4 products
  const similarProducts = products
    .filter((product) => product.id !== currentProductId)
    .slice(0, 4);

  if (similarProducts.length === 0) return null;



  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Rekomendasi Produk</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/product/${generateProductSlug(product.name)}`}>
                <div className="relative">
                  <img
                    src={product.image_url || '/placeholder.jpg'}
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
                      to={`/product/${generateProductSlug(product.name)}`}
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

export default RecommendationProduct;

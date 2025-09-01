import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCart, generateProductSlug } from "../../../lib/cartUtils";
import { Product } from "../../../lib/types";

const FeaturedCollection = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://n8n-30p2qy5nhmfl.stroberi.sumopod.my.id/webhook/products-get-all');
      const data = await response.json();
      setProducts(data.slice(0, 3)); // Show first 3 products as featured
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create featured products with badges based on data
  const featuredProducts: Product[] = products.map((product, index) => ({
    ...product,
    badge: [
      { text: "Best Seller", color: "yellow" },
      { text: "STEM Choice", color: "green" },
      { text: "New", color: "sky" }
    ][index] || { text: "Featured", color: "purple" }
  }));
  
  const handleBuyNow = (productId: string) => {
    // Temukan produk berdasarkan ID
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
      // Tambahkan ke keranjang dan navigasi ke halaman keranjang
      addToCart(product, 1);
      navigate("/cart");
    }
  };
  if (loading) {
    return (
      <section id="koleksi" className="bg-white py-20 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
            Koleksi Unggulan
          </h2>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <section id="koleksi" className="bg-white py-20 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
            Koleksi Unggulan
          </h2>
          <p className="text-gray-500 text-center">Belum ada produk yang ditampilkan</p>
        </div>
      </section>
    );
  }

  return (
    <section id="koleksi" className="bg-white py-20 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
          Koleksi Unggulan
        </h2>
        <p className="text-gray-500 text-base sm:text-lg text-center mb-6">
          Produk-produk pilihan yang telah terbukti memberikan nilai edukasi
          terbaik
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="relative w-full aspect-[3/2] overflow-hidden">
                <img
                  src={product.image_url || '/placeholder.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {product.badge && (
                  <div className={`absolute top-3 left-3 text-white text-xs font-semibold px-2 py-1 rounded bg-${product.badge?.color || 'gray'}-500`}>
                    {product.badge?.text || 'Featured'}
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col gap-4">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                </div>
                <p className="text-2xl font-bold text-blue-700 mb-3">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleBuyNow(product.id)} 
                    className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded flex-1 text-center"
                  >
                    Beli Sekarang
                  </button>
                  <Link
                    to={`/product/${generateProductSlug(product.name)}`}
                    className="border border-blue-700 text-blue-700 hover:bg-blue-50 font-semibold py-2 px-4 rounded flex-none"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
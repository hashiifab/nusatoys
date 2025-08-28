import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/homepage/section/Header";
import Footer from "../components/homepage/section/Footer";
import ProductInfo from "../components/product/ProductInfo";
import ProductSpecifications from "../components/product/ProductSpecifications";
import RecommendationProduct from "../components/product/RecommendationProduct";
import { Product } from "../lib/types";

const ProductDetailPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { productSlug } = useParams<{ productSlug: string }>();
  const navigate = useNavigate();
  const topRef = useRef<HTMLDivElement>(null);

if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }

  useEffect(() => {
    fetchProduct();
    fetchProducts();
  }, [productSlug]);

  const fetchProduct = async () => {
    try {
      // Menggunakan path relatif untuk API
      const response = await fetch(`/api/products/${productSlug}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        document.title = `${data.name} | NusaToys`;
      } else {
        console.error('Product not found');
        navigate('/404');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  // Map API product to match expected format
  const formattedProduct = {
    ...product,
    imageUrl: product.image_url || '/placeholder.jpg',
    badge: { text: 'New', color: 'sky' }
  };

  return (
    <div className="bg-white min-h-screen">
      <div ref={topRef}></div>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Kembali
          </button>
        </div>
        <ProductInfo product={formattedProduct} />
        <ProductSpecifications product={formattedProduct} />

        <RecommendationProduct
          products={products}
          currentProductId={product.id}
          showAddButton={false}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;

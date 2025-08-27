import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/homepage/section/Header";
import Footer from "../components/homepage/section/Footer";
import ProductInfo from "../components/product/ProductInfo";
import ProductFeatures from "../components/product/ProductFeatures";
import ProductSpecifications from "../components/product/ProductSpecifications";
import EducationalBenefits from "../components/product/EducationalBenefits";
import SimilarProducts from "../components/product/SimilarProducts";
import { Product } from "../lib/types";

// Sample product data (in a real app, this would come from an API)
const sampleProducts: Product[] = [
  {
    id: "robotik-kit-advanced",
    name: "Robotik Kit Advanced",
    price: 1899000,
    originalPrice: 2399000,
    description:
      "Kit robotik canggih untuk anak-anak yang ingin belajar pemrograman dan elektronika. Dilengkapi dengan komponen berkualitas tinggi dan panduan lengkap.",
    rating: 4.8,
    reviewCount: 85,
    imageUrl: "/Advanced Robotics Kit.png",
    category: "ROBOTIK & PROGRAMMING",
    badge: {
      text: "STEM Choice",
      color: "green",
    },
    features: [
      "200+ komponen elektronik berkualitas",
      "Kompatibel dengan Arduino",
      "Panduan proyek step-by-step",
      "Aplikasi pemrograman visual",
      "Sensor ultrasonik dan inframerah",
      "Motor servo presisi tinggi",
    ],
    specifications: {
      age: "10+ Tahun",
      experiments: "15+ Proyek",
      safety: "CE Certified",
      weight: "1.5 kg",
      certificate: "CE, RoHS",
      language: "Bahasa Indonesia & English",
    },
    educationalBenefits: [
      "Pengenalan dasar pemrograman",
      "Pengembangan logika dan algoritma",
      "Pemahaman elektronika dasar",
      "Keterampilan pemecahan masalah",
    ],
  },
  {
    id: "masjid-al-aqsa",
    name: "Masjid Al-Aqsa",
    price: 175000,
    originalPrice: 200000,
    description:
      "Model bangunan Masjid Al-Aqsa yang detail dan akurat. Terbuat dari bahan berkualitas tinggi dan aman untuk anak-anak.",
    rating: 4.9,
    reviewCount: 56,
    imageUrl: "/masjid-al-aqsa.jpg",
    category: "BUILDING & ARCHITECTURE",
    badge: {
      text: "Best Seller",
      color: "yellow",
    },
    features: [
      "1032 blok bangunan presisi tinggi",
      "Desain arsitektur detail",
      "Instruksi perakitan bergambar",
      "Kompatibel dengan brand building block lain",
      "Ukuran jadi: 28 x 19 x 10 cm",
    ],
    specifications: {
      age: "8+ Tahun",
      safety: "Non-toxic ABS Plastic",
      weight: "0.8 kg",
      certificate: "CE, ASTM",
      language: "Bahasa Indonesia",
    },
    educationalBenefits: [
      "Mengembangkan kemampuan motorik halus",
      "Melatih kesabaran dan konsentrasi",
      "Memahami konsep arsitektur dan geometri",
      "Mengenal budaya dan sejarah Islam",
    ],
  },
  {
    id: "masjid-nabawi",
    name: "Masjid Nabawi",
    price: 175000,
    originalPrice: 200000,
    description:
      "Model bangunan Masjid Nabawi yang detail dan akurat. Terbuat dari bahan berkualitas tinggi dan aman untuk anak-anak.",
    rating: 4.9,
    reviewCount: 42,
    imageUrl: "/Masjid Nabawi.jpg",
    category: "BUILDING & ARCHITECTURE",
    badge: {
      text: "New",
      color: "sky",
    },
    features: [
      "1114 blok bangunan presisi tinggi",
      "Desain arsitektur detail",
      "Instruksi perakitan bergambar",
      "Kompatibel dengan brand building block lain",
      "Ukuran jadi: 30 x 20 x 12 cm",
    ],
    specifications: {
      age: "8+ Tahun",
      safety: "Non-toxic ABS Plastic",
      weight: "0.85 kg",
      certificate: "CE, ASTM",
      language: "Bahasa Indonesia",
    },
    educationalBenefits: [
      "Mengembangkan kemampuan motorik halus",
      "Melatih kesabaran dan konsentrasi",
      "Memahami konsep arsitektur dan geometri",
      "Mengenal budaya dan sejarah Islam",
    ],
  },
];

const ProductDetailPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundProduct = sampleProducts.find((p) => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      // Set page title
      document.title = `${foundProduct.name} | NusaToys`;

      // Scroll to top when product changes
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [productId, location.pathname]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  const handleGoBack = () => {
    navigate(-1);
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
        <ProductInfo product={product} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProductFeatures product={product} />
            <EducationalBenefits product={product} />
          </div>
        </div>
        <ProductSpecifications product={product} />

        <SimilarProducts
          products={sampleProducts}
          currentProductId={product.id}
          showAddButton={false}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;

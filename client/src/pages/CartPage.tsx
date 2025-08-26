import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/homepage/section/Header";
import Footer from "../components/homepage/section/Footer";
import { CartItem, Product } from "../lib/types";
import SimilarProducts from "../components/product/SimilarProducts";
import {
  loadCart,
  removeFromCart,
  updateQuantity,
  getCartTotal,
} from "../lib/cartUtils";

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

const CartPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const topRef = useRef<HTMLDivElement>(null);

  const handleGoBack = () => {
    navigate(-1);
  };

  // Function to load cart and update state
  const refreshCart = () => {
    const items = loadCart();
    setCartItems(items);
    setIsLoading(false);
  };

  useEffect(() => {
    // Set page title
    document.title = "Keranjang Belanja | NusaToys";

    // Initial cart load
    refreshCart();

    // Scroll to top when navigating to cart page
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }

    // Listen for cart updates
    const handleCartUpdate = () => {
      refreshCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [location.pathname]);

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    setCartItems(loadCart());
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
    setCartItems(loadCart());
  };

  const cartTotal = getCartTotal();

  return (
    <div className="bg-white min-h-screen">
      <div ref={topRef}></div>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Keranjang Belanja
          </h1>
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

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-600">Loading...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Keranjang Belanja Kosong
            </h2>
            <p className="text-gray-500 mb-6">
              Anda belum menambahkan produk apapun ke keranjang belanja.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
            >
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.product.id} className="p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-shrink-0 w-full sm:w-32 h-32 mb-4 sm:mb-0">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1 sm:ml-6">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                <Link
                                  to={`/product/${item.product.id}`}
                                  className="hover:text-blue-600"
                                >
                                  {item.product.name}
                                </Link>
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.category}
                              </p>
                            </div>
                            <p className="text-lg font-medium text-gray-900">
                              Rp{" "}
                              {(
                                item.product.price * item.quantity
                              ).toLocaleString()}
                            </p>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                type="button"
                                className="p-2 text-gray-600 hover:text-gray-700"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.product.id,
                                    item.quantity - 1
                                  )
                                }
                                disabled={item.quantity <= 1}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 12H4"
                                  />
                                </svg>
                              </button>
                              <span className="px-4 py-2 text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                className="p-2 text-gray-600 hover:text-gray-700"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.product.id,
                                    item.quantity + 1
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                  />
                                </svg>
                              </button>
                            </div>
                            <button
                              type="button"
                              className="text-sm text-red-600 hover:text-red-800"
                              onClick={() => handleRemoveItem(item.product.id)}
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Ringkasan Pesanan
                </h2>
                <div className="flow-root">
                  <dl className="-my-4 text-sm divide-y divide-gray-200">
                    <div className="py-4 flex items-center justify-between">
                      <dt className="text-gray-600">Subtotal</dt>
                      <dd className="font-medium text-gray-900">
                        Rp {cartTotal.toLocaleString()}
                      </dd>
                    </div>
                    <div className="py-4 flex items-center justify-between">
                      <dt className="text-gray-600">Pengiriman</dt>
                      <dd className="font-medium text-gray-900">
                        Dihitung saat checkout
                      </dd>
                    </div>
                    <div className="py-4 flex items-center justify-between">
                      <dt className="text-base font-medium text-gray-900">
                        Total
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        Rp {cartTotal.toLocaleString()}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-6">
                  <Link
                    to="/checkout"
                    className="block w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-center"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 text-center">
                  <Link
                    to="/"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Lanjutkan Belanja
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Recommendations */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Rekomendasi Produk
          </h2>
          <SimilarProducts
            products={sampleProducts}
            currentProductId=""
            showAddButton={true}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;

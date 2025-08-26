import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../../lib/cartUtils";
import { Product } from "../../../lib/types";

const FeaturedCollection = () => {
  const navigate = useNavigate();
  
  // Produk untuk koleksi unggulan
  const featuredProducts: Product[] = [
    {
      id: "masjid-al-aqsa",
      name: "Masjid Al-Aqsa",
      price: 175000,
      rating: 4.9,
      imageUrl: "masjid-al-aqsa.jpg",
      badge: { text: "Best Seller", color: "yellow" },
      description: "Model bangunan Masjid Al-Aqsa yang detail dan akurat.",
      reviewCount: 56,
      category: "BUILDING & ARCHITECTURE"
    },
    {
      id: "robotik-kit-advanced",
      name: "Robotik Kit Advanced",
      price: 1899000,
      rating: 4.8,
      imageUrl: "Advanced Robotics Kit.png",
      badge: { text: "STEM Choice", color: "green" },
      description: "Kit robotik canggih untuk anak-anak yang ingin belajar pemrograman.",
      reviewCount: 85,
      category: "ROBOTIK & PROGRAMMING"
    },
    {
      id: "masjid-nabawi",
      name: "Masjid Nabawi",
      price: 175000,
      rating: 4.9,
      imageUrl: "Masjid Nabawi.jpg",
      badge: { text: "New", color: "sky" },
      description: "Model bangunan Masjid Nabawi yang detail dan akurat.",
      reviewCount: 42,
      category: "BUILDING & ARCHITECTURE"
    }
  ];
  
  const handleBuyNow = (productId: string) => {
    // Temukan produk berdasarkan ID
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
      // Tambahkan ke keranjang dan navigasi ke halaman keranjang
      addToCart(product, 1);
      navigate("/cart");
    }
  };
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
          <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="relative w-full aspect-[3/2] overflow-hidden">
              <img
                src="masjid-al-aqsa.jpg"
                alt="Masjid Al-Aqsa"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-3 left-3 text-white text-xs font-semibold px-2 py-1 rounded bg-yellow-500">
                Best Seller
              </div>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Masjid Al-Aqsa
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 text-yellow-400 flex items-center justify-center rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 fill-current"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-semibold text-lg">
                    4.9
                  </span>
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-700 mb-3">
                Rp 175.000
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleBuyNow("masjid-al-aqsa")} 
                  className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded flex-1 text-center"
                >
                  Beli Sekarang
                </button>
                <Link
                  to="/product/masjid-al-aqsa"
                  className="border border-blue-700 text-blue-700 hover:bg-blue-50 font-semibold py-2 px-4 rounded flex-none"
                >
                  Detail
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="relative w-full aspect-[3/2] overflow-hidden">
              <img
                src="Advanced Robotics Kit.png"
                alt="Robotik Kit Advanced"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-3 left-3 text-white text-xs font-semibold px-2 py-1 rounded bg-green-500">
                STEM Choice
              </div>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Robotik Kit Advanced
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 text-yellow-400 flex items-center justify-center rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 fill-current"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-semibold text-lg">
                    4.8
                  </span>
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-700 mb-3">
                Rp 1.899.000
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleBuyNow("robotik-kit-advanced")} 
                  className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded flex-1 text-center"
                >
                  Beli Sekarang
                </button>
                <Link
                  to="/product/robotik-kit-advanced"
                  className="border border-blue-700 text-blue-700 hover:bg-blue-50 font-semibold py-2 px-4 rounded flex-none"
                >
                  Detail
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="relative w-full aspect-[3/2] overflow-hidden">
              <img
                src="Masjid Nabawi.jpg"
                alt="Masjid Nabawi"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-3 left-3 text-white text-xs font-semibold px-2 py-1 rounded bg-sky-500">
                New
              </div>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Masjid Nabawi
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 text-yellow-400 flex items-center justify-center rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 fill-current"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-semibold text-lg">
                    4.9
                  </span>
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-700 mb-3">
                Rp 175.000
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleBuyNow("masjid-nabawi")} 
                  className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded flex-1 text-center"
                >
                  Beli Sekarang
                </button>
                <Link
                  to="/product/masjid-nabawi"
                  className="border border-blue-700 text-blue-700 hover:bg-blue-50 font-semibold py-2 px-4 rounded flex-none"
                >
                  Detail
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
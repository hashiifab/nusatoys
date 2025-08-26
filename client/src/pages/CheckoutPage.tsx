import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/homepage/section/Header";
import Footer from "../components/homepage/section/Footer";
import { CartItem } from "../lib/types";
import { loadCart, getCartTotal, clearCart } from "../lib/cartUtils";

interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

const paymentMethods: PaymentMethod[] = [
  { id: "bca", name: "BCA", icon: "/bca-icon.png" },
  { id: "mandiri", name: "Mandiri", icon: "/mandiri-icon.png" },
  { id: "bni", name: "BNI", icon: "/bni-icon.png" },
  { id: "bri", name: "BRI", icon: "/bri-icon.png" },
];

const shippingOptions = [
  { id: "regular", name: "Regular (2-3 hari)", price: 10000 },
  { id: "express", name: "Express (1 hari)", price: 20000 },
  { id: "same-day", name: "Same Day (Hari ini)", price: 35000 },
];

const CheckoutPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  useEffect(() => {
    // Set page title
    document.title = "Checkout | NusaToys";
    
    // Load cart items from localStorage
    const items = loadCart();
    setCartItems(items);
    setIsLoading(false);

    // Generate random order number for demo
    const randomOrderNumber = "NT" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomOrderNumber);
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShippingChange = (option: typeof shippingOptions[0]) => {
    setSelectedShipping(option);
  };

  const handlePaymentChange = (paymentId: string) => {
    setSelectedPayment(paymentId);
  };

  const handleNextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    } else {
      // Process order
      setOrderComplete(true);
      clearCart(); // Clear the cart after successful order
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const isStepOneValid = () => {
    return (
      shippingInfo.fullName.trim() !== "" &&
      shippingInfo.email.trim() !== "" &&
      shippingInfo.phone.trim() !== "" &&
      shippingInfo.address.trim() !== "" &&
      shippingInfo.city.trim() !== "" &&
      shippingInfo.postalCode.trim() !== ""
    );
  };

  const isStepTwoValid = () => {
    return selectedShipping !== null;
  };

  const isStepThreeValid = () => {
    return selectedPayment !== "";
  };

  const subtotal = getCartTotal();
  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const total = subtotal + shippingCost;

  if (orderComplete) {
    return (
      <div className="bg-white min-h-screen">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-green-100 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-600"
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
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Pesanan Berhasil!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Terima kasih telah berbelanja di NusaToys. Pesanan Anda telah kami terima dan sedang diproses.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Detail Pesanan</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Nomor Pesanan:</span>
                <span className="font-medium">{orderNumber}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tanggal:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Total:</span>
                <span className="font-medium">Rp {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Metode Pembayaran:</span>
                <span className="font-medium">
                  {paymentMethods.find(p => p.id === selectedPayment)?.name || "Transfer Bank"}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
              >
                Kembali ke Beranda
              </Link>
              <button
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-md transition duration-300"
              >
                Lihat Status Pesanan
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
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
              {/* Checkout Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${activeStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      1
                    </div>
                    <span className="ml-2 font-medium">Informasi Pengiriman</span>
                  </div>
                  <div className="h-0.5 w-12 bg-gray-200 hidden sm:block"></div>
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${activeStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      2
                    </div>
                    <span className="ml-2 font-medium">Metode Pengiriman</span>
                  </div>
                  <div className="h-0.5 w-12 bg-gray-200 hidden sm:block"></div>
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${activeStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      3
                    </div>
                    <span className="ml-2 font-medium">Pembayaran</span>
                  </div>
                </div>
              </div>

              {/* Step 1: Shipping Information */}
              {activeStep === 1 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Informasi Pengiriman</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Nomor Telepon *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Alamat *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        Kota *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Kode Pos *
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Catatan (opsional)
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={shippingInfo.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Method */}
              {activeStep === 2 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Metode Pengiriman</h2>
                  <div className="space-y-4">
                    {shippingOptions.map((option) => (
                      <div 
                        key={option.id}
                        className={`border rounded-md p-4 cursor-pointer ${selectedShipping.id === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                        onClick={() => handleShippingChange(option)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border ${selectedShipping.id === option.id ? 'border-blue-500' : 'border-gray-400'} flex items-center justify-center`}>
                              {selectedShipping.id === option.id && (
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                              )}
                            </div>
                            <span className="ml-3 font-medium">{option.name}</span>
                          </div>
                          <span className="font-medium">Rp {option.price.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Payment Method */}
              {activeStep === 3 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Metode Pembayaran</h2>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div 
                        key={method.id}
                        className={`border rounded-md p-4 cursor-pointer ${selectedPayment === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                        onClick={() => handlePaymentChange(method.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border ${selectedPayment === method.id ? 'border-blue-500' : 'border-gray-400'} flex items-center justify-center`}>
                              {selectedPayment === method.id && (
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                              )}
                            </div>
                            <span className="ml-3 font-medium">{method.name}</span>
                          </div>
                          <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <img src={method.icon} alt={method.name} className="h-6" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                {activeStep > 1 ? (
                  <button
                    onClick={handlePrevStep}
                    className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-md hover:bg-gray-50 transition duration-300"
                  >
                    Kembali
                  </button>
                ) : (
                  <div></div>
                )}
                <button
                  onClick={handleNextStep}
                  disabled={
                    (activeStep === 1 && !isStepOneValid()) ||
                    (activeStep === 2 && !isStepTwoValid()) ||
                    (activeStep === 3 && !isStepThreeValid())
                  }
                  className={`${(activeStep === 1 && !isStepOneValid()) ||
                    (activeStep === 2 && !isStepTwoValid()) ||
                    (activeStep === 3 && !isStepThreeValid())
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-2 px-6 rounded-md transition duration-300`}
                >
                  {activeStep < 3 ? 'Lanjutkan' : 'Selesaikan Pesanan'}
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Ringkasan Pesanan</h2>
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <li key={item.product.id} className="py-4 flex">
                        <div className="flex-shrink-0 w-16 h-16">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                            <p className="text-sm font-medium text-gray-900">
                              Rp {(item.product.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                          <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <dl className="-my-4 text-sm divide-y divide-gray-200">
                    <div className="py-4 flex items-center justify-between">
                      <dt className="text-gray-600">Subtotal</dt>
                      <dd className="font-medium text-gray-900">Rp {subtotal.toLocaleString()}</dd>
                    </div>
                    <div className="py-4 flex items-center justify-between">
                      <dt className="text-gray-600">Pengiriman</dt>
                      <dd className="font-medium text-gray-900">Rp {shippingCost.toLocaleString()}</dd>
                    </div>
                    <div className="py-4 flex items-center justify-between">
                      <dt className="text-base font-medium text-gray-900">Total</dt>
                      <dd className="text-base font-medium text-gray-900">Rp {total.toLocaleString()}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
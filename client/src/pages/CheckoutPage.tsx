import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/homepage/section/Header";
import Footer from "../components/homepage/section/Footer";
import { loadCart, getCartTotal, clearCart } from "../lib/cartUtils";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import ShippingInfoStep from "../components/checkout/ShippingInfoStep";
import ShippingMethodStep from "../components/checkout/ShippingMethodStep";
import ConfirmationStep from "../components/checkout/ConfirmationStep";
import OrderSummary from "../components/checkout/OrderSummary";


// Use imported types instead of local interface
import type { CartItem } from "../lib/types";


export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  destination: string;
  postalCode: string;
  notes: string;
}

export interface Destination {
  id: string;
  code: string;
  name: string;
  city: string;
  province: string;
}

export interface ShippingService {
  service: string;
  description: string;
  price: number;
  etd: string;
}

export interface CostData {
  value: number;
  etd: string;
  est?: string;
}

export interface ShippingCost {
  service: string;
  service_name?: string;
  description?: string;
  cost: CostData | CostData[];
  costs?: CostData[];
}

export interface ShippingResult {
  code?: string;
  name?: string;
  costs: ShippingCost[];
}

export interface ShippingResponse {
  success: boolean;
  data:
    | ShippingResult[]
    | {
        results: ShippingResult[];
      };
}

export interface DestinationResponse {
  success: boolean;
  data: Destination[];
}

const CheckoutPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingService | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    destination: "",
    postalCode: "",
    notes: "",
  });

  // Lincah API states
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [shippingServices, setShippingServices] = useState<ShippingService[]>(
    []
  );
  const [destinationSearch, setDestinationSearch] = useState("");
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [isSearchingDestination, setIsSearchingDestination] = useState(false);
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);

  useEffect(() => {
    document.title = "Checkout | NusaToys";
    const items = loadCart();
    setCartItems(items);
    setIsLoading(false);
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShippingChange = (service: ShippingService) => {
    setSelectedShipping(service);
  };

  const getTotalWeight = () => {
    return cartItems.reduce((total, item) => {
      let weight = 1;
      if (item.product.specification?.weight) {
        const weightStr = item.product.specification.weight;
        const weightMatch = weightStr.match(/(\d+(?:\.\d+)?)/);
        if (weightMatch) {
          weight = parseFloat(weightMatch[1]);
        }
      }
      return total + weight * item.quantity;
    }, 0);
  };

  const getTotalVolume = () => {
    // Calculate total volume from all items
    let totalLength = 0;
    let totalWidth = 0;
    let totalHeight = 0;
    
    cartItems.forEach(item => {
      if (item.product.specification?.volume) {
        const volume = item.product.specification.volume;
        const length = parseFloat(volume.length) || 0;
        const width = parseFloat(volume.width) || 0;
        const height = parseFloat(volume.height) || 0;
        
        totalLength += length * item.quantity;
        totalWidth += width * item.quantity;
        totalHeight += height * item.quantity;
      }
    });
    
    // Return as string format "lengthxwidthxheight"
    const length = Math.max(totalLength, 1);
    const width = Math.max(totalWidth, 1);
    const height = Math.max(totalHeight, 1);
    return `${length}x${width}x${height}`;
  };

  const searchDestinations = async (query: string) => {
    if (query.length < 3) {
      setDestinations([]);
      return;
    }

    setIsSearchingDestination(true);
    try {
      const response = await fetch(
        `https://n8n-30p2qy5nhmfl.stroberi.sumopod.my.id/webhook/lincah-search?q=${encodeURIComponent(
          query
        )}`
      );
      const data: DestinationResponse = await response.json();
      if (data.success && data.data) {
        setDestinations(data.data || []);
      }
    } catch (error) {
      console.error("Error searching destinations:", error);
    } finally {
      setIsSearchingDestination(false);
    }
  };

  const calculateShipping = async () => {
    if (!selectedDestination) return;

    const totalWeight = getTotalWeight();
    if (totalWeight <= 0) {
      console.error("Invalid total weight:", totalWeight);
      return;
    }

    interface ShippingPayload {
      origin_code: string;
      destination_code: string;
      weight: number;
      volume?: string;
    }

    setIsLoadingShipping(true);
    try {
      const totalVolume = getTotalVolume();
      const payload: ShippingPayload = {
        origin_code: "32.71.04",
        destination_code: selectedDestination.code,
        weight: Math.max(totalWeight, 0.1),
        volume: totalVolume
      };

      console.log("Calculating shipping with payload:", payload);

      const response = await fetch(
        "https://n8n-30p2qy5nhmfl.stroberi.sumopod.my.id/webhook/lincah-shipping-cost",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data: ShippingResponse = await response.json();
      console.log("Shipping response:", data);

      if (data.success && data.data) {
        const services: ShippingService[] = [];
        const results = Array.isArray(data.data)
          ? data.data
          : (data.data as { results: ShippingResult[] }).results;

        if (Array.isArray(results)) {
          results.forEach((result: ShippingResult) => {
            if (result.costs && Array.isArray(result.costs)) {
              result.costs.forEach((cost: ShippingCost) => {
                let costData: CostData | undefined;

                if (Array.isArray(cost.cost)) {
                  costData = cost.cost[0];
                } else if (cost.cost && typeof cost.cost === "object") {
                  costData = cost.cost;
                } else if (cost.costs && Array.isArray(cost.costs)) {
                  costData = cost.costs[0];
                }

                if (costData && costData.value) {
                  services.push({
                    service: result.name || result.code || "Unknown",
                    description:
                      cost.service || cost.service_name || "Standard",
                    price: costData.value,
                    etd: costData.etd || costData.est || "3-5",
                  });
                }
              });
            }
          });
        }

        setShippingServices(services);
        console.log("Loaded shipping services:", services);
      } else {
        console.error("Invalid shipping response:", data);
        setShippingServices([]);
      }
    } catch (error) {
      console.error("Error calculating shipping:", error);
      setShippingServices([]);
    } finally {
      setIsLoadingShipping(false);
    }
  };

  const handleDestinationSelect = (destination: Destination) => {
    setSelectedDestination(destination);
    const fullAddress = `${destination.name}, ${destination.city}, ${destination.province}`;
    setShippingInfo((prev) => ({ ...prev, destination: fullAddress }));
    setDestinations([]);
    setDestinationSearch(fullAddress);
    setShippingServices([]);
  };

  const handleNextStep = () => {
    if (activeStep === 1 && selectedDestination) {
      calculateShipping();
    }

    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    } else {
      
      clearCart();
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
      shippingInfo.destination.trim() !== "" &&
      shippingInfo.postalCode.trim() !== ""
    );
  };

  const isStepTwoValid = () => {
    return selectedShipping !== null;
  };

  const handleConfirmOrder = async () => {
    setIsConfirming(true);
    
    try {
      // Prepare order data for payment
      const orderItems = cartItems.map(item => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      }));
      
      const totalAmount = getCartTotal() + (selectedShipping?.price || 0);
      
      const response = await fetch('https://n8n-30p2qy5nhmfl.stroberi.sumopod.my.id/webhook/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: orderItems.map(item => item.name).join(', '),
          amount: totalAmount,
          qty: orderItems.reduce((sum, item) => sum + item.quantity, 0),
          buyerName: shippingInfo.fullName,
          buyerEmail: shippingInfo.email,
          buyerPhone: shippingInfo.phone,
          shippingAddress: shippingInfo,
        }),
      });

      const data = await response.json();
      
      if (data.success && data.data.invoice_url) {
        // Clear cart and redirect to Xendit payment page
        clearCart();
        window.location.href = data.data.invoice_url;
      } else {
        console.error('Failed to create payment:', data.error);
        alert('Gagal membuat pembayaran. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      alert('Terjadi kesalahan saat membuat pembayaran.');
    } finally {
      setIsConfirming(false);
    }
  };

  const subtotal = getCartTotal();
  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const total = subtotal + shippingCost;

  

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
              <CheckoutSteps activeStep={activeStep} />
              {activeStep === 1 && (
                <ShippingInfoStep
                  shippingInfo={shippingInfo}
                  handleInputChange={handleInputChange}
                  destinationSearch={destinationSearch}
                  setDestinationSearch={setDestinationSearch}
                  destinations={destinations}
                  isSearchingDestination={isSearchingDestination}
                  handleDestinationSelect={handleDestinationSelect}
                  searchDestinations={searchDestinations}
                />
              )}
              {activeStep === 2 && (
                <ShippingMethodStep
                  shippingServices={shippingServices}
                  isLoadingShipping={isLoadingShipping}
                  selectedShipping={selectedShipping}
                  handleShippingChange={handleShippingChange}
                />
              )}
              {activeStep === 3 && (
                <ConfirmationStep
                  cartItems={cartItems}
                  shippingInfo={shippingInfo}
                  selectedShipping={selectedShipping}
                  subtotal={subtotal}
                  shippingCost={shippingCost}
                  total={total}
                  onConfirmOrder={handleConfirmOrder}
                  isConfirming={isConfirming}
                />
              )}
              {activeStep < 3 && (
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
                      (activeStep === 2 && !isStepTwoValid())
                    }
                    className={`${
                      (activeStep === 1 && !isStepOneValid()) ||
                      (activeStep === 2 && !isStepTwoValid())
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white font-medium py-2 px-6 rounded-md transition duration-300`}
                  >
                    Lanjutkan
                  </button>
                </div>
              )}
            </div>
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              shippingCost={shippingCost}
              total={total}
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { ShippingService } from '../../pages/CheckoutPage';

interface OrderCompleteProps {
  orderNumber: string;
  total: number;
  selectedShipping: ShippingService | null;
}

const OrderComplete: React.FC<OrderCompleteProps> = ({
  orderNumber,
  total,
  selectedShipping
}) => (
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
        <span className="text-gray-600">Metode Pengiriman:</span>
        <span className="font-medium">
          {selectedShipping ? `${selectedShipping.service} - ${selectedShipping.description}` : "-"}
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
);

export default OrderComplete;
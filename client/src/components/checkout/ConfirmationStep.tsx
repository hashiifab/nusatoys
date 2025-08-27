import React from "react";
import { CartItem } from "../../pages/CheckoutPage";
import { ShippingService, ShippingInfo } from "../../pages/CheckoutPage";

interface ConfirmationStepProps {
  cartItems: CartItem[];
  shippingInfo: ShippingInfo;
  selectedShipping: ShippingService | null;
  subtotal: number;
  shippingCost: number;
  total: number;
  onConfirmOrder: () => void;
  isConfirming: boolean;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  cartItems,
  shippingInfo,
  selectedShipping,
  subtotal,
  shippingCost,
  total,
  onConfirmOrder,
  isConfirming,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Konfirmasi Pesanan
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Mohon periksa kembali detail pesanan Anda sebelum melanjutkan ke pembayaran.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Informasi Penerima
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">Nama:</span> {shippingInfo.fullName}</p>
            <p><span className="font-medium">Email:</span> {shippingInfo.email}</p>
            <p><span className="font-medium">Telepon:</span> {shippingInfo.phone}</p>
            <p><span className="font-medium">Alamat:</span> {shippingInfo.address}</p>
            <p><span className="font-medium">Kode Pos:</span> {shippingInfo.postalCode}</p>
            <p><span className="font-medium">Catatan:</span> {shippingInfo.notes || "-"}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Metode Pengiriman
          </h3>
          <div className="text-sm text-gray-600">
            <p><span className="font-medium">Layanan:</span> {selectedShipping?.service}</p>
            <p><span className="font-medium">Estimasi:</span> {selectedShipping?.etd} hari</p>
            <p><span className="font-medium">Biaya:</span> Rp {selectedShipping?.price.toLocaleString()}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Ringkasan Pesanan
          </h3>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.product.name} x {item.quantity}
                </span>
                <span className="text-gray-900">
                  Rp {(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
            <div className="border-t pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">Rp {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Biaya Pengiriman</span>
                <span className="text-gray-900">Rp {shippingCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-medium text-sm pt-2 border-t">
                <span>Total</span>
                <span>Rp {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Setelah menekan tombol "Konfirmasi dan Bayar", Anda akan diarahkan ke halaman pembayaran Xendit untuk menyelesaikan transaksi.
        </p>
      </div>

      <button
        onClick={onConfirmOrder}
        disabled={isConfirming}
        className={`w-full py-3 px-4 rounded-md font-medium text-white ${
          isConfirming
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } transition duration-300`}
      >
        {isConfirming ? "Memproses..." : "Konfirmasi dan Bayar"}
      </button>
    </div>
  );
};

export default ConfirmationStep;
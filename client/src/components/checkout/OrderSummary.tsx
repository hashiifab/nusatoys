import { CartItem } from '@/lib/types';
import React from 'react';


interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  subtotal,
  shippingCost,
  total
}) => (
  <div className="lg:col-span-1">
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Ringkasan Pesanan</h2>
      <div className="flow-root">
        <ul className="-my-4 divide-y divide-gray-200">
          {cartItems.map((item) => (
            <li key={item.product.id} className="py-4 flex">
              <div className="flex-shrink-0 w-16 h-16">
                <img
                                             src={item.product.image_url || '/placeholder.jpg'}

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
);

export default OrderSummary;
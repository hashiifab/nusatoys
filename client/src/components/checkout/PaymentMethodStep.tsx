import React from 'react';
import { paymentMethods, PaymentMethod } from '../../pages/CheckoutPage';

interface PaymentMethodStepProps {
  selectedPayment: string;
  handlePaymentChange: (paymentId: string) => void;
}

const PaymentMethodStep: React.FC<PaymentMethodStepProps> = ({
  selectedPayment,
  handlePaymentChange
}) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-medium text-gray-900 mb-6">Metode Pembayaran</h2>
    <div className="space-y-4">
      {paymentMethods.map((method: PaymentMethod) => (
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
);

export default PaymentMethodStep;
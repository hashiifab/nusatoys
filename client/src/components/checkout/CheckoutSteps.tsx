import React from 'react';

interface CheckoutStepsProps {
  activeStep: number;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ activeStep }) => (
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
        <span className="ml-2 font-medium">Konfirmasi</span>
      </div>
    </div>
  </div>
);

export default CheckoutSteps;
import React from 'react';
import { ShippingService } from '../../pages/CheckoutPage';

interface ShippingMethodStepProps {
  shippingServices: ShippingService[];
  isLoadingShipping: boolean;
  selectedShipping: ShippingService | null;
  handleShippingChange: (service: ShippingService) => void;
}

const ShippingMethodStep: React.FC<ShippingMethodStepProps> = ({
  shippingServices,
  isLoadingShipping,
  selectedShipping,
  handleShippingChange
}) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-medium text-gray-900 mb-6">Metode Pengiriman</h2>
    {isLoadingShipping ? (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-500">Memuat layanan pengiriman...</p>
      </div>
    ) : shippingServices.length === 0 ? (
      <div className="text-center py-8">
        <p className="text-gray-500">Tidak ada layanan pengiriman tersedia</p>
        <p className="text-sm text-gray-400 mt-2">Pastikan tujuan sudah dipilih dengan benar</p>
      </div>
    ) : (
      <div className="space-y-4">
        {shippingServices.map((service) => (
          <div 
            key={`${service.service}-${service.description}`}
            className={`border rounded-md p-4 cursor-pointer ${selectedShipping?.service === service.service && selectedShipping?.description === service.description ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            onClick={() => handleShippingChange(service)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border ${selectedShipping?.service === service.service && selectedShipping?.description === service.description ? 'border-blue-500' : 'border-gray-400'} flex items-center justify-center`}>
                  {selectedShipping?.service === service.service && selectedShipping?.description === service.description && (
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  )}
                </div>
                <div className="ml-3">
                  <span className="font-medium">{service.service} - {service.description}</span>
                  <p className="text-sm text-gray-500">Estimasi: {service.etd} hari</p>
                </div>
              </div>
              <span className="font-medium">Rp {service.price.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default ShippingMethodStep;
import React from 'react';
import { ShippingInfo, Destination } from '../../pages/CheckoutPage';

interface ShippingInfoStepProps {
  shippingInfo: ShippingInfo;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  destinationSearch: string;
  setDestinationSearch: (value: string) => void;
  destinations: Destination[];
  isSearchingDestination: boolean;
  handleDestinationSelect: (destination: Destination) => void;
  searchDestinations: (query: string) => void;
}

const ShippingInfoStep: React.FC<ShippingInfoStepProps> = ({
  shippingInfo,
  handleInputChange,
  destinationSearch,
  setDestinationSearch,
  destinations,
  isSearchingDestination,
  handleDestinationSelect,
  searchDestinations
}) => (
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
      <div className="relative">
        <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
          Kota/Kecamatan Tujuan *
        </label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={destinationSearch}
          onChange={(e) => {
            setDestinationSearch(e.target.value);
            searchDestinations(e.target.value);
          }}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Cari kota atau kecamatan... (min. 3 huruf)"
          required
        />
        {isSearchingDestination && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
            <div className="p-2 text-gray-500">Mencari...</div>
          </div>
        )}
        {destinations.length > 0 && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => handleDestinationSelect(destination)}
              >
                <div className="font-medium">{destination.name}</div>
                <div className="text-xs text-gray-500">
                  {destination.city}, {destination.province} - Kode: {destination.code}
                </div>
              </div>
            ))}
          </div>
        )}
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
);

export default ShippingInfoStep;
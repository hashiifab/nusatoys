import React from 'react';
import AdminPaymentTable from './AdminPaymentTable';

const OrderList: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Order List</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage orders from customers who have successfully paid
          </p>
        </div>
        <AdminPaymentTable showOnlyPaid={true} />
      </div>
    </div>
  );
};

export default OrderList;
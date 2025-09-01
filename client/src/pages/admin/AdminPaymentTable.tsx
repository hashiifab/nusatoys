import React, { useState, useEffect, useCallback } from 'react';
import { Eye, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  phone: string;
}

interface Payment {
  id: string;
  invoice_id: string;
  status: 'paid' | 'pending' | 'expired';
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  amount: number;
  items: Array<{
    product: string;
    quantity: number;
    price: number;
  }>;
  shipping_address: ShippingAddress;
  created_at: string;
}

interface AdminPaymentTableProps {
  showOnlyPaid?: boolean;
}

const AdminPaymentTable: React.FC<AdminPaymentTableProps> = ({ showOnlyPaid = false }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchPayments = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      
      const endpoint = showOnlyPaid ? 'https://n8n-30p2qy5nhmfl.stroberi.sumopod.my.id/webhook/payments-orders' : '';
      const response = await fetch(endpoint, {
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setPayments(Array.isArray(data) ? data : []);
      } else if (response.status === 401) {
        alert('Session expired. Please login again.');
        setPayments([]);
      } else if (response.status === 403) {
        alert('Admin access required.');
        setPayments([]);
      } else {
        setPayments([]);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  }, [showOnlyPaid]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const getStatusBadge = (status: Payment['status']) => {
    const styles = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      expired: 'bg-red-100 text-red-800',
    };

    const icons = {
      paid: <CheckCircle className="w-3 h-3" />,
      pending: <Clock className="w-3 h-3" />,
      expired: <XCircle className="w-3 h-3" />,
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {icons[status]}
        <span className="ml-1">{status.toUpperCase()}</span>
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  ;

  const openPaymentDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {showOnlyPaid ? 'Order List' : 'Payment Management'}
          </h2>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {payments.length} {showOnlyPaid ? 'orders' : 'payments'}
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.invoice_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {payment.invoice_id}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{payment.buyer_name}</div>
                  <div className="text-sm text-gray-500">{payment.buyer_email}</div>
                  <div className="text-sm text-gray-500">{payment.buyer_phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {payment.items[0]?.product || 'Product'} x{payment.items[0]?.quantity || 1}
                  </div>
                  <div className="text-sm text-gray-500">
                    {payment.items[0]?.product || 'Product'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(payment.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(payment.status)}
                </td>
               
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openPaymentDetails(payment)}
                    className="text-indigo-600 hover:text-indigo-900 flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Details Modal */}
      {showModal && selectedPayment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Order Details - {selectedPayment.invoice_id}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Customer Information</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Name:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedPayment.buyer_name}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Email:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedPayment.buyer_email}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Phone:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedPayment.buyer_phone}</span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Order Summary</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Status:</span>
                    <span className="ml-2">{getStatusBadge(selectedPayment.status)}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Total Amount:</span>
                    <span className="ml-2 text-sm font-bold text-gray-900">{formatCurrency(selectedPayment.amount)}</span>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-900 mb-3">Shipping Address</h4>
              <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">{selectedPayment.shipping_address.name}</p>
                <p>{selectedPayment.shipping_address.address}</p>
                <p>{selectedPayment.shipping_address.city}, {selectedPayment.shipping_address.province} {selectedPayment.shipping_address.postal_code}</p>
                <p>Phone: {selectedPayment.shipping_address.phone}</p>
              </div>
            </div>

            {/* Products */}
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-900 mb-3">Products</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedPayment.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.product}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">Rp {item.price.toLocaleString('id-ID')}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPaymentTable;
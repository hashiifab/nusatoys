import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, getCurrentUser, isAdmin } from '../../lib/supabase';
import type { User } from '@supabase/supabase-js';
import AdminProductTable from './AdminProductTable';
import AdminPaymentTable from './AdminPaymentTable';

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      const adminCheck = await isAdmin();
      
      if (!currentUser || !adminCheck) {
        navigate('/admin/login');
        return;
      }
      
      setUser(currentUser);
    } catch (error) {
      console.error('Error checking user:', error);
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'products'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'orders'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Orders
                </button>

              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'products' && (
              <AdminProductTable />
            )}
            
            {activeTab === 'orders' && (
              <AdminPaymentTable showOnlyPaid={true} />
            )}
            

          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
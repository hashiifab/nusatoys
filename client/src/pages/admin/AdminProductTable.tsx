import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
  specification: {
    weight: string;
    volume?: {
      length: string;
      width: string;
      height: string;
    };
    
  };
}

const AdminProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    specification: {
      weight: '',
      volume: {
        length: '',
        width: '',
        height: '',
      },
     
    },
    image_url: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://n8n-30p2qy5nhmfl.stroberi.sumopod.my.id/webhook/products-get-all');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProduct) {
          // Update existing product - use n8n webhook
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        
        const updateUrl = `https://n8n-30p2qy5nhmfl.stroberi.sumopod.my.id/webhook/7cc8a841-0d40-44ca-9001-59da26b5bb0c/products-update/${editingProduct.id}`;
        console.log('Updating product:', updateUrl, 'with data:', formData);
        
        const response = await fetch(updateUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          fetchProducts();
          setShowModal(false);
          setEditingProduct(null);
          resetForm();
        } else if (response.status === 401) {
          alert('Session expired. Please login again.');
        } else if (response.status === 403) {
          alert('Admin access required.');
        } else {
          console.error('HTTP Error:', response.status, response.statusText);
          const errorText = await response.text();
          console.error('Error response:', errorText);
          alert(`Error: ${response.status} ${response.statusText}`);
        }
      } else {
          // Create new product - use n8n webhook
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        
        const response = await fetch('https://n8n-30p2qy5nhmfl.stroberi.sumopod.my.id/webhook/products-create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          fetchProducts();
          setShowModal(false);
          setEditingProduct(null);
          resetForm();
        } else {
          console.error('HTTP Error:', response.status, response.statusText);
          const errorText = await response.text();
          console.error('Error response:', errorText);
          alert(`Error: ${response.status} ${response.statusText}`);
        }
      }
    } catch (error) {
      console.error('Error saving product:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        console.error('Network error - possible CORS issue or server unreachable');
        console.error('Please check:');
        console.error('1. Internet connection');
        console.error('2. Server URL accessibility: https://n8n-30p2qy5nhmfl.stroberi.sumopod.my.id/webhook/');
        console.error('3. Browser CORS settings');
        console.error('4. Server CORS configuration');
        alert('Network error: Unable to connect to the server. Please check your internet connection or contact support.');
      } else {
        alert('Error saving product. Please try again.');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // Get auth token from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        
        const deleteUrl = `https://n8n-30p2qy5nhmfl.stroberi.sumopod.my.id/webhook/products-delete-webhook/products-delete/${id}`;
        console.log('Deleting product:', deleteUrl);
        
        const response = await fetch(deleteUrl, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        });
        
        if (response.ok) {
          fetchProducts();
        } else if (response.status === 401) {
          alert('Session expired. Please login again.');
        } else if (response.status === 403) {
          alert('Admin access required.');
        } else {
          console.error('HTTP Error:', response.status, response.statusText);
          const errorText = await response.text();
          console.error('Error response:', errorText);
          alert(`Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          console.error('Network error - possible CORS issue or server unreachable');
          alert('Network error: Unable to connect to the server. Please check your internet connection or contact support.');
        } else {
          alert('Error deleting product. Please try again.');
        }
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      image_url: '',
      specification: {
        weight: '',
        volume: {
          length: '',
          width: '',
          height: '',
        },
       
      }
    });
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      resetForm();
    }
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
          <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
          <button
            onClick={() => openModal()}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-20">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {product.image_url ? (
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={product.image_url}
                        alt={product.name}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Rp {product.price.toLocaleString('id-ID')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock} units
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.specification.weight}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(product)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
{showModal && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-lg sm:max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        {editingProduct ? 'Edit Product' : 'Add New Product'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
          <input
            type="text"
            required
            value={formData.name || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            placeholder="Enter product name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea
            required
            rows={4}
            value={formData.description || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            placeholder="Enter product description"
          />
        </div>

        {/* Price and Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Price</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-sm">Rp</span>
              <input
                type="number"
                required
                min="0"
                value={formData.price || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                onFocus={(e) => e.target.value === '0' && (e.target.value = '')}
                onBlur={(e) => e.target.value === '' && setFormData(prev => ({ ...prev, price: 0 }))}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                placeholder="Enter price"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Stock</label>
            <input
              type="number"
              required
              min="0"
              value={formData.stock || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
              onFocus={(e) => e.target.value === '0' && (e.target.value = '')}
              onBlur={(e) => e.target.value === '' && setFormData(prev => ({ ...prev, stock: 0 }))}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
              placeholder="Enter stock quantity"
            />
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Weight (kg)</label>
          <input
            type="text"
            required
            value={formData.specification?.weight || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              specification: { ...prev.specification!, weight: e.target.value }
            }))}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            placeholder="Enter weight (e.g., 1.5)"
          />
        </div>

        {/* Volume Dimensions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Volume Dimensions (cm)</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Length</label>
              <input
                type="text"
                value={formData.specification?.volume?.length || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  specification: {
                    ...prev.specification!,
                    volume: {
                      length: e.target.value,
                      width: prev.specification?.volume?.width || '',
                      height: prev.specification?.volume?.height || ''
                    }
                  }
                }))}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                placeholder="e.g., 25"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Width</label>
              <input
                type="text"
                value={formData.specification?.volume?.width || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  specification: {
                    ...prev.specification!,
                    volume: {
                      width: e.target.value,
                      length: prev.specification?.volume?.length || '',
                      height: prev.specification?.volume?.height || ''
                    }
                  }
                }))}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                placeholder="e.g., 15"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Height</label>
              <input
                type="text"
                value={formData.specification?.volume?.height || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  specification: {
                    ...prev.specification!,
                    volume: {
                      height: e.target.value,
                      length: prev.specification?.volume?.length || '',
                      width: prev.specification?.volume?.width || ''
                    }
                  }
                }))}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                placeholder="e.g., 10"
              />
            </div>
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL</label>
          <input
            type="text"
            value={formData.image_url || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {editingProduct ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default AdminProductTable;
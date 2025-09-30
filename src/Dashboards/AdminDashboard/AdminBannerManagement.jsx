import React, { useState, useEffect } from 'react';

const AdminBannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    imageUrl: '',
    title: '',
    subtitle: ''
  });
  const [message, setMessage] = useState('');

  // Use the correct API URL for development
  const API_BASE = 'https://medicare-sever-site.vercel.app';

  // Fetch banners from backend
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching banners from admin...');
      const response = await fetch(`${API_BASE}/api/banners`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('📥 Admin banner response:', result);
      
      if (result.success) {
        setBanners(result.data);
        setMessage(`Loaded ${result.data.length} banners successfully`);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('❌ Error fetching banners:', error);
      setMessage(`Error: ${error.message}`);
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token'); // Get your auth token
      const url = editingBanner 
        ? `${API_BASE}/api/banners/${editingBanner._id}`
        : `${API_BASE}/api/banners`;
      
      const method = editingBanner ? 'PUT' : 'POST';
      
      console.log(`🔄 ${method} request to:`, url);
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      console.log('📥 Submit response:', result);
      
      if (result.success) {
        await fetchBanners(); // Refresh the list
        setEditingBanner(null);
        setFormData({ imageUrl: '', title: '', subtitle: '' });
        setMessage(editingBanner ? 'Banner updated successfully!' : 'Banner added successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`Error: ${result.message}`);
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (error) {
      console.error('❌ Error saving banner:', error);
      setMessage(`Error: ${error.message}`);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      imageUrl: banner.imageUrl,
      title: banner.title,
      subtitle: banner.subtitle
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/api/banners/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      
      if (result.success) {
        await fetchBanners(); // Refresh the list
        setMessage('Banner deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`Error: ${result.message}`);
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (error) {
      console.error('❌ Error deleting banner:', error);
      setMessage(`Error: ${error.message}`);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Loading banners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Banners</h1>
      
      {message && (
        <div className={`p-4 mb-6 rounded-lg ${
          message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </div>
      )}
      
      {/* Add/Edit Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingBanner ? 'Edit Banner' : 'Add New Banner'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter image URL (e.g., /assets/banner1.jpg)"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter banner title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter banner subtitle"
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {editingBanner ? 'Update Banner' : 'Add Banner'}
            </button>
            {editingBanner && (
              <button
                type="button"
                onClick={() => {
                  setEditingBanner(null);
                  setFormData({ imageUrl: '', title: '', subtitle: '' });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Banners List */}
      <div className="bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold p-6 border-b">Current Banners ({banners.length})</h2>
        <div className="divide-y">
          {banners.map((banner) => (
            <div key={banner._id} className="p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-20 h-12 object-cover rounded border"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80x48?text=Image+Error';
                  }}
                />
                <div>
                  <h3 className="font-semibold">{banner.title}</h3>
                  <p className="text-sm text-gray-600">{banner.subtitle}</p>
                  <p className="text-xs text-gray-500">ID: {banner._id}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(banner)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(banner._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {banners.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No banners found. Add your first banner above.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBannerManagement;


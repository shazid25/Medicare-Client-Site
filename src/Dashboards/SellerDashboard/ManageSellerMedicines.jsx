// src/Dashboards/SellerDashboard/ManageSellerMedicines.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

const ManageSellerMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const auth = getAuth();

  const getToken = async () => {
    const user = auth.currentUser;
    if (!user) {
      Swal.fire("Error", "Please login to continue", "error");
      return null;
    }
    return await user.getIdToken();
  };

  // Fetch all medicines
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const token = await getToken();
        if (!token) return;

        const response = await axios.get("https://medicare-sever-site.vercel.app/medicine", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Handle different response structures safely
        let medicinesData = [];
        if (response.data && Array.isArray(response.data.data)) {
          medicinesData = response.data.data;
        } else if (Array.isArray(response.data)) {
          medicinesData = response.data;
        } else {
          console.warn("Unexpected API response structure:", response.data);
          setError("Unexpected data format received from server");
        }

        setMedicines(medicinesData);
      } catch (err) {
        console.error("Error fetching medicines:", err);
        const errorMessage = err.response?.data?.message || err.message || "Failed to fetch medicines";
        setError(errorMessage);
        Swal.fire("Error", errorMessage, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Delete medicine
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This medicine will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "white",
    });

    if (!result.isConfirmed) return;

    try {
      const token = await getToken();
      if (!token) return;

      await axios.delete(`https://medicare-sever-site.vercel.app/medicine/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMedicines((prev) => prev.filter((m) => m._id !== id));
      
      Swal.fire({
        title: "Deleted!",
        text: "Medicine has been deleted successfully.",
        icon: "success",
        confirmButtonColor: "#10b981",
        background: "#1f2937",
        color: "white",
      });
    } catch (err) {
      console.error("Error deleting medicine:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete medicine";
      Swal.fire("Error", errorMessage, "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-emerald-100 text-lg font-semibold">Loading your medicines...</p>
          <p className="text-gray-400 text-sm mt-2">Please wait while we fetch your inventory</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <div className="text-center bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-red-500/30">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-xl font-bold text-red-400 mb-2">Unable to Load Medicines</h3>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Manage Your Medicines
          </h2>
          <p className="text-gray-400 text-lg">
            {medicines.length} medicine{medicines.length !== 1 ? 's' : ''} in your inventory
          </p>
        </motion.div>

        {/* Medicines Grid */}
        {medicines.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center bg-gray-800/30 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50"
          >
            <div className="text-8xl mb-4">💊</div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">No Medicines Found</h3>
            <p className="text-gray-500 mb-6">Start by adding your first medicine to the inventory</p>
            <Link
              to="/dashboard/add-medicine"
              className="inline-flex items-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all hover:scale-105"
            >
              <span className="mr-2">+</span> Add New Medicine
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {medicines.map((medicine, index) => (
              <motion.div
                key={medicine._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="bg-gray-800/40 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden group hover:border-emerald-500/30 transition-all duration-300"
              >
                {/* Medicine Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={medicine.image || "/api/placeholder/300/200"}
                    alt={medicine.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%239CA3AF'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  {medicine.discount > 0 && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {medicine.discount}% OFF
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Medicine Info */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                    {medicine.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-1">
                    {medicine.vendor}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-emerald-400">
                        ${medicine.price}
                      </span>
                      {medicine.originalPrice && medicine.originalPrice > medicine.price && (
                        <span className="text-gray-500 line-through text-sm ml-2">
                          ${medicine.originalPrice}
                        </span>
                      )}
                    </div>
                    {medicine.stock !== undefined && (
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        medicine.stock > 10 
                          ? 'bg-green-500/20 text-green-400' 
                          : medicine.stock > 0 
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {medicine.stock > 0 ? `${medicine.stock} in stock` : 'Out of stock'}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      to={`/dashboard/edit-medicine/${medicine._id}`}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all hover:scale-105 text-center flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    
                    <button
                      onClick={() => handleDelete(medicine._id)}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add Medicine Button - Fixed Position */}
        {medicines.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-8 right-8"
          >
            <Link
              to="/dashboard/sellerForm"
              className="inline-flex items-center px-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold rounded-full shadow-2xl transition-all hover:scale-110 hover:shadow-emerald-500/25"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Medicine
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ManageSellerMedicines;
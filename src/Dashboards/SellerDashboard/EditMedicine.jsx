// src/Dashboards/SellerDashboard/EditMedicine.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

const EditMedicine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [medicine, setMedicine] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm();

  // Get token helper
  const getToken = async () => {
    const user = auth.currentUser;
    if (!user) {
      Swal.fire("Error", "Please login to continue", "error");
      return null;
    }
    return await user.getIdToken();
  };

  // Fetch existing medicine
  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        if (!token) return;

        const response = await axios.get(`http://localhost:3000/medicine/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const medicineData = response.data.data || response.data;
        setMedicine(medicineData);
        reset(medicineData);
        setPreview(medicineData.image);
      } catch (err) {
        console.error("Fetch error:", err);
        Swal.fire({
          icon: "error",
          title: "Failed to Load",
          text: err.response?.data?.message || "Could not fetch medicine details",
          background: "#1f2937",
          color: "white",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchMedicine();
  }, [id, reset]);

  // Watch image changes for live preview
  const imageValue = watch("image");
  useEffect(() => {
    if (imageValue) setPreview(imageValue);
  }, [imageValue]);

  // Handle image upload (mock function - integrate with your image service)
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      Swal.fire("Error", "Please select a valid image file", "error");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire("Error", "Image size should be less than 5MB", "error");
      return;
    }

    setUploadingImage(true);
    
    try {
      // Mock upload - replace with actual image upload service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would upload to Cloudinary, AWS S3, etc.
      // const uploadResponse = await uploadToCloudinary(file);
      // const imageUrl = uploadResponse.secure_url;
      
      const mockImageUrl = URL.createObjectURL(file);
      setValue("image", mockImageUrl, { shouldDirty: true });
      setPreview(mockImageUrl);
      
      Swal.fire({
        icon: "success",
        title: "Image Updated!",
        text: "Image has been successfully updated",
        timer: 1500,
        showConfirmButton: false,
        background: "#1f2937",
        color: "white",
      });
    } catch (error) {
      Swal.fire("Error", "Failed to upload image", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const token = await getToken();
      if (!token) return;

      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Number(formData.price),
        discount: formData.discount ? Number(formData.discount) : 0,
        stock: formData.stock ? Number(formData.stock) : 0,
        updatedAt: new Date().toISOString(),
      };

      await axios.put(`http://localhost:3000/medicine/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      Swal.fire({
        icon: "success",
        title: "Updated Successfully!",
        text: "Your medicine has been updated",
        timer: 2000,
        showConfirmButton: false,
        background: "#1f2937",
        color: "white",
        iconColor: "#10b981",
      });

      navigate("/dashboard/manageMedicines");
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || "Failed to update medicine",
        background: "#1f2937",
        color: "white",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-emerald-100 text-lg">Loading medicine details...</p>
        </div>
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <div className="text-center bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-red-500/30">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-xl font-bold text-red-400 mb-2">Medicine Not Found</h3>
          <p className="text-gray-300 mb-4">The medicine you're trying to edit doesn't exist.</p>
          <Link
            to="/dashboard/manageMedicines"
            className="inline-block px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
          >
            Back to Medicines
          </Link>
        </div>
      </div>
    );
  }

  const watchedValues = watch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link
            to="/dashboard/manageMedicines"
            className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Medicines
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-3">
            Edit Medicine
          </h1>
          <p className="text-gray-400">Update your medicine information and pricing</p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 h-fit sticky top-8"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Live Preview
            </h3>

            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              {/* Image Preview */}
              <div className="relative mb-4">
                <div className="w-full h-48 rounded-lg bg-gray-600/30 overflow-hidden flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {preview ? (
                      <motion.img
                        key="preview-image"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <motion.div
                        key="preview-placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-500 text-center"
                      >
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm">No image</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Discount Badge */}
                {watchedValues.discount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                  >
                    {watchedValues.discount}% OFF
                  </motion.span>
                )}
              </div>

              {/* Medicine Info */}
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-white line-clamp-2">
                  {watchedValues.name || "Medicine Name"}
                </h4>
                <p className="text-gray-400 text-sm">
                  {watchedValues.vendor || "Vendor Name"}
                </p>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {watchedValues.details || "Medicine details will appear here..."}
                </p>

                {/* Pricing */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-600/50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-emerald-400">
                      ${watchedValues.price || "0.00"}
                    </span>
                    {watchedValues.originalPrice && watchedValues.originalPrice > watchedValues.price && (
                      <span className="text-gray-400 line-through text-sm">
                        ${watchedValues.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {/* Stock Indicator */}
                  {watchedValues.stock !== undefined && (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      watchedValues.stock > 10 
                        ? 'bg-green-500/20 text-green-400' 
                        : watchedValues.stock > 0 
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {watchedValues.stock} in stock
                    </span>
                  )}
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                  <div>
                    <span className="block text-xs text-gray-500">Type</span>
                    {watchedValues.type || "Not specified"}
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500">Category</span>
                    {watchedValues.category || "Uncategorized"}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="bg-gray-700/20 rounded-xl p-4 border border-gray-600/30">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Basic Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Medicine Name *
                    </label>
                    <input
                      {...register("name", { required: "Medicine name is required" })}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter medicine name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Type *
                    </label>
                    <input
                      {...register("type", { required: "Type is required" })}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., Tablet, Syrup, Capsule"
                    />
                    {errors.type && (
                      <p className="mt-1 text-sm text-red-400">{errors.type.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Vendor *
                    </label>
                    <input
                      {...register("vendor", { required: "Vendor is required" })}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter vendor name"
                    />
                    {errors.vendor && (
                      <p className="mt-1 text-sm text-red-400">{errors.vendor.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <input
                      {...register("category")}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., Pain Relief, Antibiotic"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="bg-gray-700/20 rounded-xl p-4 border border-gray-600/30">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Pricing & Stock
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Price *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                      <input
                        type="number"
                        step="0.01"
                        {...register("price", { 
                          required: "Price is required",
                          min: { value: 0.01, message: "Price must be greater than 0" }
                        })}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="0.00"
                      />
                    </div>
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-400">{errors.price.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Original Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                      <input
                        type="number"
                        step="0.01"
                        {...register("originalPrice")}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Original price"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      {...register("discount", { 
                        min: { value: 0, message: "Discount cannot be negative" },
                        max: { value: 100, message: "Discount cannot exceed 100%" }
                      })}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="0"
                    />
                    {errors.discount && (
                      <p className="mt-1 text-sm text-red-400">{errors.discount.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      {...register("stock", { 
                        min: { value: 0, message: "Stock cannot be negative" }
                      })}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Available stock"
                    />
                    {errors.stock && (
                      <p className="mt-1 text-sm text-red-400">{errors.stock.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Image & Description */}
              <div className="bg-gray-700/20 rounded-xl p-4 border border-gray-600/30">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Media & Description
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Image URL
                    </label>
                    <input
                      {...register("image", { required: "Image URL is required" })}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="https://example.com/medicine-image.jpg"
                    />
                    {errors.image && (
                      <p className="mt-1 text-sm text-red-400">{errors.image.message}</p>
                    )}
                    
                    {/* Image Upload Alternative */}
                    <div className="mt-2">
                      <label className="block text-sm text-gray-400 mb-2">Or upload an image</label>
                      <div className="flex items-center gap-3">
                        <label className="flex-1 cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <div className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-center text-gray-300 hover:bg-gray-600/50 transition-colors border-dashed">
                            {uploadingImage ? "Uploading..." : "Choose Image"}
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      rows={4}
                      {...register("details", { required: "Description is required" })}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                      placeholder="Describe the medicine, its uses, dosage, etc."
                    />
                    {errors.details && (
                      <p className="mt-1 text-sm text-red-400">{errors.details.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting || !isDirty}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Updating Medicine...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {isDirty ? "Save Changes" : "No Changes Made"}
                    </>
                  )}
                </motion.button>

                <button
                  type="button"
                  onClick={() => navigate("/dashboard/manageMedicines")}
                  className="px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-xl transition-colors border border-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EditMedicine;
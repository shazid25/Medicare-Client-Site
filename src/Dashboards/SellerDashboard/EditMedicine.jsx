
// src/Dashboards/SellerDashboard/EditMedicine.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

const inputBase =
  "w-full rounded-xl px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all";

const EditMedicine = ({ currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch existing medicine
  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/medicine/${id}`);
        reset(data); // prefill form
        setPreview(data.image);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Could not fetch medicine details", "error");
      }
    };
    fetchMedicine();
  }, [id, reset]);

  // Watch image changes for live preview
  const imageValue = watch("image");
  useEffect(() => {
    if (imageValue) setPreview(imageValue);
    else setPreview(null);
  }, [imageValue]);

  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Number(formData.price),
        discount: formData.discount ? Number(formData.discount) : 0,
        // If you pass currentUser into this component, it will use the user's email.
        // If not available, preserve existing sellerEmail from fetched doc by not overriding.
        ...(currentUser?.email ? { sellerEmail: currentUser.email } : {}),
      };

      // PUT to backend update endpoint
      await axios.put(`http://localhost:3000/medicine/${id}`, payload);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Your medicine was successfully updated.",
        timer: 1500,
        showConfirmButton: false,
      });

      // Navigate back to the dashboard manage page (match the route in router.jsx)
      navigate("/dashboard/manageMedicines");
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error", err?.response?.data?.message || "Failed to update medicine", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT: Preview */}
          <div className="p-8 bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-extrabold mb-2">Edit Medicine</h3>
              <p className="text-sm opacity-90 mb-6">Update details and save changes.</p>

              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider opacity-80">Live Preview</div>
                <div className="bg-white/10 rounded-xl p-4 flex items-start gap-4">
                  <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-white/20 overflow-hidden border border-white/10">
                    {preview ? (
                      <motion.img
                        src={preview}
                        alt="preview"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/70 text-xs">
                        No image
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{watch("name") || "Medicine name"}</div>
                    <div className="text-sm opacity-90">{watch("vendor") || "Vendor"}</div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="text-xl font-bold">${watch("price") || "0.00"}</div>
                      {watch("discount") > 0 ? (
                        <div className="text-xs bg-white/20 px-2 py-1 rounded-full">{watch("discount")}% OFF</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Medicine Name</label>
                  <input className={inputBase} {...register("name", { required: true })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <input className={inputBase} {...register("type", { required: true })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Vendor</label>
                  <input className={inputBase} {...register("vendor", { required: true })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <input className={inputBase} {...register("category")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input type="number" className={inputBase} {...register("price", { required: true })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Original Price</label>
                  <input type="number" className={inputBase} {...register("originalPrice")} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Discount (%)</label>
                  <input type="number" className={inputBase} {...register("discount")} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input className={inputBase} {...register("image", { required: true })} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Details</label>
                <textarea rows={4} className={inputBase} {...register("details", { required: true })} />
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-3 rounded-xl shadow-lg font-semibold"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </motion.button>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/manageMedicines")}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EditMedicine;

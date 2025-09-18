// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { motion } from "framer-motion";
// import axios from "axios";
// import Swal from "sweetalert2";

// const inputBase =
//   "w-full rounded-xl px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all";

// const SellerForm = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     defaultValues: {
//       name: "",
//       type: "",
//       vendor: "",
//       price: "",
//       originalPrice: "",
//       discount: "",
//       image: "",
//       details: "",
//       category: "",
//       prescriptionRequired: false,
//       dosage: "",
//       sideEffects: "",
//     },
//   });

//   const [preview, setPreview] = useState(null);

//   // Watch fields
//   const imageValue = watch("image");
//   const originalPrice = watch("originalPrice");
//   const discount = watch("discount");

//   // Preview image live
//   useEffect(() => {
//     if (imageValue) setPreview(imageValue);
//     else setPreview(null);
//   }, [imageValue]);

//   // Auto discount calculation
//   useEffect(() => {
//     if (originalPrice && discount >= 0 && discount <= 100) {
//       const discountedPrice =
//         Number(originalPrice) - (Number(originalPrice) * Number(discount)) / 100;

//       reset(
//         {
//           ...watch(),
//           price: discountedPrice.toFixed(2), // Auto update price
//         },
//         { keepErrors: true, keepDirty: true, keepTouched: true }
//       );
//     }
//   }, [originalPrice, discount, reset, watch]);

  
    

//   const onSubmit = async (formData) => {
//     try {
//       const payload = {
//         name: formData.name,
//         type: formData.type,
//         vendor: formData.vendor,
//         price: Number(formData.price),
//         originalPrice:
//           formData.originalPrice !== ""
//             ? Number(formData.originalPrice)
//             : Number(formData.price),
//         discount: formData.discount ? Number(formData.discount) : 0,
//         image: formData.image,
//         details: formData.details,
//         category: formData.category || "general",
//         prescriptionRequired: !!formData.prescriptionRequired,
//         dosage: formData.dosage || "",
//         sideEffects: formData.sideEffects || "",
//         createdAt: new Date().toISOString(),
//       };

//       const { data } = await axios.post("http://localhost:3000/medicine", payload);

//       Swal.fire({
//         icon: "success",
//         title: "Medicine posted!",
//         text: "Your medicine was successfully submitted and will appear after approval (if applicable).",
//         timer: 1500,
//         showConfirmButton: false,
//       });

//       reset();
//       setPreview(null);
//     } catch (err) {
//       console.error(err);
//       Swal.fire({
//         icon: "error",
//         title: "Submission failed",
//         text:
//           err?.response?.data?.message ||
//           err.message ||
//           "Could not post medicine. Check backend and try again.",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20, scale: 0.98 }}
//         whileInView={{ opacity: 1, y: 0, scale: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border"
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-2">
//           {/* LEFT: Preview */}
//           <div className="p-8 bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex flex-col justify-between">
//             <div>
//               <h3 className="text-3xl font-extrabold mb-2">Sell a Medicine</h3>
//               <p className="text-sm opacity-90 mb-6">
//                 Add a product to the marketplace. Fill accurate details so customers can trust your post.
//               </p>

//               <div className="space-y-3">
//                 <div className="text-xs uppercase tracking-wider opacity-80">Live Preview</div>

//                 <div className="bg-white/10 rounded-xl p-4 flex items-start gap-4">
//                   <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-white/20 overflow-hidden border border-white/10">
//                     {preview ? (
//                       <motion.img
//                         src={preview}
//                         alt="preview"
//                         initial={{ scale: 0.95 }}
//                         animate={{ scale: 1 }}
//                         transition={{ duration: 0.6 }}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-white/70 text-xs">
//                         No image
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <div className="text-lg font-semibold">
//                       {watch("name") || "Medicine name"}
//                     </div>
//                     <div className="text-sm opacity-90">{watch("vendor") || "Vendor"}</div>
//                     <div className="mt-2 flex items-center gap-3">
//                       <div className="text-xl font-bold">${watch("price") || "0.00"}</div>
//                       {watch("discount") > 0 ? (
//                         <div className="text-xs bg-white/20 px-2 py-1 rounded-full">
//                           {watch("discount")}% OFF
//                         </div>
//                       ) : null}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <div className="text-xs opacity-90 mb-2">Tips</div>
//               <ul className="text-sm opacity-95 space-y-2 list-disc list-inside">
//                 <li>Use a clear product image (URL to image or hosted asset).</li>
//                 <li>Provide accurate pricing & dosage details.</li>
//                 <li>Add side effects and prescription requirement if applicable.</li>
//               </ul>
//             </div>
//           </div>

//           {/* RIGHT: Form */}
//           <div className="p-8">
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Medicine Name</label>
//                   <input
//                     className={inputBase}
//                     {...register("name", { required: "Medicine name is required" })}
//                     placeholder="e.g. Bone Strength Calcium Tablets"
//                   />
//                   {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Type</label>
//                   <input
//                     className={inputBase}
//                     {...register("type", { required: "Type is required" })}
//                     placeholder="Tablet / Syrup / Device"
//                   />
//                   {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Vendor</label>
//                   <input
//                     className={inputBase}
//                     {...register("vendor", { required: "Vendor is required" })}
//                     placeholder="Vendor / Brand name"
//                   />
//                   {errors.vendor && <p className="text-red-500 text-xs mt-1">{errors.vendor.message}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Category</label>
//                   <input
//                     className={inputBase}
//                     {...register("category")}
//                     placeholder="e.g. Calcium / Cardiology"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Price (USD)</label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     className={inputBase}
//                     {...register("price", { required: "Price is required" })}
//                     placeholder="31.50"
//                   />
//                   {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Original Price</label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     className={inputBase}
//                     {...register("originalPrice")}
//                     placeholder="31.50"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Discount (%)</label>
//                   <input
//                     type="number"
//                     className={inputBase}
//                     {...register("discount", { min: 0, max: 100 })}
//                     placeholder="0"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Image URL</label>
//                 <input
//                   className={inputBase}
//                   {...register("image", { required: "Image URL is required" })}
//                   placeholder="https://images.unsplash.com/..."
//                 />
//                 {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Details / Description</label>
//                 <textarea
//                   rows={4}
//                   className={inputBase + " resize-none"}
//                   {...register("details", { required: "Details are required" })}
//                   placeholder="Advanced calcium supplement with vitamin D3 and magnesium..."
//                 />
//                 {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details.message}</p>}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="inline-flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       {...register("prescriptionRequired")}
//                       className="form-checkbox h-4 w-4 rounded"
//                     />
//                     <span className="text-sm ml-2">Prescription Required</span>
//                   </label>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Dosage</label>
//                   <input className={inputBase} {...register("dosage")} placeholder="e.g. 500mg twice daily" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Side Effects (optional)</label>
//                 <input className={inputBase} {...register("sideEffects")} placeholder="e.g. Nausea, dizziness" />
//               </div>

//               <div className="flex items-center gap-4">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-3 rounded-xl shadow-lg font-semibold"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
//                   </svg>
//                   {isSubmitting ? "Posting..." : "Post Medicine"}
//                 </motion.button>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     reset();
//                     setPreview(null);
//                   }}
//                   className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50"
//                 >
//                   Reset
//                 </button>
//               </div>

//               <p className="text-xs text-gray-500 mt-3">
//                 By posting, you confirm the information is accurate. Admin may review the listing.
//               </p>
//             </form>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SellerForm;







import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const inputBase =
  "w-full rounded-xl px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all";

const SellerForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      type: "",
      vendor: "",
      price: "",
      originalPrice: "",
      discount: "",
      image: "",
      details: "",
      category: "",
      prescriptionRequired: false,
      dosage: "",
      sideEffects: "",
    },
  });

  const [preview, setPreview] = useState(null);

  // Watch fields
  const imageValue = watch("image");
  const originalPrice = watch("originalPrice");
  const discount = watch("discount");

  // Preview image live
  useEffect(() => {
    if (imageValue) setPreview(imageValue);
    else setPreview(null);
  }, [imageValue]);

  // Auto discount calculation
  useEffect(() => {
    if (originalPrice && discount >= 0 && discount <= 100) {
      const discountedPrice =
        Number(originalPrice) - (Number(originalPrice) * Number(discount)) / 100;

      reset(
        {
          ...watch(),
          price: discountedPrice.toFixed(2), // Auto update price
        },
        { keepErrors: true, keepDirty: true, keepTouched: true }
      );
    }
  }, [originalPrice, discount, reset, watch]);

  
    

  const onSubmit = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        type: formData.type,
        vendor: formData.vendor,
        price: Number(formData.price),
        originalPrice:
          formData.originalPrice !== ""
            ? Number(formData.originalPrice)
            : Number(formData.price),
        discount: formData.discount ? Number(formData.discount) : 0,
        image: formData.image,
        details: formData.details,
        category: formData.category || "general",
        prescriptionRequired: !!formData.prescriptionRequired,
        dosage: formData.dosage || "",
        sideEffects: formData.sideEffects || "",
        createdAt: new Date().toISOString(),
      };

      const axiosSecure = useAxiosSecure();

      const { data } = await axios.post("http://localhost:3000/medicine", payload);

      Swal.fire({
        icon: "success",
        title: "Medicine posted!",
        text: "Your medicine was successfully submitted and will appear after approval (if applicable).",
        timer: 1500,
        showConfirmButton: false,
      });

      reset();
      setPreview(null);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission failed",
        text:
          err?.response?.data?.message ||
          err.message ||
          "Could not post medicine. Check backend and try again.",
      });
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
              <h3 className="text-3xl font-extrabold mb-2">Sell a Medicine</h3>
              <p className="text-sm opacity-90 mb-6">
                Add a product to the marketplace. Fill accurate details so customers can trust your post.
              </p>

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
                    <div className="text-lg font-semibold">
                      {watch("name") || "Medicine name"}
                    </div>
                    <div className="text-sm opacity-90">{watch("vendor") || "Vendor"}</div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="text-xl font-bold">${watch("price") || "0.00"}</div>
                      {watch("discount") > 0 ? (
                        <div className="text-xs bg-white/20 px-2 py-1 rounded-full">
                          {watch("discount")}% OFF
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="text-xs opacity-90 mb-2">Tips</div>
              <ul className="text-sm opacity-95 space-y-2 list-disc list-inside">
                <li>Use a clear product image (URL to image or hosted asset).</li>
                <li>Provide accurate pricing & dosage details.</li>
                <li>Add side effects and prescription requirement if applicable.</li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Medicine Name</label>
                  <input
                    className={inputBase}
                    {...register("name", { required: "Medicine name is required" })}
                    placeholder="e.g. Bone Strength Calcium Tablets"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <input
                    className={inputBase}
                    {...register("type", { required: "Type is required" })}
                    placeholder="Tablet / Syrup / Device"
                  />
                  {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Vendor</label>
                  <input
                    className={inputBase}
                    {...register("vendor", { required: "Vendor is required" })}
                    placeholder="Vendor / Brand name"
                  />
                  {errors.vendor && <p className="text-red-500 text-xs mt-1">{errors.vendor.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <input
                    className={inputBase}
                    {...register("category")}
                    placeholder="e.g. Calcium / Cardiology"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    className={inputBase}
                    {...register("price", { required: "Price is required" })}
                    placeholder="31.50"
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Original Price</label>
                  <input
                    type="number"
                    step="0.01"
                    className={inputBase}
                    {...register("originalPrice")}
                    placeholder="31.50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Discount (%)</label>
                  <input
                    type="number"
                    className={inputBase}
                    {...register("discount", { min: 0, max: 100 })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  className={inputBase}
                  {...register("image", { required: "Image URL is required" })}
                  placeholder="https://images.unsplash.com/..."
                />
                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Details / Description</label>
                <textarea
                  rows={4}
                  className={inputBase + " resize-none"}
                  {...register("details", { required: "Details are required" })}
                  placeholder="Advanced calcium supplement with vitamin D3 and magnesium..."
                />
                {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("prescriptionRequired")}
                      className="form-checkbox h-4 w-4 rounded"
                    />
                    <span className="text-sm ml-2">Prescription Required</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Dosage</label>
                  <input className={inputBase} {...register("dosage")} placeholder="e.g. 500mg twice daily" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Side Effects (optional)</label>
                <input className={inputBase} {...register("sideEffects")} placeholder="e.g. Nausea, dizziness" />
              </div>

              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-3 rounded-xl shadow-lg font-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
                  </svg>
                  {isSubmitting ? "Posting..." : "Post Medicine"}
                </motion.button>

                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setPreview(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50"
                >
                  Reset
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                By posting, you confirm the information is accurate. Admin may review the listing.
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SellerForm;




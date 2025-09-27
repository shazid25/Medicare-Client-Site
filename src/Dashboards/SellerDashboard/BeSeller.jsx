// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import useAuth from '../../hooks/useAuth';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { FaUserMd, FaHospital, FaIdCard, FaMapMarkerAlt, FaPhone, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

// const BeSeller = () => {
//   const { user } = useAuth();
//   const { axiosSecure } = useAxiosSecure();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [step, setStep] = useState(1);

//   const { register, handleSubmit, formState: { errors }, watch } = useForm({
//     defaultValues: {
//       email: user?.email || '',
//       name: user?.displayName || '',
//     }
//   });

//   // Watch pharmacy type to conditionally show fields
//   const pharmacyType = watch('pharmacyType');

//   // Form steps
//   const steps = [
//     { number: 1, title: 'Personal Information' },
//     { number: 2, title: 'Business Details' },
//     { number: 3, title: 'Documentation' }
//   ];

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       // Prepare seller application data
//       const sellerData = {
//         ...data,
//         currentRole: 'user',
//         appliedRole: 'seller',
//         status: 'pending', // pending, approved, rejected
//         appliedAt: new Date().toISOString(),
//         userId: user.uid,
//         userEmail: user.email
//       };

//       // Submit application to backend
//       const response = await axiosSecure.post('/seller-applications', sellerData);
      
//       if (response.data.success) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Application Submitted!',
//           html: `
//             <div class="text-left">
//               <p class="mb-2">✅ Your seller application has been received.</p>
//               <p class="text-sm text-gray-600">We will review your application and contact you within 2-3 business days.</p>
//             </div>
//           `,
//           confirmButtonText: 'Go to Dashboard',
//           confirmButtonColor: '#10B981'
//         }).then(() => {
//           navigate('/dashboard');
//         });
//       }
//     } catch (error) {
//       console.error('Application error:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Application Failed',
//         text: error.response?.data?.message || 'Something went wrong. Please try again.',
//         confirmButtonColor: '#EF4444'
//       });
//     }
//     setLoading(false);
//   };

//   const nextStep = () => {
//     if (step < 3) setStep(step + 1);
//   };

//   const prevStep = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-8"
//         >
//           <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//             <div className="flex items-center justify-center mb-4">
//               <div className="bg-green-100 p-3 rounded-full">
//                 <FaUserMd className="text-3xl text-green-600" />
//               </div>
//             </div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">
//               Become a Verified Medicine Seller
//             </h1>
//             <p className="text-gray-600 mb-4">
//               Join our trusted network of pharmaceutical sellers and start reaching thousands of customers
//             </p>
//             <div className="bg-blue-50 rounded-lg p-4">
//               <h3 className="font-semibold text-blue-800 mb-2">Why Sell With Us?</h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
//                 <div className="flex items-center">
//                   <FaCheckCircle className="text-green-500 mr-2" />
//                   <span>Verified Seller Badge</span>
//                 </div>
//                 <div className="flex items-center">
//                   <FaCheckCircle className="text-green-500 mr-2" />
//                   <span>Wide Customer Reach</span>
//                 </div>
//                 <div className="flex items-center">
//                   <FaCheckCircle className="text-green-500 mr-2" />
//                   <span>Secure Payments</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Progress Steps */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//           <div className="flex justify-between items-center mb-8">
//             {steps.map((stepItem) => (
//               <div key={stepItem.number} className="flex flex-col items-center flex-1">
//                 <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
//                   step >= stepItem.number 
//                     ? 'bg-green-500 border-green-500 text-white' 
//                     : 'border-gray-300 text-gray-300'
//                 } font-semibold`}>
//                   {stepItem.number}
//                 </div>
//                 <span className={`text-sm mt-2 ${
//                   step >= stepItem.number ? 'text-green-600 font-semibold' : 'text-gray-400'
//                 }`}>
//                   {stepItem.title}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Form Content */}
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {/* Step 1: Personal Information */}
//             {step === 1 && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="space-y-6"
//               >
//                 <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
//                   Personal Information
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       {...register("name", { 
//                         required: "Full name is required",
//                         minLength: { value: 2, message: "Name must be at least 2 characters" }
//                       })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Enter your full name"
//                     />
//                     {errors.name && (
//                       <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       {...register("email", { 
//                         required: "Email is required",
//                         pattern: {
//                           value: /^\S+@\S+$/i,
//                           message: "Invalid email address"
//                         }
//                       })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
//                       placeholder="your@email.com"
//                       readOnly
//                     />
//                     <p className="text-xs text-gray-500 mt-1">This email is verified and cannot be changed</p>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number *
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="tel"
//                         {...register("phone", { 
//                           required: "Phone number is required",
//                           pattern: {
//                             value: /^[0-9+\-\s()]{10,}$/,
//                             message: "Please enter a valid phone number"
//                           }
//                         })}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         placeholder="+1 (555) 123-4567"
//                       />
//                       <FaPhone className="absolute right-3 top-3.5 text-gray-400" />
//                     </div>
//                     {errors.phone && (
//                       <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Date of Birth *
//                     </label>
//                     <input
//                       type="date"
//                       {...register("dateOfBirth", { 
//                         required: "Date of birth is required",
//                         validate: {
//                           minAge: value => {
//                             const today = new Date();
//                             const birthDate = new Date(value);
//                             const age = today.getFullYear() - birthDate.getFullYear();
//                             return age >= 18 || "You must be at least 18 years old";
//                           }
//                         }
//                       })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                     {errors.dateOfBirth && (
//                       <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Residential Address *
//                   </label>
//                   <div className="relative">
//                     <textarea
//                       {...register("address", { 
//                         required: "Address is required",
//                         minLength: { value: 10, message: "Please provide a complete address" }
//                       })}
//                       rows={3}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Street address, city, state, zip code"
//                     />
//                     <FaMapMarkerAlt className="absolute right-3 top-3.5 text-gray-400" />
//                   </div>
//                   {errors.address && (
//                     <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
//                   )}
//                 </div>
//               </motion.div>
//             )}

//             {/* Step 2: Business Details */}
//             {step === 2 && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="space-y-6"
//               >
//                 <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
//                   Business Information
//                 </h2>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Type of Pharmacy/Business *
//                   </label>
//                   <select
//                     {...register("pharmacyType", { required: "Please select business type" })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Select business type</option>
//                     <option value="retail_pharmacy">Retail Pharmacy</option>
//                     <option value="wholesaler">Wholesale Distributor</option>
//                     <option value="hospital_pharmacy">Hospital Pharmacy</option>
//                     <option value="online_pharmacy">Online Pharmacy</option>
//                     <option value="drug_manufacturer">Drug Manufacturer</option>
//                     <option value="other">Other Healthcare Business</option>
//                   </select>
//                   {errors.pharmacyType && (
//                     <p className="text-red-500 text-sm mt-1">{errors.pharmacyType.message}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Business/Pharmacy Name *
//                   </label>
//                   <input
//                     type="text"
//                     {...register("businessName", { 
//                       required: "Business name is required",
//                       minLength: { value: 2, message: "Business name must be at least 2 characters" }
//                     })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Enter your business name"
//                   />
//                   {errors.businessName && (
//                     <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>
//                   )}
//                 </div>

//                 {pharmacyType && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Business Address *
//                     </label>
//                     <textarea
//                       {...register("businessAddress", { 
//                         required: "Business address is required",
//                         minLength: { value: 10, message: "Please provide a complete business address" }
//                       })}
//                       rows={3}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="Business street address, city, state, zip code"
//                     />
//                     {errors.businessAddress && (
//                       <p className="text-red-500 text-sm mt-1">{errors.businessAddress.message}</p>
//                     )}
//                   </div>
//                 )}

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Years in Business *
//                     </label>
//                     <select
//                       {...register("yearsInBusiness", { required: "Please select years in business" })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="">Select years</option>
//                       <option value="0-1">Less than 1 year</option>
//                       <option value="1-3">1-3 years</option>
//                       <option value="3-5">3-5 years</option>
//                       <option value="5-10">5-10 years</option>
//                       <option value="10+">10+ years</option>
//                     </select>
//                     {errors.yearsInBusiness && (
//                       <p className="text-red-500 text-sm mt-1">{errors.yearsInBusiness.message}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Estimated Monthly Sales Volume *
//                     </label>
//                     <select
//                       {...register("salesVolume", { required: "Please select sales volume" })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="">Select volume</option>
//                       <option value="0-10000">$0 - $10,000</option>
//                       <option value="10000-50000">$10,000 - $50,000</option>
//                       <option value="50000-100000">$50,000 - $100,000</option>
//                       <option value="100000-500000">$100,000 - $500,000</option>
//                       <option value="500000+">$500,000+</option>
//                     </select>
//                     {errors.salesVolume && (
//                       <p className="text-red-500 text-sm mt-1">{errors.salesVolume.message}</p>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Describe Your Business and Products *
//                   </label>
//                   <textarea
//                     {...register("businessDescription", { 
//                       required: "Business description is required",
//                       minLength: { value: 50, message: "Please provide at least 50 characters description" }
//                     })}
//                     rows={4}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Describe the types of medicines and healthcare products you plan to sell..."
//                   />
//                   {errors.businessDescription && (
//                     <p className="text-red-500 text-sm mt-1">{errors.businessDescription.message}</p>
//                   )}
//                 </div>
//               </motion.div>
//             )}

//             {/* Step 3: Documentation */}
//             {step === 3 && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="space-y-6"
//               >
//                 <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
//                   Required Documentation
//                 </h2>

//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                   <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
//                     <FaShieldAlt className="mr-2" />
//                     Verification Requirements
//                   </h3>
//                   <p className="text-yellow-700 text-sm">
//                     All documents are securely stored and only used for verification purposes.
//                     Your application will be processed within 2-3 business days after document verification.
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Government Issued ID *
//                     </label>
//                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                       <FaIdCard className="text-3xl text-gray-400 mx-auto mb-2" />
//                       <input
//                         type="file"
//                         {...register("governmentId", { 
//                           required: "Government ID is required"
//                         })}
//                         accept=".jpg,.jpeg,.png,.pdf"
//                         className="w-full"
//                       />
//                       <p className="text-xs text-gray-500 mt-2">
//                         Upload driver's license, passport, or national ID (JPG, PNG, PDF)
//                       </p>
//                     </div>
//                     {errors.governmentId && (
//                       <p className="text-red-500 text-sm mt-1">{errors.governmentId.message}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Business License *
//                     </label>
//                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                       <FaHospital className="text-3xl text-gray-400 mx-auto mb-2" />
//                       <input
//                         type="file"
//                         {...register("businessLicense", { 
//                           required: "Business license is required"
//                         })}
//                         accept=".jpg,.jpeg,.png,.pdf"
//                         className="w-full"
//                       />
//                       <p className="text-xs text-gray-500 mt-2">
//                         Pharmacy license or business registration certificate
//                       </p>
//                     </div>
//                     {errors.businessLicense && (
//                       <p className="text-red-500 text-sm mt-1">{errors.businessLicense.message}</p>
//                     )}
//                   </div>
//                 </div>

//                 {pharmacyType === 'drug_manufacturer' && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Manufacturing License
//                     </label>
//                     <input
//                       type="file"
//                       {...register("manufacturingLicense")}
//                       accept=".jpg,.jpeg,.png,.pdf"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                     />
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Tax Identification Number (TIN) *
//                   </label>
//                   <input
//                     type="text"
//                     {...register("taxId", { 
//                       required: "Tax ID is required",
//                       pattern: {
//                         value: /^[0-9-]{9,15}$/,
//                         message: "Please enter a valid tax identification number"
//                       }
//                     })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Enter your TIN/EIN"
//                   />
//                   {errors.taxId && (
//                     <p className="text-red-500 text-sm mt-1">{errors.taxId.message}</p>
//                   )}
//                 </div>

//                 <div className="flex items-start">
//                   <input
//                     type="checkbox"
//                     {...register("termsAccepted", { 
//                       required: "You must accept the terms and conditions"
//                     })}
//                     className="mt-1 mr-3"
//                     id="terms"
//                   />
//                   <label htmlFor="terms" className="text-sm text-gray-700">
//                     I certify that all information provided is accurate and I agree to the{' '}
//                     <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
//                     and{' '}
//                     <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>. 
//                     I understand that selling prescription medicines requires proper licensing and compliance with all applicable laws.
//                   </label>
//                 </div>
//                 {errors.termsAccepted && (
//                   <p className="text-red-500 text-sm mt-1">{errors.termsAccepted.message}</p>
//                 )}
//               </motion.div>
//             )}

//             {/* Navigation Buttons */}
//             <div className="flex justify-between mt-8 pt-6 border-t">
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 disabled={step === 1}
//                 className={`px-6 py-3 rounded-lg font-medium ${
//                   step === 1 
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 Previous
//               </button>

//               {step < 3 ? (
//                 <button
//                   type="button"
//                   onClick={nextStep}
//                   className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
//                 >
//                   Next Step
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-green-400"
//                 >
//                   {loading ? (
//                     <span className="flex items-center">
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Submitting...
//                     </span>
//                   ) : (
//                     'Submit Application'
//                   )}
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>

//         {/* Additional Information */}
//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <h3 className="font-semibold text-gray-800 mb-4">What happens after application?</h3>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
//             <div className="text-center p-3">
//               <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
//                 <span className="font-bold text-blue-600">1</span>
//               </div>
//               <p className="font-medium">Document Review</p>
//               <p className="text-gray-600 text-xs">2-3 business days</p>
//             </div>
//             <div className="text-center p-3">
//               <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
//                 <span className="font-bold text-blue-600">2</span>
//               </div>
//               <p className="font-medium">Background Check</p>
//               <p className="text-gray-600 text-xs">License verification</p>
//             </div>
//             <div className="text-center p-3">
//               <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
//                 <span className="font-bold text-blue-600">3</span>
//               </div>
//               <p className="font-medium">Approval</p>
//               <p className="text-gray-600 text-xs">Get seller dashboard access</p>
//             </div>
//             <div className="text-center p-3">
//               <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
//                 <span className="font-bold text-blue-600">4</span>
//               </div>
//               <p className="font-medium">Start Selling</p>
//               <p className="text-gray-600 text-xs">List your products</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BeSeller;





import React, { useState, useEffect } from 'react'; // Added useEffect
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaUserMd, FaHospital, FaIdCard, FaMapMarkerAlt, FaPhone, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

const BeSeller = () => {
  const { user } = useAuth();
  const { axiosSecure, loading: axiosLoading } = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [axiosError, setAxiosError] = useState(null);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
      email: user?.email || '',
      name: user?.displayName || '',
    }
  });

  // Set form values when user data is available
  useEffect(() => {
    if (user) {
      setValue('email', user.email);
      setValue('name', user.displayName || '');
    }
  }, [user, setValue]);

  // Watch pharmacy type to conditionally show fields
  const pharmacyType = watch('pharmacyType');

  // Form steps
  const steps = [
    { number: 1, title: 'Personal Information' },
    { number: 2, title: 'Business Details' },
    { number: 3, title: 'Documentation' }
  ];

  const onSubmit = async (data) => {
    // Check if axiosSecure is available
    if (!axiosSecure) {
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: 'Unable to establish connection. Please refresh the page and try again.',
        confirmButtonColor: '#EF4444'
      });
      return;
    }

    setLoading(true);
    setAxiosError(null);

    try {
      // Prepare seller application data
      const sellerData = {
        ...data,
        currentRole: 'user',
        appliedRole: 'seller',
        status: 'pending',
        appliedAt: new Date().toISOString(),
        userId: user?.uid,
        userEmail: user?.email
      };

      console.log('Submitting application:', sellerData);

      // Submit application to backend
      const response = await axiosSecure.post('/seller-applications', sellerData);
      
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Application Submitted!',
          html: `
            <div class="text-left">
              <p class="mb-2">✅ Your seller application has been received.</p>
              <p class="text-sm text-gray-600">We will review your application and contact you within 2-3 business days.</p>
            </div>
          `,
          confirmButtonText: 'Go to Dashboard',
          confirmButtonColor: '#10B981'
        }).then(() => {
          navigate('/dashboard');
        });
      }
    } catch (error) {
      console.error('Application error:', error);
      setAxiosError(error.message);
      
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || error.response.statusText;
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error. Please check your connection and try again.';
      }

      Swal.fire({
        icon: 'error',
        title: 'Application Failed',
        text: errorMessage,
        confirmButtonColor: '#EF4444'
      });
    }
    setLoading(false);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Show loading if axios is still initializing
  if (axiosLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing application form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FaUserMd className="text-3xl text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Become a Verified Medicine Seller
            </h1>
            <p className="text-gray-600 mb-4">
              Join our trusted network of pharmaceutical sellers and start reaching thousands of customers
            </p>
            
            {/* Error Display */}
            {axiosError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-700">Connection Error: {axiosError}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="text-red-600 underline text-sm mt-2"
                >
                  Refresh Page
                </button>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Why Sell With Us?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  <span>Verified Seller Badge</span>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  <span>Wide Customer Reach</span>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  <span>Secure Payments</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rest of your component remains the same */}
        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-8">
            {steps.map((stepItem) => (
              <div key={stepItem.number} className="flex flex-col items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step >= stepItem.number 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : 'border-gray-300 text-gray-300'
                } font-semibold`}>
                  {stepItem.number}
                </div>
                <span className={`text-sm mt-2 ${
                  step >= stepItem.number ? 'text-green-600 font-semibold' : 'text-gray-400'
                }`}>
                  {stepItem.title}
                </span>
              </div>
            ))}
          </div>

          {/* Form Content - Rest of your form code remains exactly the same */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register("name", { 
                        required: "Full name is required",
                        minLength: { value: 2, message: "Name must be at least 2 characters" }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      placeholder="your@email.com"
                      readOnly
                    />
                    <p className="text-xs text-gray-500 mt-1">This email is verified and cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        {...register("phone", { 
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9+\-\s()]{10,}$/,
                            message: "Please enter a valid phone number"
                          }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                      <FaPhone className="absolute right-3 top-3.5 text-gray-400" />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      {...register("dateOfBirth", { 
                        required: "Date of birth is required",
                        validate: {
                          minAge: value => {
                            const today = new Date();
                            const birthDate = new Date(value);
                            const age = today.getFullYear() - birthDate.getFullYear();
                            return age >= 18 || "You must be at least 18 years old";
                          }
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Residential Address *
                  </label>
                  <div className="relative">
                    <textarea
                      {...register("address", { 
                        required: "Address is required",
                        minLength: { value: 10, message: "Please provide a complete address" }
                      })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Street address, city, state, zip code"
                    />
                    <FaMapMarkerAlt className="absolute right-3 top-3.5 text-gray-400" />
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Business Details */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Business Information
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type of Pharmacy/Business *
                  </label>
                  <select
                    {...register("pharmacyType", { required: "Please select business type" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select business type</option>
                    <option value="retail_pharmacy">Retail Pharmacy</option>
                    <option value="wholesaler">Wholesale Distributor</option>
                    <option value="hospital_pharmacy">Hospital Pharmacy</option>
                    <option value="online_pharmacy">Online Pharmacy</option>
                    <option value="drug_manufacturer">Drug Manufacturer</option>
                    <option value="other">Other Healthcare Business</option>
                  </select>
                  {errors.pharmacyType && (
                    <p className="text-red-500 text-sm mt-1">{errors.pharmacyType.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business/Pharmacy Name *
                  </label>
                  <input
                    type="text"
                    {...register("businessName", { 
                      required: "Business name is required",
                      minLength: { value: 2, message: "Business name must be at least 2 characters" }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your business name"
                  />
                  {errors.businessName && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>
                  )}
                </div>

                {pharmacyType && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address *
                    </label>
                    <textarea
                      {...register("businessAddress", { 
                        required: "Business address is required",
                        minLength: { value: 10, message: "Please provide a complete business address" }
                      })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Business street address, city, state, zip code"
                    />
                    {errors.businessAddress && (
                      <p className="text-red-500 text-sm mt-1">{errors.businessAddress.message}</p>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years in Business *
                    </label>
                    <select
                      {...register("yearsInBusiness", { required: "Please select years in business" })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select years</option>
                      <option value="0-1">Less than 1 year</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                    {errors.yearsInBusiness && (
                      <p className="text-red-500 text-sm mt-1">{errors.yearsInBusiness.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Monthly Sales Volume *
                    </label>
                    <select
                      {...register("salesVolume", { required: "Please select sales volume" })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select volume</option>
                      <option value="0-10000">$0 - $10,000</option>
                      <option value="10000-50000">$10,000 - $50,000</option>
                      <option value="50000-100000">$50,000 - $100,000</option>
                      <option value="100000-500000">$100,000 - $500,000</option>
                      <option value="500000+">$500,000+</option>
                    </select>
                    {errors.salesVolume && (
                      <p className="text-red-500 text-sm mt-1">{errors.salesVolume.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe Your Business and Products *
                  </label>
                  <textarea
                    {...register("businessDescription", { 
                      required: "Business description is required",
                      minLength: { value: 50, message: "Please provide at least 50 characters description" }
                    })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the types of medicines and healthcare products you plan to sell..."
                  />
                  {errors.businessDescription && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessDescription.message}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Documentation */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Required Documentation
                </h2>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                    <FaShieldAlt className="mr-2" />
                    Verification Requirements
                  </h3>
                  <p className="text-yellow-700 text-sm">
                    All documents are securely stored and only used for verification purposes.
                    Your application will be processed within 2-3 business days after document verification.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Government Issued ID *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FaIdCard className="text-3xl text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        {...register("governmentId", { 
                          required: "Government ID is required"
                        })}
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Upload driver's license, passport, or national ID (JPG, PNG, PDF)
                      </p>
                    </div>
                    {errors.governmentId && (
                      <p className="text-red-500 text-sm mt-1">{errors.governmentId.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business License *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FaHospital className="text-3xl text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        {...register("businessLicense", { 
                          required: "Business license is required"
                        })}
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Pharmacy license or business registration certificate
                      </p>
                    </div>
                    {errors.businessLicense && (
                      <p className="text-red-500 text-sm mt-1">{errors.businessLicense.message}</p>
                    )}
                  </div>
                </div>

                {pharmacyType === 'drug_manufacturer' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Manufacturing License
                    </label>
                    <input
                      type="file"
                      {...register("manufacturingLicense")}
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Identification Number (TIN) *
                  </label>
                  <input
                    type="text"
                    {...register("taxId", { 
                      required: "Tax ID is required",
                      pattern: {
                        value: /^[0-9-]{9,15}$/,
                        message: "Please enter a valid tax identification number"
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your TIN/EIN"
                  />
                  {errors.taxId && (
                    <p className="text-red-500 text-sm mt-1">{errors.taxId.message}</p>
                  )}
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    {...register("termsAccepted", { 
                      required: "You must accept the terms and conditions"
                    })}
                    className="mt-1 mr-3"
                    id="terms"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I certify that all information provided is accurate and I agree to the{' '}
                    <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>. 
                    I understand that selling prescription medicines requires proper licensing and compliance with all applicable laws.
                  </label>
                </div>
                {errors.termsAccepted && (
                  <p className="text-red-500 text-sm mt-1">{errors.termsAccepted.message}</p>
                )}
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={`px-6 py-3 rounded-lg font-medium ${
                  step === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !axiosSecure}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-green-400"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-4">What happens after application?</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="font-bold text-blue-600">1</span>
              </div>
              <p className="font-medium">Document Review</p>
              <p className="text-gray-600 text-xs">2-3 business days</p>
            </div>
            <div className="text-center p-3">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="font-bold text-blue-600">2</span>
              </div>
              <p className="font-medium">Background Check</p>
              <p className="text-gray-600 text-xs">License verification</p>
            </div>
            <div className="text-center p-3">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="font-bold text-blue-600">3</span>
              </div>
              <p className="font-medium">Approval</p>
              <p className="text-gray-600 text-xs">Get seller dashboard access</p>
            </div>
            <div className="text-center p-3">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="font-bold text-blue-600">4</span>
              </div>
              <p className="font-medium">Start Selling</p>
              <p className="text-gray-600 text-xs">List your products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeSeller;

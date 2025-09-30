// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Swal from 'sweetalert2'; // Import SweetAlert2

// const Featured = () => {
//   const [featuredMedicines, setFeaturedMedicines] = useState([]);
//   // Add state for cart count to trigger re-renders
//   const [cartItemCount, setCartItemCount] = useState(0);

//   useEffect(() => {
//     // Initialize cart count from localStorage on component mount
//     const currentCart = JSON.parse(localStorage.getItem('medicineCart')) || [];
//     const total = currentCart.reduce((acc, item) => acc + item.quantity, 0);
//     setCartItemCount(total);
//   }, []);

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       try {
//         const res = await axios.get("https://medicare-sever-site.vercel.app/medicine");
//         setFeaturedMedicines(Array.isArray(res.data.data) ? res.data.data : []);
//       } catch (err) {
//         console.error("Failed to fetch medicines:", err);
//       }
//     };
//     fetchMedicines();
//   }, []);

//   const addToCart = (medicine) => {
//     const currentCart = JSON.parse(localStorage.getItem('medicineCart')) || [];
//     const existingItem = currentCart.find((item) => item._id === medicine._id);
    
//     let updatedCart;
//     if (existingItem) {
//       updatedCart = currentCart.map((item) =>
//         item._id === medicine._id 
//           ? { ...item, quantity: item.quantity + 1 } 
//           : item
//       );
//     } else {
//       updatedCart = [...currentCart, { ...medicine, quantity: 1 }];
//     }
    
//     // Save updated cart to localStorage
//     localStorage.setItem('medicineCart', JSON.stringify(updatedCart));
    
//     // Update state to trigger re-render with new count
//     const newTotal = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
//     setCartItemCount(newTotal);
    
//     // Show SweetAlert2 confirmation
//     Swal.fire({
//       title: 'Added to Cart!',
//       text: `${medicine.name} has been added to your cart.`,
//       icon: 'success',
//       timer: 1000, // Automatically close after 1 second
//       timerProgressBar: true,
//       showConfirmButton: false, // Hide the "OK" button
//       background: 'rgba(255, 255, 255, 0.8)', // Transparent background
//       customClass: {
//         popup: 'transparent-alert' // Add a custom class for further styling
//       }
//     });
    
//     console.log('Added to cart:', medicine.name);
//   };

//   return (
//     <section className="container mx-auto px-4 mb-12">
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
//         <h2 className="text-3xl font-bold relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-blue-500 after:to-teal-500">
//           Featured Medicines
//         </h2>
//         {/* Use the state variable here */}
//         <div className="mt-4 sm:mt-0 text-lg font-medium text-blue-600 flex items-center gap-2">
//           <span>Cart: {cartItemCount} items</span>
//           <Link 
//             to="/dashboard/transaction" 
//             className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition-colors"
//           >
//             Checkout
//           </Link>
//         </div>
//       </div>

//       {/* ... rest of your JSX (grid of medicines) remains the same ... */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//         {featuredMedicines.map((medicine, index) => (
//           <motion.div
//             key={medicine._id}
//             initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
//             className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
//           >
//             {/* ... existing medicine card content ... */}
//             {medicine.discount > 0 && (
//               <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
//                 {medicine.discount}% OFF
//               </div>
//             )}
//             <img
//               src={medicine.image}
//               alt={medicine.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   {medicine.name}
//                 </h3>
//                 <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
//                   {medicine.type}
//                 </span>
//               </div>
//               <p className="text-gray-500 text-sm mb-3">
//                 By: {medicine.vendor}
//               </p>
//               <div className="flex justify-between items-center">
//                 <div>
//                   <span className="font-bold text-gray-900">
//                     ${medicine.price}
//                   </span>
//                   {medicine.originalPrice && (
//                     <span className="text-gray-500 text-sm line-through ml-2">
//                       ${medicine.originalPrice}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <Link
//                 to={`/details/${medicine._id}`}
//                 className="block text-center mt-3 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-3 py-2 rounded-full text-sm font-medium transition-all duration-300"
//               >
//                 Details
//               </Link>

//               <button
//                 onClick={() => addToCart(medicine)}
//                 className="w-full mt-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-3 py-2 rounded-full text-sm font-medium transition-all duration-300"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Featured;







import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const Featured = () => {
  const [featuredMedicines, setFeaturedMedicines] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const currentCart = JSON.parse(localStorage.getItem('medicineCart')) || [];
    const total = currentCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartItemCount(total);
  }, []);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await axios.get("https://medicare-sever-site.vercel.app/medicine");
        setFeaturedMedicines(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("Failed to fetch medicines:", err);
      }
    };
    fetchMedicines();
  }, []);

  const addToCart = (medicine) => {
    const currentCart = JSON.parse(localStorage.getItem('medicineCart')) || [];
    const existingItem = currentCart.find((item) => item._id === medicine._id);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = currentCart.map((item) =>
        item._id === medicine._id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      updatedCart = [...currentCart, { ...medicine, quantity: 1 }];
    }
    
    localStorage.setItem('medicineCart', JSON.stringify(updatedCart));
    
    const newTotal = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartItemCount(newTotal);
    
    Swal.fire({
      title: 'Added to Cart!',
      text: `${medicine.name} has been added to your cart.`,
      icon: 'success',
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
      background: 'rgba(255, 255, 255, 0.8)',
      customClass: {
        popup: 'transparent-alert'
      }
    });
    
    console.log('Added to cart:', medicine.name);
  };

  // Cart Summary Component for reusability
  const CartSummary = () => (
    <div className="text-lg font-medium text-blue-600 flex items-center gap-2">
      <span>Cart: {cartItemCount} items</span>
      <Link 
        to="/dashboard/transaction" 
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition-colors"
      >
        Checkout
      </Link>
    </div>
  );

  return (
    <section className="container mx-auto px-4 mb-12">
      {/* Header Section with First Cart */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-blue-500 after:to-teal-500">
          Featured Medicines
        </h2>
        
        {/* First Cart - Hidden on mobile, visible on larger screens */}
        <div className="hidden sm:flex">
          <CartSummary />
        </div>

        {/* Second Cart for Mobile - Only visible on mobile */}
        <div className="sm:hidden mt-4">
          <CartSummary />
        </div>
      </div>

      {/* Medicines Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredMedicines.map((medicine, index) => (
          <motion.div
            key={medicine._id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
            className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            {medicine.discount > 0 && (
              <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                {medicine.discount}% OFF
              </div>
            )}
            <img
              src={medicine.image}
              alt={medicine.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {medicine.name}
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  {medicine.type}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-3">
                By: {medicine.vendor}
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-gray-900">
                    ${medicine.price}
                  </span>
                  {medicine.originalPrice && (
                    <span className="text-gray-500 text-sm line-through ml-2">
                      ${medicine.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <Link
                to={`/details/${medicine._id}`}
                className="block text-center mt-3 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-3 py-2 rounded-full text-sm font-medium transition-all duration-300"
              >
                Details
              </Link>

              <button
                onClick={() => addToCart(medicine)}
                className="w-full mt-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-3 py-2 rounded-full text-sm font-medium transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Second Mobile Cart - Fixed at bottom for easy access */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="container mx-auto">
          <CartSummary />
        </div>
      </div>

      {/* Add padding to prevent content from being hidden behind fixed cart */}
      <div className="sm:hidden h-20"></div>
    </section>
  );
};

export default Featured;
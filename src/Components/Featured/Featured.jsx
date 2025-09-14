// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Featured = () => {
//   const [cart, setCart] = useState([]);
//   const [featuredMedicines, setFeaturedMedicines] = useState([]);
//   const navigate = useNavigate();

//   // Fetch medicines from API
//   useEffect(() => {
//     const fetchMedicines = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:3000/medicine');
//         // Remove details field
//         const medicinesWithoutDetails = data.map(({ details, ...rest }) => rest);
//         setFeaturedMedicines(medicinesWithoutDetails);
//       } catch (error) {
//         console.error('Failed to fetch medicines:', error);
//       }
//     };
//     fetchMedicines();
//   }, []);

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const existing = prevCart.find(item => item.id === medicine.id);
//       if (existing) {
//         return prevCart.map(item =>
//           item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         return [...prevCart, { ...medicine, quantity: 1 }];
//       }
//     });
//   };

//   const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

//   return (
//     <section className="container mx-auto px-4 mb-12">
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
//         <h2 className="text-3xl font-bold relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-blue-500 after:to-teal-500">
//           Featured Medicines
//         </h2>
//         <div className="mt-4 sm:mt-0 text-lg font-medium text-blue-600">
//           Cart: {totalItems} items
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {featuredMedicines.map((medicine, index) => (
//           <motion.div
//             key={medicine.id}
//             initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
//             className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
//           >
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
//                 <h3 className="text-lg font-semibold text-gray-800">{medicine.name}</h3>
//                 <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
//                   {medicine.type}
//                 </span>
//               </div>
//               <p className="text-gray-500 text-sm mb-3">By: {medicine.vendor}</p>
//               <div className="flex justify-between items-center mb-2">
//                 <div>
//                   <span className="font-bold text-gray-900">${medicine.price}</span>
//                   {medicine.originalPrice && (
//                     <span className="text-gray-500 text-sm line-through ml-2">${medicine.originalPrice}</span>
//                   )}
//                 </div>
//               </div>
//               <div className="flex justify-between items-center gap-2">
//                 {/* <button
//                   onClick={() => navigate('/details')}
//                   className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 flex-1"
//                 >
//                   Details
//                 </button> */}

//                 <button
//                 onClick={() => navigate(`/details/${medicine.id}`)}
//                 className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 flex-1">
//                  Details</button>

//                 <button
//                   onClick={() => addToCart(medicine)}
//                   className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 flex-1"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Featured;




// src/pages/Featured/Featured.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Featured = () => {
  const [cart, setCart] = useState([]);
  const [featuredMedicines, setFeaturedMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/medicine');
        setFeaturedMedicines(data);
      } catch (error) {
        console.error('Failed to fetch medicines:', error);
      }
    };
    fetchMedicines();
  }, []);

  const addToCart = (medicine) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === medicine._id);
      if (existing) return prev.map(item => item._id === medicine._id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...medicine, quantity: 1 }];
    });
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <section className="container mx-auto px-4 mb-12">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-blue-500 after:to-teal-500">
          Featured Medicines
        </h2>
        <div className="mt-4 sm:mt-0 text-lg font-medium text-blue-600">
          Cart: {totalItems} items
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <img src={medicine.image} alt={medicine.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{medicine.name}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">{medicine.type}</span>
              </div>
              <p className="text-gray-500 text-sm mb-3">By: {medicine.vendor}</p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-gray-900">${medicine.price}</span>
                  {medicine.originalPrice && <span className="text-gray-500 text-sm line-through ml-2">${medicine.originalPrice}</span>}
                </div>
              </div>

              {/* Details button */}
              <Link to={`/details/${medicine._id}`}
                className="block text-center mt-3 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-3 py-2 rounded-full text-sm font-medium transition-all duration-300">
                Details
              </Link>

              {/* Add to Cart button */}
              <button onClick={() => addToCart(medicine)}
                className="w-full mt-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-3 py-2 rounded-full text-sm font-medium transition-all duration-300">
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Featured;

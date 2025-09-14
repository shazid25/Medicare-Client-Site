// // src/pages/Details/Details.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import axios from 'axios';

// const Details = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [medicine, setMedicine] = useState(null);
//   const [typedText, setTypedText] = useState('');

//   useEffect(() => {
//     const fetchMedicine = async () => {
//       try {
//         const { data } = await axios.get(`http://localhost:3000/medicine/${id}`);
//         setMedicine(data);

//         // Typing animation for details
//         let index = 0;
//         setTypedText('');
//         const interval = setInterval(() => {
//           setTypedText(prev => prev + data.details[index]);
//           index++;
//           if (index >= data.details.length) clearInterval(interval);
//         }, 25);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchMedicine();
//   }, [id]);

//   if (!medicine) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }} className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
//       <img src={medicine.image} alt={medicine.name} className="w-full h-64 object-cover rounded-lg mb-6" />
//       <h1 className="text-3xl font-bold text-gray-800 mb-2">{medicine.name}</h1>
//       <p className="text-sm text-gray-500 mb-1">Category: {medicine.category}</p>
//       <p className="text-sm text-gray-500 mb-1">Type: {medicine.type}</p>
//       <p className="text-sm text-gray-500 mb-1">Vendor: {medicine.vendor}</p>
//       <p className="text-lg font-semibold text-gray-900 mb-2">
//         Price: ${medicine.price}{' '}
//         {medicine.originalPrice && <span className="text-gray-400 line-through ml-2">${medicine.originalPrice}</span>}
//         {medicine.discount > 0 && <span className="ml-2 text-green-500 font-medium">{medicine.discount}% OFF</span>}
//       </p>
//       <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-700 text-md mt-4">
//         {typedText}
//       </motion.p>

//       <div className='space-x-140'>
//         <button onClick={() => navigate(-1)}
//         className="mt-6 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium">
//         Back
//       </button>


//        <button onClick={() => addToCart(medicine)}
//                 className="  mt-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-3 py-2 rounded-full text-sm font-medium transition-all duration-300">
//                 Add to Cart
//               </button>
//       </div>

//     </motion.div>
//   );
// };

// export default Details;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Details = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState(null);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/medicine/${id}`);
        setMedicine(data);

        // Typing animation for details
        let index = 0;
        setTypedText('');
        const interval = setInterval(() => {
          setTypedText(prev => prev + data.details[index]);
          index++;
          if (index >= data.details.length) clearInterval(interval);
        }, 25);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMedicine();
  }, [id]);

  if (!medicine) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 sm:p-8"
    >
      <img
        src={medicine.image}
        alt={medicine.name}
        className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg mb-6"
      />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{medicine.name}</h1>

      <div className="flex flex-col sm:flex-row sm:space-x-6 text-gray-500 text-sm mb-4">
        <p>Category: {medicine.category}</p>
        <p>Type: {medicine.type}</p>
        <p>Vendor: {medicine.vendor}</p>
      </div>

      <p className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
        Price: ${medicine.price}{' '}
        {medicine.originalPrice && (
          <span className="text-gray-400 line-through ml-2">${medicine.originalPrice}</span>
        )}
        {medicine.discount > 0 && (
          <span className="ml-2 text-green-500 font-medium">{medicine.discount}% OFF</span>
        )}
      </p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-700 text-md mb-6"
      >
        {typedText}
      </motion.p>

      {/* Buttons responsive */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
        >
          Back
        </button>

        <button
          onClick={() => addToCart(medicine)}
          className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default Details;

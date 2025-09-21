// import React from 'react'
// import { 
//   FaHeartbeat, 
//   FaPills, 
//   FaLungs, 
//   FaCapsules, 
//   FaBrain, 
//   FaBone 
// } from 'react-icons/fa'

// const categories = [
//   { id: 1, name: "Cardiology", icon: <FaHeartbeat size={40} className="text-red-500" />, products: "126 products" },
//   { id: 2, name: "Diabetes", icon: <FaPills size={40} className="text-blue-500" />, products: "89 products" },
//   { id: 3, name: "Respiratory", icon: <FaLungs size={40} className="text-teal-500" />, products: "74 products" },
//   { id: 4, name: "Vitamins", icon: <FaCapsules size={40} className="text-yellow-500" />, products: "215 products" },
//   { id: 5, name: "Neurology", icon: <FaBrain size={40} className="text-purple-500" />, products: "64 products" },
//   { id: 6, name: "Orthopedics", icon: <FaBone size={40} className="text-indigo-500" />, products: "102 products" },
// ]

// const Category = () => {
//   return (
//     <section className="container mx-auto px-4 mb-12">
//       <h2 
//         className="text-3xl font-bold mb-8 relative pb-3 
//           after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 
//           after:bg-gradient-to-r after:from-blue-500 after:to-teal-500"
//         data-aos="fade-up"
//       >
//         Shop by Category
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
//         {categories.map((category, index) => (
//           <div
//             key={category.id}
//             className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl cursor-pointer"
//             data-aos="fade-up"
//             data-aos-delay={index * 100} // staggered entrance
//           >
//             <div className="p-6 text-center">
//               <div className="mb-4 animate-bounce hover:animate-pulse">
//                 {category.icon}
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
//               <p className="text-gray-500 text-sm">{category.products}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }

// export default Category




import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeartbeat,
  FaPills,
  FaLungs,
  FaCapsules,
  FaBrain,
  FaBone,
} from "react-icons/fa";

const categories = [
  { id: 1, name: "Cardiology", icon: <FaHeartbeat size={40} className="text-red-500" />, products: "126 products" },
  { id: 2, name: "Diabetes", icon: <FaPills size={40} className="text-blue-500" />, products: "89 products" },
  { id: 3, name: "Respiratory", icon: <FaLungs size={40} className="text-teal-500" />, products: "74 products" },
  { id: 4, name: "Vitamins", icon: <FaCapsules size={40} className="text-yellow-500" />, products: "215 products" },
  { id: 5, name: "Neurology", icon: <FaBrain size={40} className="text-purple-500" />, products: "64 products" },
  { id: 6, name: "Orthopedics", icon: <FaBone size={40} className="text-indigo-500" />, products: "102 products" },
];

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="container mx-auto px-4 mb-12">
      <h2
        className="text-3xl font-bold mb-8 relative pb-3 
          after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 
          after:bg-gradient-to-r after:from-blue-500 after:to-teal-500"
        data-aos="fade-up"
      >
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl cursor-pointer"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="p-6 text-center">
              <div className="mb-4 animate-bounce hover:animate-pulse">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
              <p className="text-gray-500 text-sm">{category.products}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;

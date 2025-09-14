import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";

const Shop = () => {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/medicine");
        setMedicines(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch medicines:", error);
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  const addToCart = (medicine) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === medicine._id);
      if (existing) {
        return prevCart.map((item) =>
          item._id === medicine._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...medicine, quantity: 1 }];
      }
    });
  };

  const openModal = async (medicineId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/medicine/${medicineId}`
      );
      setSelectedMedicine(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch medicine details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Animation variants for modal content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Text animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.5
      }
    })
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"
        ></motion.div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 mb-12 mt-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-center mb-8"
      >
        <h2 className="text-3xl font-bold relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-blue-500 after:to-teal-500">
          Medicine Shop
        </h2>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="mt-4 sm:mt-0 text-lg font-medium bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-full shadow-lg"
        >
          🛒 Cart: {totalItems} items
        </motion.div>
      </motion.div>

      {medicines.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">😔</div>
          <p className="text-gray-500 text-xl">No medicines available at the moment.</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-50 to-teal-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Medicine
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {medicines.map((medicine, index) => (
                  <motion.tr
                    key={medicine._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ backgroundColor: "#EFF6FF" }}
                    className="transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <motion.div 
                          whileHover={{ rotate: [0, -5, 0] }}
                          className="flex-shrink-0 h-12 w-12 mr-3"
                        >
                          <img
                            className="h-12 w-12 rounded-full object-cover border-2 border-white shadow"
                            src={medicine.image || "https://via.placeholder.com/150/3B82F6/FFFFFF?text=Medicine"}
                            alt={medicine.name}
                          />
                        </motion.div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                          <div className="text-sm text-gray-500">{medicine.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{medicine.vendor}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {medicine.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className="font-bold">${medicine.price}</span>
                        {medicine.originalPrice && medicine.originalPrice > medicine.price && (
                          <span className="text-gray-500 text-sm line-through ml-2">${medicine.originalPrice}</span>
                        )}
                        {medicine.discount > 0 && (
                          <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                            {medicine.discount}% OFF
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1, backgroundColor: "#EFF6FF" }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModal(medicine._id)}
                          className="text-blue-600 p-2 rounded-full transition-colors"
                        >
                          <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          >
                            👁️
                          </motion.span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(medicine)}
                          className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md"
                        >
                          Select
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Modal with enhanced animations */}
      <AnimatePresence>
        {isModalOpen && selectedMedicine && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {selectedMedicine.name.split("").map((letter, i) => (
                      <motion.span
                        key={i}
                        custom={i}
                        variants={letterVariants}
                        className="inline-block"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </motion.h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                  >
                    ✖️
                  </motion.button>
                </div>
                
                <motion.div 
                  className="flex flex-col md:flex-row gap-6 mb-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div 
                    variants={itemVariants}
                    className="w-full md:w-2/5"
                  >
                    <img
                      src={selectedMedicine.image || "https://via.placeholder.com/300/3B82F6/FFFFFF?text=Medicine"}
                      alt={selectedMedicine.name}
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-gray-900 text-xl">${selectedMedicine.price}</span>
                        {selectedMedicine.originalPrice && selectedMedicine.originalPrice > selectedMedicine.price && (
                          <span className="text-gray-500 text-sm line-through ml-2">
                            ${selectedMedicine.originalPrice}
                          </span>
                        )}
                      </div>
                      {selectedMedicine.discount > 0 && (
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full">
                          {selectedMedicine.discount}% OFF
                        </span>
                      )}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="w-full md:w-3/5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <motion.div variants={itemVariants}>
                        <h4 className="text-sm font-medium text-gray-500">Vendor</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedMedicine.vendor}</p>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <h4 className="text-sm font-medium text-gray-500">Category</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedMedicine.category}</p>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <h4 className="text-sm font-medium text-gray-500">Type</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedMedicine.type}</p>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <h4 className="text-sm font-medium text-gray-500">Prescription Required</h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedMedicine.prescriptionRequired ? "Yes" : "No"}
                        </p>
                      </motion.div>
                    </div>
                    
                    {selectedMedicine.details && (
                      <motion.div variants={itemVariants} className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500">Details</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedMedicine.details}</p>
                      </motion.div>
                    )}
                    
                    {selectedMedicine.description && (
                      <motion.div variants={itemVariants} className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500">Description</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedMedicine.description}</p>
                      </motion.div>
                    )}
                    
                    {selectedMedicine.dosage && (
                      <motion.div variants={itemVariants} className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500">Dosage</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedMedicine.dosage}</p>
                      </motion.div>
                    )}
                    
                    {selectedMedicine.sideEffects && (
                      <motion.div variants={itemVariants} className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500">Side Effects</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedMedicine.sideEffects}</p>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="flex justify-end gap-3 pt-4 border-t border-gray-200"
                  variants={itemVariants}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      addToCart(selectedMedicine);
                      closeModal();
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-md shadow-md hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
                  >
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeModal}
                    className="px-6 py-3 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 transition-all duration-300"
                  >
                    Go Back
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Shop;
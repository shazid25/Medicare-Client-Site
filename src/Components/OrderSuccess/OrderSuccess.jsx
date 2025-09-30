// components/OrderSuccess.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto"
      >
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/featured"
            className="block bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="block border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-full font-medium transition-all duration-300"
          >
            View Orders
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
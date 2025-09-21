import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Review = () => {
  const [currentReview, setCurrentReview] = useState(0);
  
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "The bone strength calcium tablets worked wonders for my osteoporosis. Highly recommended!",
      date: "May 15, 2023",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 2,
      name: "Michael Brown",
      rating: 4,
      comment: "Fast delivery and authentic medicines. Will definitely shop here again.",
      date: "May 14, 2023",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 3,
      name: "Emily Davis",
      rating: 5,
      comment: "The blood pressure monitor is accurate and easy to use. Great product at a reasonable price.",
      date: "May 13, 2023",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const reviewVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const [direction, setDirection] = useState(0);

  const navigateReviews = (newIndex) => {
    setDirection(newIndex > currentReview ? 1 : -1);
    setCurrentReview(newIndex);
  };

  // Star icon component since we removed lucide-react
  const Star = ({ filled }) => (
    <svg 
      className={filled ? "text-yellow-400 fill-current" : "text-gray-300"} 
      width="20" 
      height="20" 
      viewBox="0 0 24 24"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  );

  // Chevron icons
  const ChevronLeft = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  );

  const ChevronRight = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg px-3 py-1 mr-3">
          ★
        </span>
        Customer Reviews
      </h2>
      
      <div className="relative overflow-hidden h-64">
        <AnimatePresence custom={direction} mode="wait" initial={false}>
          <motion.div
            key={currentReview}
            custom={direction}
            variants={reviewVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <div className="flex flex-col items-center text-center h-full">
              <div className="flex items-center mb-4">
                <img
                  src={reviews[currentReview].image}
                  alt={reviews[currentReview].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 shadow-md"
                />
                <div className="ml-4 text-left">
                  <h3 className="font-semibold text-gray-800">{reviews[currentReview].name}</h3>
                  <p className="text-sm text-gray-500">{reviews[currentReview].date}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    filled={i < reviews[currentReview].rating}
                  />
                ))}
              </div>
              
              <p className="text-gray-600 italic mb-6 flex-1">
                "{reviews[currentReview].comment}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevReview}
          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
        >
          <ChevronLeft />
        </button>
        
        <div className="flex space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => navigateReviews(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentReview 
                  ? "bg-blue-500 w-6" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextReview}
          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Review;
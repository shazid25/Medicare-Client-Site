import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPills, FaHeartbeat, FaArrowLeft, FaMedkit, FaCapsules, FaFirstAid } from 'react-icons/fa';

const ErrorPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [floatingElements] = useState([
    { icon: FaPills, color: 'text-blue-400', size: 'text-4xl', top: '10%', left: '10%', delay: '0.5s' },
    { icon: FaHeartbeat, color: 'text-red-400', size: 'text-5xl', top: '20%', right: '20%', delay: '1s' },
    { icon: FaCapsules, color: 'text-green-400', size: 'text-3xl', top: '70%', left: '20%', delay: '1.5s' },
    { icon: FaMedkit, color: 'text-purple-400', size: 'text-4xl', bottom: '10%', right: '10%', delay: '2s' },
    { icon: FaFirstAid, color: 'text-yellow-500', size: 'text-3xl', top: '40%', left: '5%', delay: '2.5s' },
    { icon: FaPills, color: 'text-pink-400', size: 'text-4xl', bottom: '30%', right: '25%', delay: '3s' },
  ]);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 flex items-center justify-center px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, index) => {
          const Icon = element.icon;
          return (
            <div
              key={index}
              className="absolute opacity-70 animate-float"
              style={{
                top: element.top,
                left: element.left,
                right: element.right,
                bottom: element.bottom,
                animationDelay: element.delay,
              }}
            >
              <Icon className={`${element.color} ${element.size}`} />
            </div>
          );
        })}
        
        {/* Animated circles in background */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-blue-200 opacity-30 animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-16 h-16 rounded-full bg-teal-200 opacity-30 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 left-2/3 w-12 h-12 rounded-full bg-purple-200 opacity-30 animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full">
        <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <div className="md:flex">
            {/* Illustration side */}
            <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-blue-500 to-teal-500 p-10 relative">
              <div className="flex flex-col items-center justify-center h-full">
                {/* Animated medical cross */}
                <div className="relative mb-8">
                  <div className="absolute -inset-8 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
                  <div className="relative">
                    <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center animate-bounce" style={{ animationDuration: '4s' }}>
                      <div className="text-6xl text-blue-500 animate-spin" style={{ animationDuration: '8s' }}>+</div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mt-6 text-center">MediCare Pharmacy</h3>
                <p className="text-blue-100 text-center mt-2">Your health is our priority</p>
                
                {/* Animated pills */}
                <div className="absolute bottom-5 left-5 animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <FaCapsules className="text-white text-2xl" />
                </div>
                <div className="absolute top-5 right-5 animate-bounce" style={{ animationDelay: '1s' }}>
                  <FaPills className="text-white text-2xl" />
                </div>
              </div>
            </div>

            {/* Error content side */}
            <div className="w-full md:w-3/5 py-12 px-8 md:px-12">
              <div className="text-center">
                {/* Animated 404 text */}
                <div className="relative inline-block mb-4">
                  <h1 className="text-9xl font-bold text-gray-800 relative z-10">404</h1>
                  <div className="absolute -inset-4 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-200 to-teal-200 rounded-full opacity-0 hover:opacity-30 transition-opacity duration-500"></div>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in">Page Not Found</h2>
                <p className="text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Oops! The page you're looking for seems to have wandered off into the digital wilderness.
                  Let's get you back to safety.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <Link
                    to="/"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-6 rounded-full font-semibold hover:from-blue-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <FaHome className="text-lg" />
                    Go Home
                  </Link>
                  <button
                    onClick={() => window.history.back()}
                    className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaArrowLeft className="text-lg" />
                    Go Back
                  </button>
                </div>

                <div className="mt-10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <p className="text-gray-500 mb-4">While you're here, check out our popular categories:</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {['Medicines', 'Vitamins', 'Skincare', 'First Aid', 'COVID Essentials', 'Supplements'].map((category, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                        style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-200 opacity-30 animate-pulse"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-teal-200 opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(3deg);
          }
          66% {
            transform: translateY(5px) rotate(-3deg);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;
import React, { useEffect, useState } from 'react';
import bannerImage from "../../assets/banner1.jpg"
const Banner = () => {
  const [medicineNames, setMedicineNames] = useState([]);

  useEffect(() => {
    const names = [
      "Paracetamol", "Ibuprofen", "Aspirin", "Amoxicillin", "Metformin",
      "Insulin", "Vitamin C", "Vitamin D", "Omeprazole", "Atorvastatin",
      "Cardiology", "Diabetes", "Pain Relief", "Antibiotics", "Vitamins",
      "Supplements", "Skincare", "First Aid", "Respiratory", "Antihistamines"
    ];
    
    const elements = [];
    for (let i = 0; i < 25; i++) {
      elements.push({
        id: i,
        name: names[Math.floor(Math.random() * names.length)],
        top: Math.random() * 100,
        left: Math.random() * 100,
        animationDuration: (15 + Math.random() * 20),
        animationDelay: Math.random() * 5,
        fontSize: 0.8 + Math.random() * 1.2,
        opacity: 0.1 + Math.random() * 0.2
      });
    }
    setMedicineNames(elements);
  }, []);

  return (
    <div
      className="relative text-white py-16 md:py-24 rounded-b-3xl overflow-hidden mb-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      {/* Overlay gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-teal-400/80 z-0"></div> */}
             <div className="absolute"></div>
      {/* Floating medicine names */}
      <div className="absolute inset-0 z-10">
        {medicineNames.map(medicine => (
          <div
            key={medicine.id}
            className="absolute text-black font-semibold opacity-20 select-none"
            style={{
              top: `${medicine.top}%`,
              left: `${medicine.left}%`,
              fontSize: `${medicine.fontSize}rem`,
              animation: `floatMedicine ${medicine.animationDuration}s linear ${medicine.animationDelay}s infinite`
            }}
          >
            {medicine.name}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center text-shadow-gray-500">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down">
            Your Health is Our Priority
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Get genuine medicines delivered to your doorstep from verified vendors
          </p>
          
          {/* Search bar */}
          <div className="max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="flex flex-col sm:flex-row items-center rounded-full overflow-hidden shadow-lg bg-white bg-opacity-20 backdrop-blur-sm">
              <input
                type="text"
                placeholder="Search medicines, brands, categories..."
                className="flex-grow px-6 py-4 text-gray-800 focus:outline-none"
              />
              <button className=" text-black bg-amber-200 hover:bg-amber-600 px-6 py-4 font-semibold transition-colors duration-300 w-full sm:w-auto">
                Search
              </button>
            </div>
          </div>
          
          {/* Popular categories */}
          <div className="mt-8 text-black flex flex-wrap justify-center gap-2 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            {['Paracetamol', 'Diabetes', 'Cardiology', 'Vitamins', 'Skincare'].map((category, index) => (
              <span
                key={index}
                className="bg-gray-300 bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes floatMedicine {
          0% {
            transform: translateY(100vh) rotate(0deg);
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
          }
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;

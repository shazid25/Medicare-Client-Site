// import React, { useEffect, useState } from 'react';
// import bannerImage from "../../assets/banner1.jpg"
// const Banner = () => {
//   const [medicineNames, setMedicineNames] = useState([]);

//   useEffect(() => {
//     const names = [
//       "Paracetamol", "Ibuprofen", "Aspirin", "Amoxicillin", "Metformin",
//       "Insulin", "Vitamin C", "Vitamin D", "Omeprazole", "Atorvastatin",
//       "Cardiology", "Diabetes", "Pain Relief", "Antibiotics", "Vitamins",
//       "Supplements", "Skincare", "First Aid", "Respiratory", "Antihistamines"
//     ];
    
//     const elements = [];
//     for (let i = 0; i < 25; i++) {
//       elements.push({
//         id: i,
//         name: names[Math.floor(Math.random() * names.length)],
//         top: Math.random() * 100,
//         left: Math.random() * 100,
//         animationDuration: (15 + Math.random() * 20),
//         animationDelay: Math.random() * 5,
//         fontSize: 0.8 + Math.random() * 1.2,
//         opacity: 0.1 + Math.random() * 0.2
//       });
//     }
//     setMedicineNames(elements);
//   }, []);

//   return (
//     <div
//       className="relative text-white py-16 md:py-24 rounded-b-3xl overflow-hidden mb-8 bg-cover bg-center"
//       style={{
//         backgroundImage: `url(${bannerImage})`,
//       }}
//     >
//       {/* Overlay gradient */}
//       {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-teal-400/80 z-0"></div> */}
//              <div className="absolute"></div>
//       {/* Floating medicine names */}
//       <div className="absolute inset-0 z-10">
//         {medicineNames.map(medicine => (
//           <div
//             key={medicine.id}
//             className="absolute text-black font-semibold opacity-20 select-none"
//             style={{
//               top: `${medicine.top}%`,
//               left: `${medicine.left}%`,
//               fontSize: `${medicine.fontSize}rem`,
//               animation: `floatMedicine ${medicine.animationDuration}s linear ${medicine.animationDelay}s infinite`
//             }}
//           >
//             {medicine.name}
//           </div>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="container mx-auto px-4 relative z-20">
//         <div className="text-center text-black text-shadow-gray-500">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down">
//             Your Health is Our Priority
//           </h1>
//           <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in-up">
//             Get genuine medicines delivered to your doorstep from verified vendors
//           </p>
          
//           {/* Search bar */}
//           <div className="max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.4s'}}>
//             <div className="flex flex-col sm:flex-row items-center rounded-full overflow-hidden shadow-lg bg-white bg-opacity-20 backdrop-blur-sm">
//               <input
//                 type="text"
//                 placeholder="Search medicines, brands, categories..."
//                 className="flex-grow px-6 py-4 text-gray-800 focus:outline-none"
//               />
//               <button className=" text-black bg-amber-200 hover:bg-amber-600 px-6 py-4 font-semibold transition-colors duration-300 w-full sm:w-auto">
//                 Search
//               </button>
//             </div>
//           </div>
          
//           {/* Popular categories */}
//           <div className="mt-8 text-black flex flex-wrap justify-center gap-2 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
//             {['Paracetamol', 'Diabetes', 'Cardiology', 'Vitamins', 'Skincare'].map((category, index) => (
//               <span
//                 key={index}
//                 className="bg-gray-300 bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium"
//               >
//                 {category}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Custom styles for animations */}
//       <style jsx>{`
//         @keyframes floatMedicine {
//           0% {
//             transform: translateY(100vh) rotate(0deg);
//           }
//           100% {
//             transform: translateY(-100px) rotate(360deg);
//           }
//         }
        
//         .animate-fade-in-down {
//           animation: fadeInDown 1s ease-out;
//         }
        
//         .animate-fade-in-up {
//           animation: fadeInUp 1s ease-out;
//           opacity: 0;
//           animation-fill-mode: forwards;
//         }
        
//         @keyframes fadeInDown {
//           0% {
//             opacity: 0;
//             transform: translateY(-30px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes fadeInUp {
//           0% {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Banner;







import React, { useEffect, useState } from 'react';
import bannerImage from "../../assets/banner1.jpg"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const [medicineNames, setMedicineNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false); // Loading state
  const [searchError, setSearchError] = useState(''); // Error state
  const navigate = useNavigate();

  // ... (Your existing floating names useEffect code remains the same)

  // Enhanced search function with error handling
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchError('Please enter a medicine name or category.');
      return;
    }

    setIsSearching(true);
    setSearchError('');
    setShowSuggestions(false);

    try {
      // Replace with your actual search API endpoint
      const response = await axios.get(`https://medicare-sever-site.vercel.app/medicines/search?q=${encodeURIComponent(searchQuery)}`);
      
      // Navigate to results page with data
      navigate('/search-results', { 
        state: { 
          results: response.data,
          query: searchQuery 
        }
      });
      
    } catch (error) {
      console.error('Search API Error:', error);
      // Set user-friendly error message
      if (!error.response) {
        setSearchError('Network error. Please check your connection and try again.');
      } else if (error.response.status >= 500) {
        setSearchError('Our search service is temporarily unavailable. Please try again shortly.');
      } else {
        setSearchError('Error searching for medicines. Please try again.');
      }
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div
      className="relative text-white py-16 md:py-24 rounded-b-3xl overflow-hidden mb-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      {/* ... (Your existing overlay and floating names JSX remains the same) ... */}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center text-black text-shadow-gray-500">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down">
            Your Health is Our Priority
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Get genuine medicines delivered to your doorstep from verified vendors
          </p>
          
          {/* Search bar with error display */}
          <div className="max-w-2xl mx-auto animate-fade-in-up relative" style={{animationDelay: '0.4s'}}>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center rounded-full overflow-hidden shadow-lg bg-white bg-opacity-20 backdrop-blur-sm">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search medicines, brands, categories..."
                  className="w-full px-6 py-4 text-gray-800 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchError(''); // Clear error when user starts typing
                  }}
                  disabled={isSearching}
                />
              </div>
              <button 
                type="submit"
                className="text-black bg-amber-200 hover:bg-amber-600 px-6 py-4 font-semibold transition-colors duration-300 w-full sm:w-auto flex items-center justify-center"
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : 'Search'}
              </button>
            </form>
            
            {/* Display error message to user */}
            {searchError && (
              <div className="mt-2 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                ⚠️ {searchError}
              </div>
            )}
          </div>
          
          {/* Popular categories */}
          <div className="mt-8 text-black flex flex-wrap justify-center gap-2 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            {['Paracetamol', 'Diabetes', 'Cardiology', 'Vitamins', 'Skincare'].map((category, index) => (
              <span
                key={index}
                className="bg-gray-300 bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-opacity-30"
                onClick={() => setSearchQuery(category)}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ... (Your existing style tags remain the same) ... */}
    </div>
  );
};

export default Banner;
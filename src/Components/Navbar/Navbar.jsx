// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaGlobe } from "react-icons/fa";
// import { AuthContext } from "../../contexts/AuthContext/AuthProvider";

// const Navbar = () => {
//   const [language, setLanguage] = useState("EN"); // default language
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const { user, logoutUser } = useContext(AuthContext); // get user info
//   const navigate = useNavigate();

//   const labels = {
//     EN: { home: "Home", shop: "Shop", join: "Join Us", cart: "Cart", logout: "Logout", profile: "Profile" },
//     BN: { home: "হোম", shop: "দোকান", join: "যোগদান করুন", cart: "কার্ট", logout: "লগআউট", profile: "প্রোফাইল" },
//   };

//   const toggleLanguage = () => {
//     setLanguage(language === "EN" ? "BN" : "EN");
//   };

//   const handleLogout = async () => {
//     try {
//       await logoutUser();
//       navigate("/login");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <nav className="bg-blue-100 rounded-2xl shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <span className="text-2xl font-bold text-blue-600">💊 MediCare</span>
//           </Link>

//           {/* Hamburger Menu (Mobile) */}
//           <button className="md:hidden p-2 border rounded-lg text-gray-600 hover:bg-gray-100">
//             <span className="text-xl">&#9776;</span>
//           </button>

//           {/* Desktop Links */}
//           <div className="hidden md:flex space-x-6 items-center">
//             <Link to="/" className="hover:text-blue-600 font-medium">{labels[language].home}</Link>
//             <Link to="/shop" className="hover:text-blue-600 font-medium">{labels[language].shop}</Link>

//             {/* Cart icon */}
//             <button className="relative p-2 border rounded-lg hover:bg-gray-100">
//               <FaShoppingCart />
//               <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full">0</span>
//             </button>

//             {/* Language Toggle */}
//             <button
//               onClick={toggleLanguage}
//               className="flex items-center p-2 border rounded-lg hover:bg-gray-100"
//             >
//               <FaGlobe className="mr-1" /> {language === "EN" ? "EN" : "বাংলা"}
//             </button>

//             {/* Conditional: Logged in / Not Logged in */}
//             {user ? (
//               <div className="relative">
//                 <img
//                   src={user.photoURL || "/default-profile.png"}
//                   alt="Profile"
//                   className="w-10 h-10 rounded-full cursor-pointer"
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                 />
//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl py-2 w-48">
//                     <Link
//                       to="/profile"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       Update Profile
//                     </Link>
//                     <Link
//                       to="/dashboard"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       Dashboard
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                     >
//                       {labels[language].logout}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="ml-2 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 {labels[language].join}
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div className="md:hidden px-4 py-2 space-y-2 bg-white shadow-lg">
//         <Link to="/" className="block hover:text-blue-600">{labels[language].home}</Link>
//         <Link to="/shop" className="block hover:text-blue-600">{labels[language].shop}</Link>

//         {/* Cart icon */}
//         <button className="relative p-2 border rounded-lg hover:bg-gray-100 w-full text-left">
//           <FaShoppingCart /> {labels[language].cart}
//           <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full">0</span>
//         </button>

//         {/* Language Toggle */}
//         <button
//           onClick={toggleLanguage}
//           className="flex items-center p-2 border rounded-lg hover:bg-gray-100 w-full"
//         >
//           <FaGlobe className="mr-1" /> {language === "EN" ? "EN" : "বাংলা"}
//         </button>

//         {/* Conditional: Mobile */}
//         {user ? (
//           <>
//             <Link
//               to="/profile"
//               className="block text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//             >
//               Update Profile
//             </Link>
//             <Link
//               to="/dashboard"
//               className="block text-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
//             >
//               Dashboard
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="block w-full text-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//             >
//               {labels[language].logout}
//             </button>
//           </>
//         ) : (
//           <Link
//             to="/login"
//             className="block text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             {labels[language].join}
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaGlobe } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";

const Navbar = () => {
  const [language, setLanguage] = useState("EN");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const labels = {
    EN: { home: "Home", shop: "Shop", join: "Join Us", cart: "Cart", logout: "Logout", profile: "Profile" },
    BN: { home: "হোম", shop: "দোকান", join: "যোগদান করুন", cart: "কার্ট", logout: "লগআউট", profile: "প্রোফাইল" },
  };

  const toggleLanguage = () => setLanguage(language === "EN" ? "BN" : "EN");

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <nav className="bg-blue-100 rounded-2xl shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">💊 MediCare</span>
          </Link>

          {/* Hamburger Menu (Mobile) */}
          <button
            className="md:hidden p-2 border rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="text-xl">&#9776;</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-blue-600 font-medium">{labels[language].home}</Link>
            <Link to="/shop" className="hover:text-blue-600 font-medium">{labels[language].shop}</Link>

            {/* Cart icon */}
            <button className="relative p-2 border rounded-lg hover:bg-gray-100">
              <FaShoppingCart />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full">0</span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center p-2 border rounded-lg hover:bg-gray-100"
            >
              <FaGlobe className="mr-1" /> {language === "EN" ? "EN" : "বাংলা"}
            </button>

            {/* Conditional: Logged in / Not Logged in */}
            {user ? (
              <div className="relative">
                <img
                  src={user.photoURL || "/default-profile.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                />
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-2 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {labels[language].join}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu: Everything inside Hamburger */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-4 space-y-2 bg-white shadow-lg">
          <Link to="/" className="block hover:text-blue-600">{labels[language].home}</Link>
          <Link to="/shop" className="block hover:text-blue-600">{labels[language].shop}</Link>

          {/* Cart icon */}
          <button className="relative p-2 border rounded-lg hover:bg-gray-100 w-full text-left">
            <FaShoppingCart /> {labels[language].cart}
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full">0</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center p-2 border rounded-lg hover:bg-gray-100 w-full"
          >
            <FaGlobe className="mr-1" /> {language === "EN" ? "EN" : "বাংলা"}
          </button>

          {/* User Options */}
          {user ? (
            <>
              <Link
                to="/profile"
                className="block text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Update Profile
              </Link>
              <Link
                to="/dashboard"
                className="block text-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                {labels[language].logout}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {labels[language].join}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

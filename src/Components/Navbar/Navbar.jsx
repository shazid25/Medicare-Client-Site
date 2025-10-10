import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaGlobe, FaBars, FaTimes, FaUser, FaUserShield, FaStore } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { useUserRole } from "../../hooks/useUserRole"; // Import the hook

const Navbar = () => {
  const [language, setLanguage] = useState("EN");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const { userRole, loading: roleLoading } = useUserRole(); // Get user role
  const navigate = useNavigate();

  const labels = {
    EN: { 
      home: "Home", 
      shop: "Shop", 
      join: "Join Us", 
      cart: "Cart", 
      logout: "Logout", 
      profile: "Profile",
      dashboard: "Dashboard",
      adminDashboard: "Admin Dashboard",
      sellerDashboard: "Seller Dashboard",
      userDashboard: "My Account"
    },
    BN: { 
      home: "হোম", 
      shop: "দোকান", 
      join: "যোগদান করুন", 
      cart: "কার্ট", 
      logout: "লগআউট", 
      profile: "প্রোফাইল",
      dashboard: "ড্যাশবোর্ড",
      adminDashboard: "অ্যাডমিন ড্যাশবোর্ড",
      sellerDashboard: "বিক্রেতা ড্যাশবোর্ড", 
      userDashboard: "আমার অ্যাকাউন্ট"
    },
  };

  const toggleLanguage = () => setLanguage(language === "EN" ? "BN" : "EN");

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
      setDropdownOpen(false);
      setMobileMenuOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  // Get dashboard link based on user role
  const getDashboardLink = () => {
    if (!userRole) return "/dashboard";

    switch (userRole.role) {
      case "admin":
        return "/dashboard/admin";
      case "seller":
        return "/dashboard/seller";
      default:
        return "/dashboard/user";
    }
  };

  // Get dashboard label based on user role
  const getDashboardLabel = () => {
    if (!userRole) return labels[language].dashboard;

    switch (userRole.role) {
      case "admin":
        return labels[language].adminDashboard;
      case "seller":
        return labels[language].sellerDashboard;
      default:
        return labels[language].userDashboard;
    }
  };

  // Get role icon
  const getRoleIcon = () => {
    if (!userRole) return <FaUser />;

    switch (userRole.role) {
      case "admin":
        return <FaUserShield className="text-red-500" />;
      case "seller":
        return <FaStore className="text-green-500" />;
      default:
        return <FaUser className="text-blue-500" />;
    }
  };

  // Show loading while checking role
  if (roleLoading && user) {
    return (
      <nav className="bg-blue-100 rounded-2xl shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">💊 MediCare</span>
            </Link>
            <div className="text-gray-600">Loading...</div>
          </div>
        </div>
      </nav>
    );
  }

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
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="hover:text-blue-600 font-medium">{labels[language].home}</Link>
            <Link to="/shop" className="hover:text-blue-600 font-medium">{labels[language].shop}</Link>

            {/* Cart */}
            <button className="relative p-2 border rounded-lg hover:bg-gray-100">
              <FaShoppingCart />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full">0</span>
            </button>

            {/* Language Toggle */}
            <button onClick={toggleLanguage} className="flex items-center p-2 border rounded-lg hover:bg-gray-100">
              <FaGlobe className="mr-1" /> {language === "EN" ? "EN" : "বাংলা"}
            </button>

            {/* Profile Dropdown */}
            {user ? (
              <div className="relative">
                <div className="flex items-center space-x-2">
                  {getRoleIcon()}
                  <img
                    src={user.photoURL || "/default-profile.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl py-2 w-48 border">
                    <div className="px-4 py-2 border-b">
                      <p className="font-semibold text-sm">{user.displayName || userRole?.name || user.email}</p>
                      <p className="text-xs text-gray-600 capitalize">{userRole?.role || 'user'}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaUser className="mr-2" /> {labels[language].profile}
                    </Link>
                    <Link 
                      to={getDashboardLink()} 
                      className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {getRoleIcon()} <span className="ml-2">{getDashboardLabel()}</span>
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                    >
                      {labels[language].logout}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                {labels[language].join}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-4 space-y-3 bg-white shadow-lg border-t">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block py-2 hover:text-blue-600 border-b"
          >
            {labels[language].home}
          </Link>
          <Link 
            to="/shop" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block py-2 hover:text-blue-600 border-b"
          >
            {labels[language].shop}
          </Link>

          <button className="relative p-2 border rounded-lg hover:bg-gray-100 w-full text-left flex items-center">
            <FaShoppingCart className="mr-2" /> {labels[language].cart}
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full">0</span>
          </button>

          <button onClick={toggleLanguage} className="flex items-center p-2 border rounded-lg hover:bg-gray-100 w-full">
            <FaGlobe className="mr-2" /> {language === "EN" ? "English" : "বাংলা"}
          </button>

          {user ? (
            <div className="space-y-2">
              <div className="p-2 bg-gray-100 rounded-lg">
                <p className="font-semibold">{user.displayName || userRole?.name || user.email}</p>
                <p className="text-sm text-gray-600 capitalize">Role: {userRole?.role || 'user'}</p>
              </div>
              <Link 
                to="/profile" 
                onClick={() => setMobileMenuOpen(false)} 
                className="block text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <FaUser className="inline mr-2" /> {labels[language].profile}
              </Link>
              <Link 
                to={getDashboardLink()} 
                onClick={() => setMobileMenuOpen(false)} 
                className="block text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {getDashboardLabel()}
              </Link>
              <button 
                onClick={handleLogout} 
                className="block w-full text-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                {labels[language].logout}
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
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



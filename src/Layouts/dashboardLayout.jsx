// // src/Layouts/DashboardLayout.jsx
// import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext/AuthProvider";

// const DashboardLayout = () => {
//   const { userRole } = useContext(AuthContext);
//   const location = useLocation();

//   // Redirect to appropriate dashboard based on role
//   if (location.pathname === "/dashboard") {
//     if (userRole?.role === "admin") {
//       return <Navigate to="/dashboard/admin" replace />;
//     } else if (userRole?.role === "seller") {
//       return <Navigate to="/dashboard/seller/manage-medicines" replace />;
//     } else {
//       return <Navigate to="/dashboard/user" replace />;
//     }
//   }

//   const getRoleIcon = () => {
//     switch (userRole?.role) {
//       case "admin": return "👑";
//       case "seller": return "🏪";
//       default: return "👤";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-lg">
//         <div className="p-4 border-b">
//           <h2 className="text-xl font-bold">Dash</h2>
//           <div className="flex items-center mt-2 text-sm text-gray-600">
//             <span className="mr-2">{getRoleIcon()}</span>
//             <span className="capitalize">{userRole?.role || 'user'}</span>
//           </div>
//         </div>
        
//         <nav className="p-4">
//           <ul className="space-y-2">
//             {/* Admin Navigation */}
//             {userRole?.role === "admin" && (
//               <>
//                 <li>
//                   <Link 
//                     to="/dashboard/admin" 
//                     className="block p-2 rounded hover:bg-blue-50 text-blue-600"
//                   >
//                     Admin Overview
//                   </Link>
//                 </li>
//                 <li>
//                   <Link 
//                     to="/dashboard/admin/seller-applications" 
//                     className="block p-2 rounded hover:bg-blue-50"
//                   >
//                     Seller Applications
//                   </Link>
//                 </li>
//               </>
//             )}

//             {/* Seller Navigation */}
//             {(userRole?.role === "seller" || userRole?.role === "admin") && (
//               <>
//                 <li>
//                   <Link 
//                     to="/dashboard/seller/manage-medicines" 
//                     className="block p-2 rounded hover:bg-green-50"
//                   >
//                     Manage Medicines
//                   </Link>
//                 </li>
//                 <li>
//                   <Link 
//                     to="/dashboard/seller/seller-form" 
//                     className="block p-2 rounded hover:bg-green-50"
//                   >
//                     Add Medicine
//                   </Link>
//                 </li>
//               </>
//             )}

//             {/* User Navigation (all authenticated users) */}
//             <li>
//               <Link 
//                 to="/dashboard/user" 
//                 className="block p-2 rounded hover:bg-gray-100"
//               >
//                 My Account
//               </Link>
//             </li>
//             <li>
//               <Link 
//                 to="/dashboard/user/be-seller" 
//                 className="block p-2 rounded hover:bg-gray-100"
//               >
//                 Become a Seller
//               </Link>
//             </li>

//             {/* Back to main site */}
//             <li className="border-t mt-4 pt-4">
//               <Link 
//                 to="/" 
//                 className="block p-2 rounded hover:bg-gray-100 text-gray-600"
//               >
//                 ← Back to Site
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 p-6">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      {/* Render the dashboard routes */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default DashboardLayout;

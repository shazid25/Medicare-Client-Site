// // components/MainDashboard.js
// import React from 'react';
// import { Link, Outlet } from 'react-router-dom';

// const MainDashboard = () => {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-blue-800 text-white">
//         <div className="p-4 border-b border-blue-700">
//           <h1 className="text-xl font-bold">MediCare Dashboard</h1>
//         </div>

//         <nav className="p-4">
//           <ul className="space-y-2">
//             <li>
//               <Link
//                 to="/dashboard"
//                 className="flex items-center p-2 rounded-lg hover:bg-blue-700"
//               >
//                 <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
//                 </svg>
//                 Dashboard
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/dashboard/sellerForm"
//                 className="flex items-center p-2 rounded-lg hover:bg-blue-700"
//               >
//                 <svg
//                   className="w-5 h-5 mr-3"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 4v16m8-8H4"
//                   />
//                 </svg>
//                 Click to Sell
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/dashboard/sellerApplication"
//                 className="flex items-center p-2 rounded-lg hover:bg-blue-700"
//               >
//                 <svg
//                   className="w-5 h-5 mr-3"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l5 5v12a2 2 0 01-2 2z"
//                   />
//                 </svg>
//                 Seller Application
//               </Link>
//             </li>



//             <li>
//               <Link
//                 to="/dashboard/beSeller"
//                 className="flex items-center p-2 rounded-lg hover:bg-blue-700"
//               >
//                 <svg
//                   className="w-5 h-5 mr-3"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M3 7h18M3 12h18M3 17h18M9 7v10M15 7v10"
//                   />
//                 </svg>
//                 Be a Seller
//               </Link>
//             </li>



//             <li>
//               <a href="#" className="flex items-center p-2 rounded-lg hover:bg-blue-700">
//                 <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
//                 </svg>
//                 Orders
//               </a>
//             </li>
//             <li>
//               <a href="#" className="flex items-center p-2 rounded-lg hover:bg-blue-700">
//                 <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
//                 </svg>
//                 Customers
//               </a>
//             </li>

//             <li>
//               <Link
//                 to="/dashboard/manageMedicines"
//                 className="flex items-center p-2 rounded-lg hover:bg-blue-700"
//               >
//                 <svg
//                   className="w-5 h-5 mr-3"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
//                   />
//                 </svg>
//                 My Posted Medicine
//               </Link>
//             </li>

//             <li>
//               <a href="#" className="flex items-center p-2 rounded-lg hover:bg-blue-700">
//                 <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
//                 </svg>
//                 Reports
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default MainDashboard;





// src/Dashboards/MainDashboard/MainDashboard.jsx
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { Link } from "react-router-dom";

const MainDashboard = () => {
  const { userRole } = useContext(AuthContext);

  const dashboardCards = {
    admin: [
      {
        title: "Seller Applications",
        description: "Review and manage seller applications",
        link: "/dashboard/admin/seller-applications",
        icon: "📋",
        color: "bg-blue-100"
      },
      {
        title: "User Management",
        description: "Manage users and roles",
        link: "/dashboard/admin/users",
        icon: "👥",
        color: "bg-green-100"
      }
    ],
    seller: [
      {
        title: "Manage Medicines",
        description: "View and edit your medicines",
        link: "/dashboard/seller/manage-medicines",
        icon: "💊",
        color: "bg-purple-100"
      },
      {
        title: "Add New Medicine",
        description: "Post a new medicine to marketplace",
        link: "/dashboard/seller/seller-form",
        icon: "➕",
        color: "bg-orange-100"
      }
    ],
    user: [
      {
        title: "My Profile",
        description: "Update your personal information",
        link: "/dashboard/user/profile",
        icon: "👤",
        color: "bg-gray-100"
      },
      {
        title: "Become a Seller",
        description: "Apply to sell medicines",
        link: "/dashboard/user/be-seller",
        icon: "🏪",
        color: "bg-yellow-100"
      }
    ]
  };

  const cards = dashboardCards[userRole?.role || 'user'];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to your Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Role: <span className="capitalize font-medium">{userRole?.role || 'user'}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="block p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className={`${card.color} w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4`}>
              {card.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {card.title}
            </h3>
            <p className="text-gray-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainDashboard;
// import React, { useEffect, useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import useAxiosSecure from '../../hooks/useAxiosSecure'; // Adjust path as needed

// const MainDashboard = () => {
//   const { axiosSecure } = useAxiosSecure();
//   const [userRole, setUserRole] = useState('user');
//   const [userEmail, setUserEmail] = useState('');
//   const [loading, setLoading] = useState(true);

//   // Fetch user role on component mount
//   useEffect(() => {
//     const fetchUserRole = async () => {
//       try {
//         const response = await axiosSecure.get('/users/me/role');
//         if (response.data.success) {
//           setUserRole(response.data.role);
//           setUserEmail(response.data.email);
//         }
//       } catch (error) {
//         console.error('Error fetching user role:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserRole();
//   }, [axiosSecure]);

//   if (loading) {
//     return (
//       <div className="flex h-screen bg-gray-100 items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-blue-800 text-white">
//         <div className="p-4 border-b border-blue-700">
//           <h1 className="text-xl font-bold">MediCare Dashboard</h1>
//           <p className="text-sm text-blue-200 mt-1 capitalize">
//             Role: {userRole} • {userEmail}
//           </p>
//         </div>

//         <nav className="p-4">
//           <ul className="space-y-2">
//             {/* Common for all roles */}
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

//             {/* For SELLER role only */}
//             {userRole === 'seller' && (
//               <>
//                 <li>
//                   <Link
//                     to="/dashboard/sellerForm"
//                     className="flex items-center p-2 rounded-lg hover:bg-blue-700"
//                   >
//                     <svg
//                       className="w-5 h-5 mr-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M12 4v16m8-8H4"
//                       />
//                     </svg>
//                     Click to Sell
//                   </Link>
//                 </li>

//                 <li>
//                   <a href="#" className="flex items-center p-2 rounded-lg hover:bg-blue-700">
//                     <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
//                     </svg>
//                     Orders
//                   </a>
//                 </li>

//                 <li>
//                   <Link
//                     to="/dashboard/manageMedicines"
//                     className="flex items-center p-2 rounded-lg hover:bg-blue-700"
//                   >
//                     <svg
//                       className="w-5 h-5 mr-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
//                       />
//                     </svg>
//                     My Posted Medicine
//                   </Link>
//                 </li>

//                 <li>
//                   <a href="#" className="flex items-center p-2 rounded-lg hover:bg-blue-700">
//                     <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
//                     </svg>
//                     Reports
//                   </a>
//                 </li>
//               </>
//             )}

//             {/* For USER role only */}
//             {userRole === 'user' && (
//               <>
//                 <li>
//                   <Link
//                     to="/dashboard/beSeller"
//                     className="flex items-center p-2 rounded-lg hover:bg-blue-700"
//                   >
//                     <svg
//                       className="w-5 h-5 mr-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 7h18M3 12h18M3 17h18M9 7v10M15 7v10"
//                       />
//                     </svg>
//                     Be a Seller
//                   </Link>
//                 </li>

//                 <li>
//                   <Link
//                     to="/dashboard/transaction"
//                     className="flex items-center p-2 rounded-lg hover:bg-blue-700"
//                   >
//                     <svg
//                       className="w-5 h-5 mr-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V4m0 16v-4m9-4a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                     Transaction History
//                   </Link>
//                 </li>
//               </>
//             )}

//             {/* For ADMIN role only */}
//             {userRole === 'admin' && (
//               <>
//                 <li>
//                   <Link
//                     to="/dashboard/sellerApplication"
//                     className="flex items-center p-2 rounded-lg hover:bg-blue-700"
//                   >
//                     <svg
//                       className="w-5 h-5 mr-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l5 5v12a2 2 0 01-2 2z"
//                       />
//                     </svg>
//                     Seller Application
//                   </Link>
//                 </li>

//                 <li>
//                   <Link
//                     to="/dashboard/editBanner"
//                     className="flex items-center p-2 rounded-lg hover:bg-blue-700"
//                   >
//                     <svg
//                       className="w-5 h-5 mr-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M15.232 5.232l3.536 3.536M9 11l6 6H3v-6l6-6z"
//                       />
//                     </svg>
//                     Edit Banner
//                   </Link>
//                 </li>
//               </>
//             )}
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








import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useAuth } from '../../contexts/AuthContext/AuthProvider';

const MainDashboard = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [userRole, setUserRole] = useState('user');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user role on component mount
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axiosSecure.get('/users/me/role');
        console.log('User role response:', response.data);
        
        if (response.data.success) {
          setUserRole(response.data.data.role);
          setUserEmail(response.data.data.email);
        } else {
          setError('Failed to fetch user role');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setError('Error fetching user information');
        
        // If unauthorized, redirect to login
        if (error.response?.status === 401 || error.response?.status === 403) {
          await logout();
          navigate('/auth/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [axiosSecure, navigate, logout]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white flex flex-col">
        <div className="p-4 border-b border-blue-700">
          <h1 className="text-xl font-bold">MediCare Dashboard</h1>
          <p className="text-sm text-blue-200 mt-1 capitalize">
            Role: {userRole} • {userEmail}
          </p>
        </div>

        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            {/* Common for all roles */}
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Dashboard
              </Link>
            </li>

            {/* For SELLER role only */}
            {userRole === 'seller' && (
              <>
                <li>
                  <Link
                    to="/dashboard/sellerForm"
                    className="flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Click to Sell
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/orders"
                    className="flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    Orders
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/manageMedicines"
                    className="flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    My Posted Medicine
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/reports"
                    className="flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    Reports
                  </Link>
                </li>
              </>
            )}

            {/* For USER role only */}
            {userRole === 'user' && (
              <>
                <li>
                  <Link
                    to="/dashboard/beSeller"
                    className="flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7h18M3 12h18M3 17h18M9 7v10M15 7v10"
                      />
                    </svg>
                    Be a Seller
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/transaction"
                    className="flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V4m0 16v-4m9-4a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Transaction History
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/myOrders"
                    className="flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    My Orders
                  </Link>
                </li>
              </>
            )}

            {/* For ADMIN role only */}
            {userRole === 'admin' && (
              <>
                <li>
                  <Link
                    to="/dashboard/sellerApplication"
                    className="flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l5 5v12a2 2 0 01-2 2z"
                      />
                    </svg>
                    Seller Applications
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/manageUsers"
                    className="flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                    Manage Users
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/editBanner"
                    className="flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536M9 11l6 6H3v-6l6-6z"
                      />
                    </svg>
                    Edit Banner
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-2 rounded-lg hover:bg-blue-700 transition-colors text-red-200 hover:text-white"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 capitalize">
              Welcome, {userRole} Dashboard
            </h1>
            <p className="text-gray-600">
              You are logged in as: <span className="font-semibold">{userEmail}</span>
            </p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
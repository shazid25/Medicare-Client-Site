// import React, { useContext } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../../contexts/AuthContext/AuthProvider";

// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);
//   const location = useLocation();

//   if (loading) {
//     return <p>Loading...</p>; // can replace with spinner
//   }

//   if (!user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default PrivateRoute;



// src/Components/PrivateRoutes/PrivateRoutes.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user, userRole } = useContext(AuthContext);
  const location = useLocation();

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified, check if user has required role
  if (allowedRoles.length > 0) {
    const hasRequiredRole = userRole && allowedRoles.includes(userRole.role);
    
    if (!hasRequiredRole) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
            <p className="text-gray-600">
              You don't have permission to access this page.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Required roles: {allowedRoles.join(", ")}
            </p>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default PrivateRoute;
// import { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext/AuthProvider';
// import axios from 'axios';

// export const useUserRole = () => {
//   const { user } = useContext(AuthContext);
//   const [userRole, setUserRole] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       if (!user) {
//         setUserRole(null);
//         setLoading(false);
//         return;
//       }

//       try {
//         const token = await user.getIdToken();
//         const response = await axios.get('http://localhost:3000/users/me/role', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
        
//         setUserRole(response.data);
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching user role:', err);
//         setError(err.response?.data?.message || 'Failed to fetch user role');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserRole();
//   }, [user]);

//   return { userRole, loading, error };
// };






// import { useEffect, useState } from "react";
// import { useAuth } from "../contexts/AuthContext/AuthProvider";
// import axios from "axios";

// const useUserRole = () => {
//   const { user } = useAuth();
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     const fetchRole = async () => {
//       if (user?.email) {
//         try {
//           const res = await axios.get(
//             `http://localhost:3000/users/role/${user.email}`
//           );
//           setRole(res.data.role);
//         } catch (err) {
//           console.error("Error fetching role:", err.message);
//         }
//       }
//     };
//     fetchRole();
//   }, [user]);

//   return role;
// };

// export default useUserRole;





// src/hooks/useUserRole.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext/AuthProvider";
import axios from "axios";

export const useUserRole = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setRoleLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/users/role?email=${user.email}`);
        setRole(res.data.role); // Example: "admin" or "user"
      } catch (err) {
        setRole(null);
      } finally {
        setRoleLoading(false);
      }
    };

    fetchRole();
  }, [user]);

  return { role, roleLoading };
};

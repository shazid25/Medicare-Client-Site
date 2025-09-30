


// // // src/hooks/useUserRole.jsx
// // import { useState, useEffect } from "react";
// // import { useAuth } from "../contexts/AuthContext/AuthProvider";
// // import axios from "axios";

// // export const useUserRole = () => {
// //   const { user, loading } = useAuth();
// //   const [role, setRole] = useState(null);
// //   const [roleLoading, setRoleLoading] = useState(true);

// //   useEffect(() => {
// //     if (!user) {
// //       setRole(null);
// //       setRoleLoading(false);
// //       return;
// //     }

// //     const fetchRole = async () => {
// //       try {
// //         const res = await axios.get(`https://medicare-sever-site.vercel.app/users/me/role?email=${user.email}`);
// //         setRole(res.data.role); // Example: "admin" or "user"
// //       } catch (err) {
// //         setRole(null);
// //       } finally {
// //         setRoleLoading(false);
// //       }
// //     };

// //     fetchRole();
// //   }, [user]);

// //   return { role, roleLoading };
// // };





// // src/hooks/useUserRole.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../contexts/AuthContext/AuthProvider";
// import axios from "axios";
// import { getAuth } from "firebase/auth";

// export const useUserRole = () => {
//   const { user, loading } = useAuth();
//   const [role, setRole] = useState(null);
//   const [roleLoading, setRoleLoading] = useState(true);

//   useEffect(() => {
//     if (!user) {
//       setRole(null);
//       setRoleLoading(false);
//       return;
//     }

//     const fetchRole = async () => {
//       try {
//         const auth = getAuth();
//         const token = await auth.currentUser.getIdToken(); // ✅ Firebase ID token

//         const res = await axios.get(
//           "https://medicare-sever-site.vercel.app/users/me/role",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // ✅ send token
//             },
//           }
//         );

//         setRole(res.data?.data?.role || null); // ✅ safely extract role
//       } catch (err) {
//         console.error("❌ Error fetching role:", err.message);
//         setRole(null);
//       } finally {
//         setRoleLoading(false);
//       }
//     };

//     fetchRole();
//   }, [user]);

//   return { role, roleLoading };
// };




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
        // Get the Firebase ID token
        const token = await user.getIdToken();
        
        // Use the correct deployed backend URL
        const res = await axios.get(
          `https://medicare-sever-site.vercel.app/users/me/role`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        console.log("Role API Response:", res.data); // Debug log
        setRole(res.data.data.role);
      } catch (err) {
        console.error("Error fetching user role:", err);
        console.error("Error details:", err.response?.data); // More detailed error
        setRole(null);
      } finally {
        setRoleLoading(false);
      }
    };

    fetchRole();
  }, [user]);

  return { role, roleLoading };
};
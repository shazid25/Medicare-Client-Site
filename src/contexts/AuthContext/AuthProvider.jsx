// import React, { createContext, useContext, useState, useEffect } from "react";
// import { auth } from "../../firebase/firebase.init";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import axios from "axios";

// // Create context
// export const AuthContext = createContext();

// const provider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Firebase user
//   const [role, setRole] = useState("user"); // Default role
//   const [loading, setLoading] = useState(true);

//   // Track user login state and fetch role from backend
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);

//         try {
//           // Fetch role from backend
//           const res = await axios.get(
//             `https://medicare-sever-site.vercel.app/users/${currentUser.email}`
//           );

//           if (res.data && res.data.role) {
//             setRole(res.data.role);
//           } else {
//             setRole("user");
//           }

//           // Save/update user in backend
//           await axios.post("https://medicare-sever-site.vercel.app/users", {
//             email: currentUser.email,
//             name: currentUser.displayName || "User",
//             role: res.data?.role || "user",
//           });
//         } catch (error) {
//           console.error("Error fetching user role:", error);
//         }
//       } else {
//         setUser(null);
//         setRole("user");
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Auth functions
//   const createUser = (email, password) =>
//     createUserWithEmailAndPassword(auth, email, password);
//   const loginUser = (email, password) =>
//     signInWithEmailAndPassword(auth, email, password);
//   const logoutUser = () => signOut(auth);
//   const signInWithGoogle = () => signInWithPopup(auth, provider);

//   const value = { user, role, loading, createUser, loginUser, logoutUser, signInWithGoogle };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // Custom hook
// export const useAuth = () => useContext(AuthContext);

// export default AuthProvider;



import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";

// Create context
export const AuthContext = createContext();

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);

  // Function to fetch user role with proper authentication
  const fetchUserRole = async (currentUser) => {
    try {
      // Get Firebase ID token
      const token = await currentUser.getIdToken();
      
      // Fetch role from backend with proper authentication
      const res = await axios.get(
        "https://medicare-sever-site.vercel.app/users/me/role",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Correct response parsing
      if (res.data?.success && res.data?.data?.role) {
        setRole(res.data.data.role);
        return res.data.data.role;
      } else {
        setRole("user");
        return "user";
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      setRole("user");
      return "user";
    }
  };

  // Track user login state and fetch role from backend
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          // Fetch the user's role first
          const userRole = await fetchUserRole(currentUser);

          // Then save/update user in backend
          const token = await currentUser.getIdToken();
          await axios.post(
            "https://medicare-sever-site.vercel.app/users",
            {
              email: currentUser.email,
              name: currentUser.displayName || "User",
              role: userRole,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.error("Error in auth state change:", error);
        }
      } else {
        setUser(null);
        setRole("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Auth functions
  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const logoutUser = () => signOut(auth);
  const signInWithGoogle = () => signInWithPopup(auth, provider);

  const value = {
    user,
    role,
    loading,
    createUser,
    loginUser,
    logoutUser,
    signInWithGoogle,
    refreshUserRole: () => user && fetchUserRole(user), // Optional: add method to refresh role
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;

// // // AuthProvider.jsx
// // import React, { createContext, useState, useEffect } from "react";
// // import { auth } from "../../firebase/firebase.init";
// // import { 
// //   createUserWithEmailAndPassword, 
// //   signInWithEmailAndPassword, 
// //   signOut, 
// //   onAuthStateChanged, 
// //   GoogleAuthProvider, 
// //   signInWithPopup 
// // } from "firebase/auth";

// // export const AuthContext = createContext();

// // const provider = new GoogleAuthProvider();

// // const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null); // store logged in user
// //   const [loading, setLoading] = useState(true);

// //   // Track user login state
// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
// //       setUser(currentUser);
// //       setLoading(false);
// //     });
// //     return () => unsubscribe();
// //   }, []);

// //   const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
// //   const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
// //   const logoutUser = () => signOut(auth);
// //   const signInWithGoogle = () => signInWithPopup(auth, provider);

// //   const value = {
// //     user,
// //     loading,
// //     createUser,
// //     loginUser,
// //     logoutUser,
// //     signInWithGoogle,
// //   };

// //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// // };

// // export default AuthProvider;



// // src/contexts/AuthContext/AuthProvider.jsx
// export const useAuth = () => useContext(AuthContext);
// import React, { createContext, useEffect, useState } from "react";
// import {
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";
// // import app from "../../firebase/firebase.config";
// import app from "../../firebase/firebase.init";

// // ✅ Export the context so other files can import it
// export const AuthContext = createContext(null);

// const auth = getAuth(app);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // register user
//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   // login user
//   const loginUser = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   // logout user
//   const logoutUser = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   // observe user state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   // provide auth info
//   const authInfo = {
//     user,
//     loading,
//     createUser,
//     loginUser,
//     logoutUser,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;






// // src/contexts/AuthContext/AuthProvider.jsx
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
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Track user login state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);

//         // Save or update user in backend
//         await axios.post("http://localhost:3000/users", {
//           email: currentUser.email,
//           name: currentUser.displayName || "User",
//         });
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Auth functions
//   const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
//   const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
//   const logoutUser = () => signOut(auth);
//   const signInWithGoogle = () => signInWithPopup(auth, provider);

//   const value = { user, loading, createUser, loginUser, logoutUser, signInWithGoogle };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // Custom hook
// export const useAuth = () => useContext(AuthContext);

// export default AuthProvider;





// src/contexts/AuthContext/AuthProvider.jsx
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
  const [loading, setLoading] = useState(true);

  // Track user login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Save or update user in backend
        await axios.post("http://localhost:3000/users", {
          email: currentUser.email,
          name: currentUser.displayName || "User",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Auth functions
  const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logoutUser = () => signOut(auth);
  const signInWithGoogle = () => signInWithPopup(auth, provider);

  const value = { user, loading, createUser, loginUser, logoutUser, signInWithGoogle };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

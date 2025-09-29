
// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   updateProfile,
// } from "firebase/auth";
// // import { auth } from "../firebase.config";
// import { auth } from "../firebase/firebase.init"
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const createUser = async (email, password) => {
//     setLoading(true);
//     return await createUserWithEmailAndPassword(auth, email, password);
//   };

//   const loginUser = async (email, password) => {
//     setLoading(true);
//     return await signInWithEmailAndPassword(auth, email, password);
//   };

//   const logoutUser = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         const token = await currentUser.getIdToken();
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

//   return (
//     <AuthContext.Provider value={{ user, createUser, loginUser, logoutUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default function useAuth() {
//   return useContext(AuthContext);
// }




import { useContext } from "react";
// import AuthContext from "../contexts/AuthContext";
import { AuthContext } from "../contexts/AuthContext/AuthProvider";
const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};

export default useAuth;
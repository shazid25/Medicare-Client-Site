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
  const [user, setUser] = useState(null); // Firebase user
  const [role, setRole] = useState("user"); // Default role
  const [loading, setLoading] = useState(true);

  // Track user login state and fetch role from backend
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          // Fetch role from backend
          const res = await axios.get(
            `https://medicare-sever-site.vercel.app/users/${currentUser.email}`
          );

          if (res.data && res.data.role) {
            setRole(res.data.role);
          } else {
            setRole("user");
          }

          // Save/update user in backend
          await axios.post("https://medicare-sever-site.vercel.app/users", {
            email: currentUser.email,
            name: currentUser.displayName || "User",
            role: res.data?.role || "user",
          });
        } catch (error) {
          console.error("Error fetching user role:", error);
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

  const value = { user, role, loading, createUser, loginUser, logoutUser, signInWithGoogle };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

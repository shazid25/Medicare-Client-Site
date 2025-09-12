import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const createUser = (data) => {
    // Your registration logic
  };

  const loginUser = (email, password) => {
    // Your login logic
  };

  const signInWithGoogle = () => {
    // Your Google login logic
  };

  return (
    <AuthContext.Provider value={{ user, createUser, loginUser, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

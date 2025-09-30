


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
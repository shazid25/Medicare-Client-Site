


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
        const res = await axios.get(`https://medicare-sever-site.vercel.app/users/me/role?email=${user.email}`);
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




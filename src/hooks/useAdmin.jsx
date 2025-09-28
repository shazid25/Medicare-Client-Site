import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then(res => {
        setIsAdmin(res.data?.role === "admin");
        setLoading(false);
      });
    }
  }, [user, axiosSecure]);

  return [isAdmin, loading];
};

export default useAdmin;

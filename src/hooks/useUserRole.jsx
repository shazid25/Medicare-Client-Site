import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthProvider';
import axios from 'axios';

export const useUserRole = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setUserRole(null);
        setLoading(false);
        return;
      }

      try {
        const token = await user.getIdToken();
        const response = await axios.get('http://localhost:3000/users/me/role', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUserRole(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching user role:', err);
        setError(err.response?.data?.message || 'Failed to fetch user role');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  return { userRole, loading, error };
};
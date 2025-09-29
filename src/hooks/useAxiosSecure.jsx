import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';

// Create axios instance outside the hook to avoid recreation
const axiosSecureInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

const useAxiosSecure = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axiosSecureInstance.interceptors.request.use(
      async (config) => {
        try {
          const currentUser = auth.currentUser;
          if (currentUser) {
            const token = await currentUser.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        } catch (error) {
          console.error('Error getting auth token:', error);
          return Promise.reject(error);
        }
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    const responseInterceptor = axiosSecureInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          const { status, data } = error.response;
          
          if (status === 401) {
            console.error('Authentication error:', data.message);
          } else if (status === 403) {
            console.error('Authorization error:', data.message);
          } else if (status === 429) {
            console.error('Rate limit exceeded:', data.message);
          }
        } else if (error.request) {
          console.error('Network error:', error.message);
        } else {
          console.error('Error:', error.message);
        }
        
        return Promise.reject(error);
      }
    );

    setLoading(false);

    // Cleanup interceptors
    return () => {
      axiosSecureInstance.interceptors.request.eject(requestInterceptor);
      axiosSecureInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return { axiosSecure: axiosSecureInstance, loading };
};

export default useAxiosSecure;






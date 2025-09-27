// import axios from 'axios'
// import React from 'react'
// import useAuth from './useAuth';

// const axiosSecure = axios.create({
//     baseURL: `http://localhost:3000`,
// });

// const useAxiosSecure = () => {
//   const { user } = useAuth();
//   axiosSecure.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${user.accessToken}`;
//     return config;
//   }, (error) => {
//     return Promise.reject(error);

// })
//   return axiosSecure;
// };

// export default useAxiosSecure;



// useAxiosSecure.js
// import axios from "axios";
// import useAuth from "./useAuth"; // adjust path if needed
// import { useEffect } from "react";

// const axiosSecure = axios.create({
//   baseURL: "http://localhost:3000", // change for production
// });

// // Hook that returns the axios instance and sets up interceptor
// const useAxiosSecure = () => {
//   const { user } = useAuth(); // your hook should provide user and accessToken (idToken)

//   useEffect(() => {
//     // Request interceptor to attach Firebase ID token as Bearer token
//     const requestInterceptor = axiosSecure.interceptors.request.use(
//       async (config) => {
//         try {
//           // Prefer token from user object if present
//           let token = user?.accessToken || user?.idToken;

//           // fallback to localStorage if you store token there
//           if (!token) {
//             token = localStorage.getItem("accessToken") || localStorage.getItem("idToken");
//           }

//           if (token) {
//             config.headers = config.headers || {};
//             config.headers.Authorization = `Bearer ${token}`;
//           }
//           return config;
//         } catch (err) {
//           return Promise.reject(err);
//         }
//       },
//       (error) => Promise.reject(error)
//     );

//     // Response interceptor to catch 401/403 globally (optional)
//     const responseInterceptor = axiosSecure.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error?.response?.status === 401 || error?.response?.status === 403) {
//           // optional: sign out user or redirect to login
//           // e.g., window.location.href = "/auth/login";
//           console.warn("Unauthorized or forbidden response from server:", error.response.status);
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axiosSecure.interceptors.request.eject(requestInterceptor);
//       axiosSecure.interceptors.response.eject(responseInterceptor);
//     };
//   }, [user]);

//   return axiosSecure;
// };

// export default useAxiosSecure;



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
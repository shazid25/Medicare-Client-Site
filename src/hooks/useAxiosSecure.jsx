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
import axios from "axios";
import useAuth from "./useAuth"; // adjust path if needed
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000", // change for production
});

// Hook that returns the axios instance and sets up interceptor
const useAxiosSecure = () => {
  const { user } = useAuth(); // your hook should provide user and accessToken (idToken)

  useEffect(() => {
    // Request interceptor to attach Firebase ID token as Bearer token
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        try {
          // Prefer token from user object if present
          let token = user?.accessToken || user?.idToken;

          // fallback to localStorage if you store token there
          if (!token) {
            token = localStorage.getItem("accessToken") || localStorage.getItem("idToken");
          }

          if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        } catch (err) {
          return Promise.reject(err);
        }
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to catch 401/403 globally (optional)
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          // optional: sign out user or redirect to login
          // e.g., window.location.href = "/auth/login";
          console.warn("Unauthorized or forbidden response from server:", error.response.status);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;

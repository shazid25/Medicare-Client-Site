import axios from 'axios';
import { auth } from '../firebase/firebase.init';

const useSimpleAxios = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  });

  // Add token to requests
  axiosInstance.interceptors.request.use(async (config) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return config;
    }
  });

  return axiosInstance;
};

export default useSimpleAxios;
import axios from "axios";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: "https://medicare-sever-site.vercel.app", // 👈 change when deployed
    withCredentials: true,
  });

  return axiosInstance;
};

export default useAxios;

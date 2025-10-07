// import axios from "axios";

// const useAxios = () => {
//   const axiosInstance = axios.create({
//     baseURL: "https://medicare-sever-site.vercel.app", 
//     withCredentials: true,
//   });

//   return axiosInstance;
// };

// export default useAxios;



import axios from "axios";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: "https://medicare-sever-site.vercel.app", // ✅ Correct deployed backend URL
    withCredentials: true,
  });

  return axiosInstance;
};

export default useAxios;

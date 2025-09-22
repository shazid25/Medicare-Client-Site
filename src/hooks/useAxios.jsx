// import axios from "axios"

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000'
   
//     })


// const useAxios = () => {
//   return axiosInstance
// };
// export default useAxios



import axios from "axios";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000", // 👈 change when deployed
    withCredentials: true,
  });

  return axiosInstance;
};

export default useAxios;

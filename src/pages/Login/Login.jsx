// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FcGoogle } from "react-icons/fc";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2"; // Import SweetAlert2
// import useAuth from "../../hooks/useAuth"; // Custom hook

// const Login = () => {
//   const { loginUser, signInWithGoogle } = useAuth();
//   const navigate = useNavigate();

//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const [medicineNames, setMedicineNames] = useState([]);
//   const [medicineIcons, setMedicineIcons] = useState([]);
//   const [showPassword, setShowPassword] = useState(false);

//   // Floating medicine names & icons
//   useEffect(() => {
//     const names = [
//       "Paracetamol", "Ibuprofen", "Aspirin", "Amoxicillin", "Metformin",
//       "Insulin", "Vitamin C", "Vitamin D", "Omeprazole", "Atorvastatin",
//       "Cardiology", "Diabetes", "Pain Relief", "Antibiotics", "Vitamins",
//       "Supplements", "Skincare", "First Aid", "Respiratory", "Antihistamines"
//     ];

//     const nameElements = [];
//     for (let i = 0; i < 25; i++) {
//       nameElements.push({
//         id: i,
//         name: names[Math.floor(Math.random() * names.length)],
//         top: Math.random() * 100,
//         left: Math.random() * 100,
//         animationDuration: 15 + Math.random() * 20,
//         animationDelay: Math.random() * 5,
//         fontSize: 0.8 + Math.random() * 1.2,
//         opacity: 0.1 + Math.random() * 0.2
//       });
//     }
//     setMedicineNames(nameElements);

//     const icons = ["💊", "🧴", "🩹", "🧪"];
//     const iconElements = [];
//     for (let i = 0; i < 40; i++) {
//       iconElements.push({
//         id: i,
//         icon: icons[Math.floor(Math.random() * icons.length)],
//         top: Math.random() * 100,
//         left: Math.random() * 100,
//         size: 12 + Math.random() * 16,
//         duration: 5 + Math.random() * 5,
//         delay: Math.random() * 5,
//         opacity: 0.2 + Math.random() * 0.5
//       });
//     }
//     setMedicineIcons(iconElements);
//   }, []);

//   // Email/Password login
//   const onSubmit = async (data) => {
//     try {
//       await loginUser(data.email, data.password);
//       // Success popup with 1-second timer
//       Swal.fire({
//         icon: "success",
//         title: "Login Successful!",
//         showConfirmButton: false,
//         timer: 1000,
//         timerProgressBar: true,
//       }).then(() => {
//         navigate("/");
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Login Failed",
//         text: error.message,
//       });
//     }
//   };

//   // Google login
//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithGoogle();
//       Swal.fire({
//         icon: "success",
//         title: "Login Successful!",
//         showConfirmButton: false,
//         timer: 1000,
//         timerProgressBar: true,
//       }).then(() => {
//         navigate("/");
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Login Failed",
//         text: error.message,
//       });
//     }
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-teal-100 overflow-hidden p-4">
//       {/* Floating medicine names */}
//       {medicineNames.map((item) => (
//         <motion.span
//           key={item.id}
//           initial={{ y: 0 }}
//           animate={{ y: [0, -50, 0] }}
//           transition={{ duration: item.animationDuration, repeat: Infinity, delay: item.animationDelay, ease: "easeInOut" }}
//           className="absolute select-none text-gray-400 font-semibold"
//           style={{
//             top: `${item.top}%`,
//             left: `${item.left}%`,
//             fontSize: `${item.fontSize}rem`,
//             opacity: item.opacity,
//           }}
//         >
//           {item.name}
//         </motion.span>
//       ))}

//       {/* Floating medicine icons */}
//       {medicineIcons.map((item) => (
//         <motion.span
//           key={item.id}
//           initial={{ x: 0, y: 0 }}
//           animate={{ x: [0, 100, 0], y: [0, 100, 0] }}
//           transition={{ duration: item.duration, repeat: Infinity, delay: item.delay, ease: "linear" }}
//           className="absolute select-none"
//           style={{
//             top: `${item.top}%`,
//             left: `${item.left}%`,
//             fontSize: `${item.size}px`,
//             opacity: item.opacity,
//           }}
//         >
//           {item.icon}
//         </motion.span>
//       ))}

//       {/* Login Form */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, ease: "easeOut" }}
//         className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border-t-8 border-blue-400"
//       >
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             {...register("email", { required: "Email is required" })}
//             className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
//           />
//           {errors.email && Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: errors.email.message,
//           })}

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               {...register("password", { required: "Password is required" })}
//               className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all pr-12"
//             />
//             <div
//               className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
//             </div>
//           </div>
//           {errors.password && Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: errors.password.message,
//           })}

//           <button
//             type="submit"
//             className="btn w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white py-3 rounded-xl font-medium shadow-lg transition-all"
//           >
//             Login
//           </button>
//         </form>

//         <div className="mt-4 text-center text-gray-500">
//           Don't have an account?{' '}
//           <Link to="/auth/register" className="text-blue-500 font-semibold hover:underline">
//             Register
//           </Link>
//         </div>

//         <div className="my-5 flex items-center justify-center text-gray-400">or</div>

//         <button
//           onClick={handleGoogleLogin}
//           className="btn btn-outline btn-accent w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all shadow-md hover:bg-red-50 hover:text-red-600"
//         >
//           <FcGoogle size={24} />
//           Sign in with Google
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;







// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FcGoogle } from "react-icons/fc";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2"; // Import SweetAlert2
// import useAuth from "../../hooks/useAuth"; // Custom hook

// const Login = () => {
//   const { loginUser, signInWithGoogle } = useAuth();
//   const navigate = useNavigate();

//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const [medicineNames, setMedicineNames] = useState([]);
//   const [medicineIcons, setMedicineIcons] = useState([]);
//   const [showPassword, setShowPassword] = useState(false);

//   // Floating medicine names & icons
//   useEffect(() => {
//     const names = [
//       "Paracetamol", "Ibuprofen", "Aspirin", "Amoxicillin", "Metformin",
//       "Insulin", "Vitamin C", "Vitamin D", "Omeprazole", "Atorvastatin",
//       "Cardiology", "Diabetes", "Pain Relief", "Antibiotics", "Vitamins",
//       "Supplements", "Skincare", "First Aid", "Respiratory", "Antihistamines"
//     ];

//     const nameElements = [];
//     for (let i = 0; i < 25; i++) {
//       nameElements.push({
//         id: i,
//         name: names[Math.floor(Math.random() * names.length)],
//         top: Math.random() * 100,
//         left: Math.random() * 100,
//         animationDuration: 15 + Math.random() * 20,
//         animationDelay: Math.random() * 5,
//         fontSize: 0.8 + Math.random() * 1.2,
//         opacity: 0.1 + Math.random() * 0.2
//       });
//     }
//     setMedicineNames(nameElements);

//     const icons = ["💊", "🧴", "🩹", "🧪"];
//     const iconElements = [];
//     for (let i = 0; i < 40; i++) {
//       iconElements.push({
//         id: i,
//         icon: icons[Math.floor(Math.random() * icons.length)],
//         top: Math.random() * 100,
//         left: Math.random() * 100,
//         size: 12 + Math.random() * 16,
//         duration: 5 + Math.random() * 5,
//         delay: Math.random() * 5,
//         opacity: 0.2 + Math.random() * 0.5
//       });
//     }
//     setMedicineIcons(iconElements);
//   }, []);

//   // Email/Password login
//   const onSubmit = async (data) => {
//     try {
//       await loginUser(data.email, data.password);
//       // Success popup with 1-second timer
//       Swal.fire({
//         icon: "success",
//         title: "Login Successful!",
//         showConfirmButton: false,
//         timer: 1000,
//         timerProgressBar: true,
//       }).then(() => {
//         navigate("/");
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Login Failed",
//         text: error.message,
//       });
//     }
//   };

//   // Google login
//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithGoogle();
//       Swal.fire({
//         icon: "success",
//         title: "Login Successful!",
//         showConfirmButton: false,
//         timer: 1000,
//         timerProgressBar: true,
//       }).then(() => {
//         navigate("/");
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Login Failed",
//         text: error.message,
//       });
//     }
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-teal-100 overflow-hidden p-4">
//       {/* Floating medicine names */}
//       {medicineNames.map((item) => (
//         <motion.span
//           key={item.id}
//           initial={{ y: 0 }}
//           animate={{ y: [0, -50, 0] }}
//           transition={{ duration: item.animationDuration, repeat: Infinity, delay: item.animationDelay, ease: "easeInOut" }}
//           className="absolute select-none text-gray-400 font-semibold"
//           style={{
//             top: `${item.top}%`,
//             left: `${item.left}%`,
//             fontSize: `${item.fontSize}rem`,
//             opacity: item.opacity,
//           }}
//         >
//           {item.name}
//         </motion.span>
//       ))}

//       {/* Floating medicine icons */}
//       {medicineIcons.map((item) => (
//         <motion.span
//           key={item.id}
//           initial={{ x: 0, y: 0 }}
//           animate={{ x: [0, 100, 0], y: [0, 100, 0] }}
//           transition={{ duration: item.duration, repeat: Infinity, delay: item.delay, ease: "linear" }}
//           className="absolute select-none"
//           style={{
//             top: `${item.top}%`,
//             left: `${item.left}%`,
//             fontSize: `${item.size}px`,
//             opacity: item.opacity,
//           }}
//         >
//           {item.icon}
//         </motion.span>
//       ))}

//       {/* Login Form */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, ease: "easeOut" }}
//         className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border-t-8 border-blue-400"
//       >
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             {...register("email", { required: "Email is required" })}
//             className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
//           />
//           {errors.email && Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: errors.email.message,
//           })}

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               {...register("password", { required: "Password is required" })}
//               className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all pr-12"
//             />
//             <div
//               className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
//             </div>
//           </div>
//           {errors.password && Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: errors.password.message,
//           })}

//           <button
//             type="submit"
//             className="btn w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white py-3 rounded-xl font-medium shadow-lg transition-all"
//           >
//             Login
//           </button>
//         </form>

//         <div className="mt-4 text-center text-gray-500">
//           Don't have an account?{' '}
//           <Link to="/auth/register" className="text-blue-500 font-semibold hover:underline">
//             Register
//           </Link>
//         </div>

//         <div className="my-5 flex items-center justify-center text-gray-400">or</div>

//         <button
//           onClick={handleGoogleLogin}
//           className="btn btn-outline btn-accent w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all shadow-md hover:bg-red-50 hover:text-red-600"
//         >
//           <FcGoogle size={24} />
//           Sign in with Google
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;











import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext/AuthProvider";

const Login = () => {
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [medicineNames, setMedicineNames] = useState([]);
  const [medicineIcons, setMedicineIcons] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // Floating medicine names & icons
  useEffect(() => {
    const names = [
      "Paracetamol", "Ibuprofen", "Aspirin", "Amoxicillin", "Metformin",
      "Insulin", "Vitamin C", "Vitamin D", "Omeprazole", "Atorvastatin",
      "Cardiology", "Diabetes", "Pain Relief", "Antibiotics", "Vitamins",
      "Supplements", "Skincare", "First Aid", "Respiratory", "Antihistamines"
    ];

    const nameElements = [];
    for (let i = 0; i < 25; i++) {
      nameElements.push({
        id: i,
        name: names[Math.floor(Math.random() * names.length)],
        top: Math.random() * 100,
        left: Math.random() * 100,
        animationDuration: 15 + Math.random() * 20,
        animationDelay: Math.random() * 5,
        fontSize: 0.8 + Math.random() * 1.2,
        opacity: 0.1 + Math.random() * 0.2
      });
    }
    setMedicineNames(nameElements);

    const icons = ["💊", "🧴", "🩹", "🧪"];
    const iconElements = [];
    for (let i = 0; i < 40; i++) {
      iconElements.push({
        id: i,
        icon: icons[Math.floor(Math.random() * icons.length)],
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 12 + Math.random() * 16,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 5,
        opacity: 0.2 + Math.random() * 0.5
      });
    }
    setMedicineIcons(iconElements);
  }, []);

  // Email/Password login
  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).then(() => navigate("/"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).then(() => navigate("/"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-teal-100 overflow-hidden p-4">
      {/* Floating medicine names */}
      {medicineNames.map((item) => (
        <motion.span
          key={item.id}
          initial={{ y: 0 }}
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: item.animationDuration, repeat: Infinity, delay: item.animationDelay, ease: "easeInOut" }}
          className="absolute select-none text-gray-400 font-semibold"
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            fontSize: `${item.fontSize}rem`,
            opacity: item.opacity,
          }}
        >
          {item.name}
        </motion.span>
      ))}

      {/* Floating medicine icons */}
      {medicineIcons.map((item) => (
        <motion.span
          key={item.id}
          initial={{ x: 0, y: 0 }}
          animate={{ x: [0, 100, 0], y: [0, 100, 0] }}
          transition={{ duration: item.duration, repeat: Infinity, delay: item.delay, ease: "linear" }}
          className="absolute select-none"
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            opacity: item.opacity,
          }}
        >
          {item.icon}
        </motion.span>
      ))}

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border-t-8 border-blue-400"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all pr-12"
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </div>
          </div>

          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white py-3 rounded-xl font-medium shadow-lg transition-all"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-gray-500">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-500 font-semibold hover:underline">
            Register
          </Link>
        </div>

        <div className="my-5 flex items-center justify-center text-gray-400">or</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline btn-accent w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all shadow-md hover:bg-red-50 hover:text-red-600"
        >
          <FcGoogle size={24} />
          Sign in with Google
        </button>
      </motion.div>
    </div>
  );
};

export default Login;

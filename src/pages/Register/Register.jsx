// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FcGoogle } from "react-icons/fc";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import useAuth from "../../hooks/useAuth";
// import Swal from "sweetalert2";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { updateProfile } from "firebase/auth";
// import { auth } from "../../firebase/firebase.init";

// const Register = () => {
//   const { createUser, signInWithGoogle } = useAuth();
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const [medicineNames, setMedicineNames] = useState([]);
//   const [medicineIcons, setMedicineIcons] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Floating animations
//   useEffect(() => {
//     const names = [
//       "Paracetamol", "Ibuprofen", "Aspirin", "Amoxicillin", "Metformin",
//       "Insulin", "Vitamin C", "Vitamin D", "Omeprazole", "Atorvastatin"
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
//         opacity: 0.1 + Math.random() * 0.2,
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
//         opacity: 0.2 + Math.random() * 0.5,
//       });
//     }
//     setMedicineIcons(iconElements);
//   }, []);

//   // Handle Register
//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       // 1️⃣ Create user
//       const userCredential = await createUser(data.email, data.password);
//       const user = userCredential.user;

//       // 2️⃣ Upload profile image if provided
//       let photoURL = data.photo[0] ? null : ""; // default empty
//       if (data.photo && data.photo[0]) {
//         const storage = getStorage();
//         const imageRef = ref(storage, `profile-images/${user.uid}`);
//         await uploadBytes(imageRef, data.photo[0]);
//         photoURL = await getDownloadURL(imageRef);
//       } else if (data.photoURL) {
//         photoURL = data.photoURL;
//       }

//       // 3️⃣ Update Firebase Auth profile
//       await updateProfile(user, {
//         displayName: data.username,
//         photoURL: photoURL || null,
//       });

//       Swal.fire({
//         icon: "success",
//         title: "🎉 Registration Successful!",
//         text: "Welcome to our platform.",
//         showConfirmButton: false,
//         timer: 2000,
//       });
//       navigate("/");
//     } catch (error) {
//       Swal.fire("Error", error.message, "error");
//     }
//     setLoading(false);
//   };

//   // Handle Google Signin
//   const handleGoogleRegister = async () => {
//     try {
//       await signInWithGoogle();
//       Swal.fire({
//         icon: "success",
//         title: "✅ Logged in with Google!",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       navigate("/");
//     } catch (error) {
//       Swal.fire("Error", error.message, "error");
//     }
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-teal-100 overflow-hidden p-4">
//       {/* Floating animations */}
//       {medicineNames.map((item) => (
//         <motion.span
//           key={item.id}
//           initial={{ y: 0 }}
//           animate={{ y: [0, -50, 0] }}
//           transition={{ duration: item.animationDuration, repeat: Infinity, delay: item.animationDelay }}
//           className="absolute text-gray-400 font-semibold"
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
//       {medicineIcons.map((item) => (
//         <motion.span
//           key={item.id}
//           initial={{ x: 0, y: 0 }}
//           animate={{ x: [0, 100, 0], y: [0, 100, 0] }}
//           transition={{ duration: item.duration, repeat: Infinity, delay: item.delay }}
//           className="absolute"
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

//       {/* Register Form */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border-t-8 border-blue-400"
//       >
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//           Register
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Username */}
//           <input
//             type="text"
//             placeholder="Username"
//             {...register("username", { required: "Username is required" })}
//             className="input input-bordered w-full rounded-xl"
//           />
//           {errors.username && <p className="text-red-500">{errors.username.message}</p>}

//           {/* Email */}
//           <input
//             type="email"
//             placeholder="Email"
//             {...register("email", { required: "Email is required" })}
//             className="input input-bordered w-full rounded-xl"
//           />
//           {errors.email && <p className="text-red-500">{errors.email.message}</p>}

//           {/* Password */}
//           <input
//             type="password"
//             placeholder="Password"
//             {...register("password", { required: "Password is required", minLength: 6 })}
//             className="input input-bordered w-full rounded-xl"
//           />
//           {errors.password && <p className="text-red-500">{errors.password.message}</p>}

//           {/* Photo Upload */}
//           <input
//             type="file"
//             accept="image/*"
//             {...register("photo")}
//             className="w-full"
//           />

//           <select {...register("role")} className="select select-bordered w-full rounded-xl" defaultValue="user">
//             <option value="user">User</option>
//             <option value="seller">Seller</option>
//           </select>

//           <button
//             type="submit"
//             disabled={loading}
//             className="btn w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-xl"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <div className="mt-4 text-center text-gray-500">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-500 font-semibold hover:underline">
//             Login
//           </Link>
//         </div>

//         <div className="my-5 text-center text-gray-400">or</div>

//         <button
//           onClick={handleGoogleRegister}
//           className="btn btn-outline w-full flex items-center justify-center gap-2 py-3 rounded-xl"
//         >
//           <FcGoogle size={24} /> Sign in with Google
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;






import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const { createUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [medicineNames, setMedicineNames] = useState([]);
  const [medicineIcons, setMedicineIcons] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();

  // Floating animations
  useEffect(() => {
    const names = ["Paracetamol","Ibuprofen","Aspirin","Amoxicillin","Metformin","Insulin","Vitamin C","Vitamin D","Omeprazole","Atorvastatin"];
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
        opacity: 0.1 + Math.random() * 0.2,
      });
    }
    setMedicineNames(nameElements);

    const icons = ["💊","🧴","🩹","🧪"];
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
        opacity: 0.2 + Math.random() * 0.5,
      });
    }
    setMedicineIcons(iconElements);
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 1️⃣ Firebase Auth registration
      const userCredential = await createUser(data.email, data.password);
      const user = userCredential.user;

      // 2️⃣ Upload profile image
      let photoURL = "";
      if (data.photo && data.photo[0]) {
        const storage = getStorage();
        const imageRef = ref(storage, `profile-images/${user.uid}`);
        await uploadBytes(imageRef, data.photo[0]);
        photoURL = await getDownloadURL(imageRef);
      }

      // 3️⃣ Update Firebase profile
      await updateProfile(user, { displayName: data.username, photoURL: photoURL || null });

      // 4️⃣ Save user to backend
      const userInfo = {
        email: data.email,
        name: data.username,
        photoURL: photoURL,
        role: data.role || "user", // default user
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      };
      await axiosInstance.post("/users", userInfo);

      Swal.fire({
        icon: "success",
        title: "🎉 Registration Successful!",
        text: "Welcome to our platform.",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Swal.fire("⚠️ Oops!", "This email is already registered. Please login.", "warning");
      } else {
        Swal.fire("Error", error.message, "error");
      }
    }
    setLoading(false);
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const userInfo = {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        role: "user", // default for Google
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      };
      await axiosInstance.post("/users", userInfo);

      Swal.fire({
        icon: "success",
        title: "✅ Logged in with Google!",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
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
          transition={{ duration: item.animationDuration, repeat: Infinity, delay: item.animationDelay }}
          className="absolute text-gray-400 font-semibold"
          style={{ top: `${item.top}%`, left: `${item.left}%`, fontSize: `${item.fontSize}rem`, opacity: item.opacity }}
        >
          {item.name}
        </motion.span>
      ))}
      {/* Floating icons */}
      {medicineIcons.map((item) => (
        <motion.span
          key={item.id}
          initial={{ x: 0, y: 0 }}
          animate={{ x: [0, 100, 0], y: [0, 100, 0] }}
          transition={{ duration: item.duration, repeat: Infinity, delay: item.delay }}
          className="absolute"
          style={{ top: `${item.top}%`, left: `${item.left}%`, fontSize: `${item.size}px`, opacity: item.opacity }}
        >
          {item.icon}
        </motion.span>
      ))}

      {/* Register Form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border-t-8 border-blue-400"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="text" placeholder="Username" {...register("username", { required: "Username is required" })} className="input input-bordered w-full rounded-xl" />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}

          <input type="email" placeholder="Email" {...register("email", { required: "Email is required" })} className="input input-bordered w-full rounded-xl" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <input type="password" placeholder="Password" {...register("password", { required: "Password is required", minLength: 6 })} className="input input-bordered w-full rounded-xl" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          {/* Photo Upload */}
          <input type="file" accept="image/*" {...register("photo")} className="w-full" />

          {/* Role: only User or Seller */}
          <select {...register("role")} className="select select-bordered w-full rounded-xl" defaultValue="user">
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>

          <button type="submit" disabled={loading} className="btn w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-xl">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center text-gray-500">
          Already have an account? <Link to="/login" className="text-blue-500 font-semibold hover:underline">Login</Link>
        </div>

        <div className="my-5 text-center text-gray-400">or</div>

        <button onClick={handleGoogleRegister} className="btn btn-outline w-full flex items-center justify-center gap-2 py-3 rounded-xl">
          <FcGoogle size={24} /> Sign in with Google
        </button>
      </motion.div>
    </div>
  );
};

export default Register;

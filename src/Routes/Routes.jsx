// import {createBrowserRouter} from "react-router";
// import RootLayout from "../Layouts/RootLayout";
// import Home from "../pages/Home/Home";
// import Login from "../pages/Login/Login";
// import Register from "../pages/Register/Register";
// import Shop from "../pages/Shop/Shop";
// import ErrorPage from "../pages/ErrorPage/ErrorPage";


// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element:<RootLayout/>,
//     errorElement: <ErrorPage></ErrorPage>,
//     children: [
//         {
//             index: true,
//             Component: Home
//         }
//     ]
// },
// {
// path: "/shop",
// Component: Shop
// },
// {
//     path: "/login",
//     Component: Login
// },
// {
//     path: "/register",
//     Component: Register
// }
// ]);

import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",               
    element: <RootLayout />, 
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },   
      { path: "shop", element: <Shop /> },  
      { path: "login", element: <Login /> },
      { path: "auth/register", element: <Register /> },
    ],
  },
]);

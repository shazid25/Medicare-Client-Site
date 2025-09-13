// import { createBrowserRouter } from "react-router-dom";
// import RootLayout from "../Layouts/RootLayout";
// import Home from "../pages/Home/Home";
// import Shop from "../pages/Shop/Shop";
// import Login from "../pages/Login/Login";
// import Register from "../pages/Register/Register";
// import ErrorPage from "../pages/ErrorPage/ErrorPage";
// import ShopByCaregory from "../pages/ShopByCaregory/ShopByCaregory";

// export const router = createBrowserRouter([
//   {
//     path: "/",               
//     element: <RootLayout />, 
//     errorElement: <ErrorPage />,
//     children: [
//       { index: true, element: <Home /> },   
//       { path: "shop", element: <Shop /> },  
//       { path: "login", element: <Login /> },
//       { path: "auth/register", element: <Register /> },
//       {path: "/category/:id", element: <ShopByCaregory></ShopByCaregory>}
//     ],
//   },
// ]);



import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ShopByCaregory from "../pages/ShopByCaregory/ShopByCaregory";

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
      { path: "category/:id", element: <ShopByCaregory /> },
    ],
  },
]);

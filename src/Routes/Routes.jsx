// import { createBrowserRouter } from "react-router-dom";
// import RootLayout from "../Layouts/RootLayout";
// import Home from "../pages/Home/Home";
// import Shop from "../pages/Shop/Shop";
// import Login from "../pages/Login/Login";
// import Register from "../pages/Register/Register";
// import ErrorPage from "../pages/ErrorPage/ErrorPage";
// import ShopByCaregory from "../pages/ShopByCaregory/ShopByCaregory";
// import Details from "../pages/Details/Details";

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
//       { path: "category/:id", element: <ShopByCaregory /> },
//       { path: "/details/:id", Component: Details },
//     ],
//   },

// ]);




import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home";
import Details from "../pages/Details/Details";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Featured from "../Components/Featured/Featured";
import Shop from "../pages/Shop/Shop";
import Cart from "../pages/Cart/Cart";
import PrivateRoute from "../Components/PrivateRoutes/PrivateRoutes";
import ManageSellerMedicines from "../Dashboards/SellerDashboard/ManageSellerMedicines";
import EditMedicine from "../Dashboards/SellerDashboard/EditMedicine";
import DashboardLayout from "../Layouts/dashboardLayout";
import SellerForm from "../Dashboards/SellerDashboard/SellerForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,       // ✅ must be element={<RootLayout />}
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/featured", element: <Featured /> },
      { path: "/details/:id", element: <PrivateRoute><Details /></PrivateRoute> },
      { path: "/login", element: <Login /> },
      { path: "/auth/register", element: <Register /> },
      { path: "/shop", element: <Shop />},
      { path: "/cart", element: <Cart></Cart> },
      { path: "/manageMedicines", element: <PrivateRoute><ManageSellerMedicines></ManageSellerMedicines></PrivateRoute>},
      { path: "/edit-medicine/:id",element: <PrivateRoute><EditMedicine></EditMedicine></PrivateRoute>},

    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
      </PrivateRoute>,
      children: [
      { path: "sellerForm", element: <PrivateRoute><SellerForm></SellerForm></PrivateRoute>},
      ] 
     }
]);

import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import Home from "../pages/Home/Home";
import Details from "../pages/Details/Details";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Featured from "../Components/Featured/Featured";
import Shop from "../pages/Shop/Shop";
// import Cart from "../pages/Cart/Cart";
import PrivateRoute from "../Components/PrivateRoutes/PrivateRoutes";
import ManageSellerMedicines from "../Dashboards/SellerDashboard/ManageSellerMedicines";
import EditMedicine from "../Dashboards/SellerDashboard/EditMedicine";
import MainDashboard from "../Dashboards/MainDashboard/MainDashboard";
import SellerForm from "../Dashboards/SellerDashboard/SellerForm";
import BeSeller from "../Dashboards/SellerDashboard/BeSeller";
import SellerApplication from "../Dashboards/AdminDashboard/SellerApplicationsAdmin";
import AdminDashboard from "../Dashboards/AdminDashboard/AdminDashboard";
import UserDashboard from "../Dashboards/UserDashboard/UserDashboard";
import AdminBannerManagement from "../Dashboards/AdminDashboard/AdminBannerManagement";
import UserTransaction from "../Dashboards/UserDashboard/UserTransection";

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
      // { path: "/cart", element: <Cart></Cart> },
      

    ],
  },
 
 {
  path: "/",
  element: (
    <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>
  ),
  children: [
    { 
      path: "dashboard",
      element: <PrivateRoute><MainDashboard /></PrivateRoute>,
      children: [
        { path: "", element: <div>Dashboard Home</div> }, // Default dashboard page
        { path: "sellerForm", element: <PrivateRoute><SellerForm /></PrivateRoute> },
        { path: "manageMedicines", element: <PrivateRoute><ManageSellerMedicines /></PrivateRoute> },
        { path: "edit-medicine/:id", element: <PrivateRoute><EditMedicine /></PrivateRoute> },
        { path: "beSeller", element: <PrivateRoute><BeSeller></BeSeller></PrivateRoute>},
        { path: "sellerApplication", element: <PrivateRoute><SellerApplication></SellerApplication></PrivateRoute>},
        { path: "admin", element: <PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>},
        { path: "user", element: <PrivateRoute><UserDashboard></UserDashboard></PrivateRoute>},
        { path: "editBanner" , element: <PrivateRoute><AdminBannerManagement></AdminBannerManagement></PrivateRoute>},
        { path: "transaction", element: <UserTransaction /> }, 
      ]
    }
  ]
}
]);




// import { createBrowserRouter } from "react-router-dom";
// import RootLayout from "../Layouts/RootLayout";
// import DashboardLayout from "../Layouts/DashboardLayout";
// import Home from "../pages/Home/Home";
// import Details from "../pages/Details/Details";
// import Login from "../pages/Login/Login";
// import Register from "../pages/Register/Register";
// import ErrorPage from "../pages/ErrorPage/ErrorPage";
// import Featured from "../Components/Featured/Featured";
// import Shop from "../pages/Shop/Shop";
// import Cart from "../pages/Cart/Cart";
// import PrivateRoute from "../Components/PrivateRoutes/PrivateRoutes";
// import ManageSellerMedicines from "../Dashboards/SellerDashboard/ManageSellerMedicines";
// import EditMedicine from "../Dashboards/SellerDashboard/EditMedicine";
// import MainDashboard from "../Dashboards/MainDashboard/MainDashboard";
// import SellerForm from "../Dashboards/SellerDashboard/SellerForm";
// import BeSeller from "../Dashboards/SellerDashboard/BeSeller";
// import SellerApplication from "../Dashboards/AdminDashboard/SellerApplicationsAdmin";
// // import AdminDashboard from "../Dashboards/AdminDashboard/AdminDashboard";
// import UserDashboard from "../Dashboards/UserDashboard/UserDashboard";
// import AdminDashboard from "../Dashboards/AdminDashboard/AdminDashboard";
// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "featured", element: <Featured /> },
//       { 
//         path: "details/:id", 
//         element: (
//           <PrivateRoute>
//             <Details />
//           </PrivateRoute>
//         ) 
//       },
//       { path: "login", element: <Login /> },
//       { path: "auth/register", element: <Register /> },
//       { path: "shop", element: <Shop /> },
//       { 
//         path: "cart", 
//         element: (
//           <PrivateRoute>
//             <Cart />
//           </PrivateRoute>
//         ) 
//       },
//     ],
//   },
//   {
//     path: "dashboard",
//     element: (
//       <PrivateRoute>
//         <DashboardLayout />
//       </PrivateRoute>
//     ),
//     children: [
//       { 
//         index: true, 
//         element: <MainDashboard /> 
//       },
//       // Admin-only routes
//       {
//         path: "admin",
//         element: <PrivateRoute allowedRoles={['admin']} />,
//         children: [
//           { 
//             index: true, 
//             element: <AdminDashboard /> 
//           },
//           { 
//             path: "seller-applications", 
//             element: <SellerApplication /> 
//           },
//           // Add other admin routes here
//           { 
//             path: "users", 
//             element: <div>User Management</div> 
//           },
//         ]
//       },
//       // Seller-only routes
//       {
//         path: "seller",
//         element: <PrivateRoute allowedRoles={['seller', 'admin']} />,
//         children: [
//           { 
//             path: "seller-form", 
//             element: <SellerForm /> 
//           },
//           { 
//             path: "manage-medicines", 
//             element: <ManageSellerMedicines /> 
//           },
//           { 
//             path: "edit-medicine/:id", 
//             element: <EditMedicine /> 
//           },
//           // Add other seller routes here
//         ]
//       },
//       // User routes (accessible to all authenticated users)
//       {
//         path: "user",
//         element: <PrivateRoute allowedRoles={['user', 'seller', 'admin']} />,
//         children: [
//           { 
//             index: true, 
//             element: <UserDashboard /> 
//           },
//           { 
//             path: "profile", 
//             element: <div>User Profile</div> 
//           },
//           { 
//             path: "be-seller", 
//             element: <BeSeller /> 
//           },
//           // Add other user routes here
//         ]
//       },
//     ]
//   }
// ]);
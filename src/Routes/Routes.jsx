// import { createBrowserRouter } from "react-router-dom";
// import RootLayout from "../Layouts/RootLayout";
// import DashboardLayout from "../Layouts/DashboardLayout";
// import Home from "../pages/Home/Home";
// import Details from "../pages/Details/Details";
// import Login from "../pages/Login/Login";
// import Register from "../pages/Register/Register";
// import ErrorPage from "../pages/ErrorPage/ErrorPage";
// import Featured from "../Components/Featured/Featured";
// // import Shop from "../pages/Shop/Shop";
// // import Cart from "../pages/Cart/Cart";
// import PrivateRoute from "../Components/PrivateRoutes/PrivateRoutes";
// import ManageSellerMedicines from "../Dashboards/SellerDashboard/ManageSellerMedicines";
// import EditMedicine from "../Dashboards/SellerDashboard/EditMedicine";
// import MainDashboard from "../Dashboards/MainDashboard/MainDashboard";
// import SellerForm from "../Dashboards/SellerDashboard/SellerForm";
// import BeSeller from "../Dashboards/SellerDashboard/BeSeller";
// import SellerApplication from "../Dashboards/AdminDashboard/SellerApplicationsAdmin";
// import AdminDashboard from "../Dashboards/AdminDashboard/AdminDashboard";
// import UserDashboard from "../Dashboards/UserDashboard/UserDashboard";
// import AdminBannerManagement from "../Dashboards/AdminDashboard/AdminBannerManagement";
// import UserTransaction from "../Dashboards/UserDashboard/UserTransection";
// import Shop from "../pages/Shop/Shop";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,       // ✅ must be element={<RootLayout />}
//     errorElement: <ErrorPage />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/featured", element: <Featured /> },
//       { path: "/details/:id", element: <PrivateRoute><Details /></PrivateRoute> },
//       { path: "/login", element: <Login /> },
//       { path: "/auth/register", element: <Register /> },
//       { path: "/shop", element: <Shop></Shop> }
//       // { path: "/shop", element: <Shop />},
//       // { path: "/cart", element: <Cart></Cart> },
      

//     ],
//   },
 
//  {
//   path: "/",
//   element: (
//     <PrivateRoute>
//       <DashboardLayout></DashboardLayout>
//     </PrivateRoute>
//   ),
//   children: [
//     { 
//       path: "dashboard",
//       element: <PrivateRoute><MainDashboard /></PrivateRoute>,
//       children: [
//         { path: "", element: <div>Dashboard Home</div> }, // Default dashboard page
//         { path: "sellerForm", element: <PrivateRoute><SellerForm /></PrivateRoute> },
//         { path: "manageMedicines", element: <PrivateRoute><ManageSellerMedicines /></PrivateRoute> },
//         { path: "edit-medicine/:id", element: <PrivateRoute><EditMedicine /></PrivateRoute> },
//         { path: "beSeller", element: <PrivateRoute><BeSeller></BeSeller></PrivateRoute>},
//         { path: "sellerApplication", element: <PrivateRoute><SellerApplication></SellerApplication></PrivateRoute>},
//         { path: "admin", element: <PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>},
//         { path: "user", element: <PrivateRoute><UserDashboard></UserDashboard></PrivateRoute>},
//         { path: "editBanner" , element: <PrivateRoute><AdminBannerManagement></AdminBannerManagement></PrivateRoute>},
//         { path: "transaction", element: <UserTransaction /> }, 
//       ]
//     }
//   ]
// }
// ]);








import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import Home from "../pages/Home/Home";
import Details from "../pages/Details/Details";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Featured from "../Components/Featured/Featured";
// import Shop from "../pages/Shop/Shop";
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
import Shop from "../pages/Shop/Shop";
import Payment from "../Dashboards/Payment/Payment";

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
      { path: "/shop", element: <Shop></Shop> }
      // { path: "/shop", element: <Shop />},
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
        { path: "transaction", element: <PrivateRoute><UserTransaction /></PrivateRoute> }, 
        { path: "payment", element: <PrivateRoute><Payment></Payment></PrivateRoute> },
      ]
    }
  ]
}
]);


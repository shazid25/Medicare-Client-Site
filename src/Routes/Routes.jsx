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
import Cart from "../pages/Cart/Cart";
import PrivateRoute from "../Components/PrivateRoutes/PrivateRoutes";
import ManageSellerMedicines from "../Dashboards/SellerDashboard/ManageSellerMedicines";
import EditMedicine from "../Dashboards/SellerDashboard/EditMedicine";
import MainDashboard from "../Dashboards/MainDashboard/MainDashboard";
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
      // { path: "/manageMedicines", element: <PrivateRoute><ManageSellerMedicines></ManageSellerMedicines></PrivateRoute>},
      // { path: "/edit-medicine/:id",element: <PrivateRoute><EditMedicine></EditMedicine></PrivateRoute>},

    ],
  },
  // {
  //   path: "/",
  //   element: <PrivateRoute>
  //     <DashboardLayout></DashboardLayout>
  //     </PrivateRoute>,
  //     children: [
  //     { path: "/dashboard", element: <PrivateRoute><MainDashboard></MainDashboard></PrivateRoute>},
  //     { path: "/dashboard/sellerForm", element: <PrivateRoute><SellerForm></SellerForm></PrivateRoute>},
  //     { path: "/manageMedicines", element: <PrivateRoute><ManageSellerMedicines></ManageSellerMedicines></PrivateRoute>},
  //     { path: "/edit-medicine/:id",element: <PrivateRoute><EditMedicine></EditMedicine></PrivateRoute>},


  //     ] 
  // }


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
        { path: "edit-medicine/:id", element: <PrivateRoute><EditMedicine /></PrivateRoute> }
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
// import MainDashboard from "../Dashboards/MainDashboard/MainDashboard";
// import SellerForm from "../Dashboards/SellerDashboard/SellerForm";
// import EditMedicine from "../Dashboards/SellerDashboard/EditMedicine";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "featured", element: <Featured /> },
//       { path: "details/:id", element: <PrivateRoute><Details /></PrivateRoute> },
//       { path: "login", element: <Login /> },
//       { path: "auth/register", element: <Register /> },
//       { path: "shop", element: <Shop /> },
//       { path: "cart", element: <Cart /> },
//     ],
//   },

//   // Dashboard routes
//   {
//     path: "/dashboard",
//     element: (
//       <PrivateRoute>
//         <DashboardLayout />
//       </PrivateRoute>
//     ),
//     errorElement: <ErrorPage />,
//     children: [
//       { index: true, element: <MainDashboard /> }, // default dashboard page
//       { path: "sellerForm", element: <PrivateRoute><SellerForm /></PrivateRoute> },
//       { path: "manageMedicines", element: <PrivateRoute><ManageSellerMedicines /></PrivateRoute> },
//       { path: "edit-medicine/:id", element: <PrivateRoute><EditMedicine /></PrivateRoute> },
//     ],
//   },
// ]);

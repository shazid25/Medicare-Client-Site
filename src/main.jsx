// // // import { StrictMode } from 'react'
// // // import { createRoot } from 'react-dom/client'
// // // import './index.css'
// // // import {RouterProvider} from "react-router";
// // // import { router } from './Routes/Routes.jsx';

// // // createRoot(document.getElementById('root')).render(
// // //   <StrictMode>
// // //    <RouterProvider router={router} />
// // //   </StrictMode>,
// // // )



// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import './index.css'
// // import { RouterProvider } from 'react-router'
// // import { router } from './Routes/Routes.jsx'
// // import AOSWrapper from './Components/AOSWrapper/AOSWrapper.jsx'

// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //   <AOSWrapper>
// //   <RouterProvider router={router} />
// //   </AOSWrapper>
// //   </StrictMode>,
// // )


// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import { RouterProvider } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { router } from './Routes/Routes.jsx';
// import AOSWrapper from './Components/AOSWrapper/AOSWrapper.jsx';
// import AuthProvider from './contexts/AuthContext/AuthProvider.jsx'; 


// const queryClient = new QueryClient();
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//    <QueryClientProvider client={queryClient}>
//      <AuthProvider>
//       <AOSWrapper>
//         <RouterProvider router={router} />
//       </AOSWrapper>
//     </AuthProvider>
//    </QueryClientProvider>
//   </StrictMode>
// );




import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './Routes/Routes.jsx';
import AOSWrapper from './Components/AOSWrapper/AOSWrapper.jsx';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx'; 

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AOSWrapper>
          <RouterProvider router={router} />
        </AOSWrapper>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

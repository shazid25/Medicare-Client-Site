import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Components/Footer/Footer'

const DashboardLayout = () => {
  return (
    <div>
    <div className='mb-5'><Navbar></Navbar> </div>
    <main><Outlet></Outlet></main>
    <div className='mt-5'> <Footer></Footer></div>
    </div>
   
  )
}

export default DashboardLayout

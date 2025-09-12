import React from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import Banner from '../../Components/Banner/Banner';
import Category from '../../Components/Category/Category';
import Featured from '../../Components/Featured/Featured';
import Footer from '../../Components/Footer/Footer';

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Banner></Banner>
      <Category></Category>
      <Featured></Featured>
      <Footer></Footer>
    </div>
  )
}

export default Home;

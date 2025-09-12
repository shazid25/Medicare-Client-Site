// import React from 'react'
// import Navbar from '../../Components/Navbar/Navbar';
// import Banner from '../../Components/Banner/Banner';
// import Category from '../../Components/Category/Category';
// import Featured from '../../Components/Featured/Featured';
// import Footer from '../../Components/Footer/Footer';

// const Home = () => {
//   return (
//     <div className='max-w-6xl mx-auto'>
//       <Navbar></Navbar>
//       <Banner></Banner>
//       <Category></Category>
//       <Featured></Featured>
//       <Footer></Footer>
//     </div>
//   )
// }

// export default Home;


import React from 'react'
import Banner from '../../Components/Banner/Banner';
import Category from '../../Components/Category/Category';
import Featured from '../../Components/Featured/Featured';

const Home = () => {
  return (
    <div className='max-w-6xl mx-auto'>
      <Banner></Banner>
      <Category></Category>
      <Featured></Featured>
    </div>
  )
}

export default Home;

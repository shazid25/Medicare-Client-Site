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
import Review from '../../Components/Review/Review';
import Countdown from '../../Components/Countdown/Countdown';

const Home = () => {
  return (
    <div className='max-w-6xl mx-auto'>
      <Banner></Banner>
      <Category></Category>
      <Featured></Featured>
      <div className='flex flex-col md:flex-row gap-2'>
        <Review></Review>
      <Countdown></Countdown>
      </div>
    </div>
  )
}

export default Home;

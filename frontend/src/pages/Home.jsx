import React from 'react'
import Header from '../components/Header/Header'
import Herosection from "../components/Header/Herosection";
import Footer from "../components/Footer/Footer"
import CategoryProductsList from '../components/CategoryProductsList';
const Home = () => {
  return (
    <>
      <Header/>
      <Herosection/>
      <CategoryProductsList/>
      <Footer/>
    </>
    
  )
}

export default Home
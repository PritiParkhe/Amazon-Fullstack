import React from 'react'
import Header from '../components/Header/Header'
import Herosection from "../components/Header/Herosection";
import Footer from "../components/Footer/Footer"
import CategoryProductsList from '../components/CategoryProductsList';
import HorizontalCard from '../components/HorizontalCard';

const Home = () => {
  return (
    <>
      <Header/>
      <Herosection/>
      <CategoryProductsList/>
      <HorizontalCard category={"airpodes"} heading={"Pick up where you left off"}/>
      <Footer/>
    </>
    
  )
}

export default Home
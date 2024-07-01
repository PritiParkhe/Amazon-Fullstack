import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header';
import Footer from "../components/Footer/Footer"
import Cards from '../components/Cards'
import fetchCategoryWiseProduct from "../Helper/getCategoryWiseProduct";

const CategoryCardsList = () => {
  const [airpodesProducts, setAirpodesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const airpodesResponse = await fetchCategoryWiseProduct('airpodes');
        setAirpodesProducts(airpodesResponse.data);
        
        const mobileResponse = await fetchCategoryWiseProduct('mobiles');
        setMobileProducts(mobileResponse.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div>
        <Cards products={airpodesProducts} />
      </div>
      <Footer />
    </>
    
    
  )
}

export default CategoryCardsList
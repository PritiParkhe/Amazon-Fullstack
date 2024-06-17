import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Herosection from "../components/Header/Herosection";
import Footer from "../components/Footer/Footer";
import CategoryProductsList from '../components/CategoryProductsList';
import HorizontalCard from '../components/HorizontalCard';
import fetchCategoryWiseProduct from "../Helper/getCategoryWiseProduct";

const Home = () => {
  const [products, setProducts] = useState([]);
  const subCategory = "airpodes"; // Example subcategory, ensure it matches exactly with your database and productCategory

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse = await fetchCategoryWiseProduct(subCategory);
        setProducts(dataResponse.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [subCategory]);

  return (
    <>
      <Header />
      <Herosection />
      <CategoryProductsList />
      <HorizontalCard products={products} heading={"Pick up where you left off"} />
      <Footer />
    </>
  );
}

export default Home;

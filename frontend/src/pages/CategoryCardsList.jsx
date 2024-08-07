import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from "../components/Footer/Footer";
import Cards from '../components/Cards';
import fetchCategoryWiseProduct from "../Helper/getCategoryWiseProduct";
import MainHeader from '../components/Header/MainHeader';
import MainFooter from '../components/Footer/MainFooter';

const CategoryCardsList = () => {
  const { categoryName } = useParams(); // Get category name from URL parameter
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCategoryWiseProduct(categoryName);
        setCategoryData([{ heading: categoryName, products: response.data }]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [categoryName]);

  return (
    <>
      <MainHeader />
      <div>
        <Cards categoryData={categoryData} />
      </div>
      <MainFooter/>
    </>
  );
}

export default CategoryCardsList;

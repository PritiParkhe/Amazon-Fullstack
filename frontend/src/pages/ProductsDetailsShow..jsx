import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cards from '../components/Cards';
import AllApiUrls from '../services';

const ProductDetailsShow = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSubcategoryProducts = async () => {
      try {
        const response = await fetch(`${AllApiUrls.getCategoryProduct.url}?category=${category}&subcategory=${subcategory}`);
        const dataResponse = await response.json();
        setProducts(dataResponse.data);
      } catch (error) {
        console.error('Error fetching subcategory products:', error);
      }
    };

    fetchSubcategoryProducts();
  }, [category, subcategory]);

  return <Cards products={products} />;
};

export default ProductDetailsShow;

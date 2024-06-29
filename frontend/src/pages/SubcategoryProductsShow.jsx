import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cards from '../components/Cards';
import AllApiUrls from '../services/index';

const SubcategoryProductsShow = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSubcategoryProducts = async () => {
      try {
        const response = await fetch(AllApiUrls.getSubCategoryWiseProducts.url, {
          method: AllApiUrls.getSubCategoryWiseProducts.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ category, subcategory }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }

        const dataResponse = await response.json();
        setProducts(dataResponse.data);
      } catch (error) {
        console.error('Error fetching subcategory products:', error.message);
      }
    };

    fetchSubcategoryProducts();
  }, [category, subcategory]);

  return <Cards products={products} />;
};

export default SubcategoryProductsShow;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import Card from '../components/Card'; // Assuming this is where your Card component is defined
import AllApiUrls from '../services';
import fetchCategoryWiseProduct from '../Helper/getCategoryWiseProduct';

const SearchProduct = () => {
  const query = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(AllApiUrls.searchProduct.url + query.search, {
          method: AllApiUrls.searchProduct.method,
        });
        const responseData = await response.json();
        setSearchResults(responseData.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const airpodsResponse = await fetchCategoryWiseProduct('airpods');
        // Set your category-wise products state here if needed
      } catch (error) {
        console.error('Error fetching category-wise products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className='container mx-auto p-4'>
        {loading && <p className='text-lg text-center'>Loading...</p>}
        <p>Search Result: {searchResults.length}</p>
        {!loading && searchResults.length === 0 && (
          <p className='bg-white text-lg text-center p-4'>Not found..</p>
        )}
        {!loading && searchResults.length > 0 && <Card products={searchResults} />}
      </div>
    </>
  );
};

export default SearchProduct;

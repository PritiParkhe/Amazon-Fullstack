import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import AllApiUrls from '../services';
import Cards from '../components/Cards'; // Assuming this is where your Card component is defined
import fetchCategoryWiseProduct from '../Helper/getCategoryWiseProduct';

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(AllApiUrls.searchProduct.url + query.search, {
          method: AllApiUrls.searchProduct.method,
        });
        const responseData = await response.json();
        setData(responseData.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [query]);

  const [airpodsProducts, setAirpodsProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const airpodsResponse = await fetchCategoryWiseProduct('airpods');
        setAirpodsProducts(airpodsResponse.data);

        const mobileResponse = await fetchCategoryWiseProduct('mobiles');
        setMobileProducts(mobileResponse.data);
      } catch (error) {
        console.error('Error fetching category-wise products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header/>
      <div className='container mx-auto p-4'>
        {loading && <p className='text-lg text-center'>Loading...</p>}
        <p>Search Result: {data.length}</p>
        {!loading && data.length === 0 && (
          <p className='bg-white text-lg text-center p-4'>Not found..</p>
        )}
        {!loading && data.length > 0 && (
          <Cards products={data} />
        )}
      </div>
    </>
  );
};

export default SearchProduct;

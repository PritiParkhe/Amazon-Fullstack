import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header/Header';
import AllApiUrls from '../services';
import Card  from '../components/Card';
import fetchCategoryWiseProduct from '../Helper/getCategoryWiseProduct';
const SearchProduct = () => {
  const query = useLocation()
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(true)
  // console.log("query",query.search); 


  const fetchProduct = async() =>{
    setLoading(true);
    const response = await fetch(AllApiUrls.searchProduct.url+query.search,{
      method : AllApiUrls.searchProduct.method,
      
    })
    const responseData = await response.json()
    setLoading(false);
    setData(responseData.data)
    // console.log("dataResponse",responseData);
  }
  useEffect(()=>{
    fetchProduct()
  },[query])
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
    <Header/>
     <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading..</p>
        )
      }

      <p>Search Result : {data.length}</p>
      {
        data.length === 0 && !loading &&(
          <p className='bg-white text-lg text-center p-4'>Not found..</p>
        )
      }

      {
        data.length !== 0 && !loading && (
          data.map((product, index) => {
            return(
              <Card loading={loading} data={data} />
            )

          })
        )
      }
     </div>
    </>
   
  )
}

export default SearchProduct
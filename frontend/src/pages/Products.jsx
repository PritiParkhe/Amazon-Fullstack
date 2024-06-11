import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import AllApiUrls from '../services';
import AdminProductCard from '../components/AdminProductCard';

function Products() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const getAllProducts = async()=>{
    const response = await fetch(AllApiUrls.allProduct.url,{
      method : AllApiUrls.allProduct.method,
      
    })
    const dataResponse = await response.json()
    setAllProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    getAllProducts()
  },[])
  
  
  return (
    <div className='bg-slate-100'>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className=' bg-yellow-400  hover:bg-yellow-500 py-2 px-4 rounded-full trnsition-all' 
        onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      {/** All Product */}
      <div className='flex items-center gap-5 py-4'>
        {
          allProduct.map((product,index)=>{
            return(
              <AdminProductCard data={product} key={index + 'allProduct'} fetchData ={getAllProducts}/>

            )
          })
        }
      </div>
      {
        openUploadProduct  && (
        <UploadProduct onclose={()=>setOpenUploadProduct(false)}/>
      )
      }
      
    </div>
    
  )
}

export default Products
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
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 h-[calc(100vh-190px)] overflow-y-scroll  mt-3'>
        
          {
            allProduct.map((product,index)=>{
              return(
                <AdminProductCard data={product} key={index + 'allProduct'} fetchData ={getAllProducts}  />

              )
            })
          }
       
        
      </div>
      {
        openUploadProduct  && (
        <UploadProduct onclose={()=>setOpenUploadProduct(false)} fetchData={getAllProducts}/>
      )
      }
      
    </div>
    
  )
}

export default Products
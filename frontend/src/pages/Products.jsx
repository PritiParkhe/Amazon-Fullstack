import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct'

function Products() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  
  return (
    <div>
      <div className='bg-slate-100 py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className=' bg-yellow-400  hover:bg-yellow-500 py-2 px-4 rounded-full trnsition-all' 
        onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>
      {/** uploadProduct */}
      {
        openUploadProduct  && (
        <UploadProduct onclose={()=>setOpenUploadProduct(false)}/>
      )
      }
      
    </div>
    
  )
}

export default Products
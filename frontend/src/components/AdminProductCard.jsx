import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import EditProduct from './EditProduct';


const AdminProductCard = ({data, fetchData}) => {
  const [editProduct, setEditProduct]= useState(false);
  return (
    <div className='bg-white p-4 rounded w-[30%] h-[30%]'>
      <div className='flex items-centerj justify-center'>
        <img src={data?.productImage[0]} width={120} height={120} alt="" />
        
      </div>
      <h1 className='text-sm'>{data.title}</h1>
      

      <div className='w-fit ml-auto p-2 bg-gray-50 hover:bg-gray-300 rounded-full' onClick={()=>setEditProduct(true)}>
        <MdEdit />
      </div>
      {
        editProduct && (
            <EditProduct productData={data} onclose={()=>setEditProduct(false)} fetchData={fetchData}/>
        )
      }
      
    </div>
  )
}

export default AdminProductCard
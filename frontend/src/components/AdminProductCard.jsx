import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import EditProduct from './EditProduct';
import displayINRCurrency from '../services/displayCurrency';

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className='bg-white p-4 rounded w-full h-65 flex flex-col justify-between'>
      <div className='w-full'>
        <div className='w-full h-40 flex justify-center items-center'>
          <img src={data?.productImage[0]} alt="" className='object-contain h-full w-full'/>
        </div>
        
        <h1 className='text-sm text-ellipsis line-clamp-2 mt-2'>{data.title}</h1>
      </div>

      <div>
        <p className='font-semibold'>
          {displayINRCurrency(data.sellingPrice)}
        </p>

        <div className='w-fit ml-auto p-2 bg-gray-50 hover:bg-gray-300 rounded-full' onClick={() => setEditProduct(true)}>
          <MdEdit />
        </div>
      </div>

      {editProduct && (
        <EditProduct productData={data} onclose={() => setEditProduct(false)} fetchData={fetchData} />
      )}
    </div>
  );
};

export default AdminProductCard;

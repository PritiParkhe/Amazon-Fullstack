// components/Cards.jsx

import React from 'react';
import displayINRCurrency from '../services/displayCurrency';

const Cards = ({ products }) => {
  return (
    <div className='container mx-4 mt-2'>
      <div className='flex flex-wrap gap-4'>
        {products.map((product, index) => (
          <div key={index} className='w-full md:w-1/4 bg-white rounded-sm shadow p-4'>
            <div className='bg-white h-48 flex justify-center items-center'>
              <img
                src={product.productImage?.[0]}
                alt={product.title}
                className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'
              />
            </div>
            <div className='p-4'>
              <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product.title}</h2>
              <p className='capitalize text-slate-500'>{product.brandName}</p>
              <div className='flex gap-3'>
                <p className='text-red-600 font-medium'>{displayINRCurrency(product.sellingPrice)}</p>
                <p className='text-slate-500 line-through'>{displayINRCurrency(product.price)}</p>
              </div>
              <button className='text-sm bg-[#ffd814] px-3 py-1 rounded-full'>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;

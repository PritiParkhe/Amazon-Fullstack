import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AllApiUrls from '../services';
import displayINRCurrency from '../services/displayCurrency';

const Cards = ({ products }) => {
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const getAllCategoryProducts = async () => {
      try {
        const response = await fetch(AllApiUrls.getCategoryProduct.url);
        const dataResponse = await response.json();
        setCategoryProducts(dataResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getAllCategoryProducts();
  }, []);

  return (
    <div className='container mt-2'>
      <div className='flex flex-wrap ml-4 mr-4'>
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2'> {/* Reduced padding between cards */}
              <div className='bg-white rounded-sm shadow p-4 flex flex-col h-full min-h-[350px]'>
                <div className='bg-white h-48 flex justify-center items-center mb-2'> {/* Reduced bottom margin */}
                  <img
                    src={product.productImage?.[0]}
                    alt={product.title}
                    className='object-contain h-full hover:scale-110 transition-all mix-blend-multiply'
                  />
                </div>
                <div className='flex-1'>
                  <h2 className='font-medium text-lg text-black'>{product.title}</h2>
                  <p className='capitalize text-slate-500'>{product.brandName}</p>
                  <div className='flex gap-3 mt-2'>
                    <p className='text-red-600 font-medium'>{displayINRCurrency(product.sellingPrice)}</p>
                    <p className='text-slate-500 line-through'>{displayINRCurrency(product.price)}</p>
                  </div>
                </div>
                <button className='mt-4 w-2/3 bg-[#ffd814] px-3 py-2 rounded-full self-center'>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className='mx-4'>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Cards;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AllApiUrls from '../services';
import displayINRCurrency from '../services/displayCurrency';
import SmallHerosection from './Header/SmallHerosection';
import addToCard from '../Helper/addToCard';
import Context from "../context";

const Cards = ({ categoryData }) => {
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCard(e, id);
    fetchUserAddToCart();
  };

  return (
    <>
      <div className='container mt-2'>
        {categoryData && categoryData.length > 0 ? (
          categoryData.map((category, catIndex) => (
            <div key={catIndex} className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>{category.heading}</h2>
              <div className='flex flex-wrap ml-4 mr-4'>
                {category.products && category.products.length > 0 ? (
                  category.products.map((product, index) => (
                    <Link 
                      to={`/product/${product._id}`}  
                      key={index} 
                      className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2'
                    > 
                      <div className='bg-white rounded-sm shadow p-4 flex flex-col h-full min-h-[350px]'>
                        <div className='bg-white h-48 flex justify-center items-center mb-2'> 
                          <img
                            src={product.productImage?.[0]}
                            alt={product.title}
                            className='object-contain h-full hover:scale-110 transition-all mix-blend-multiply'
                          />
                        </div>
                        <div className='flex-1'>
                          <h2 className='font-medium text-lg text-black'>{product.title}</h2>
                          <p className='capitalize text-slate-500'>{product.brandName}</p>
                          <div className='flex items-center gap-3 mt-2'>
                            <p className='font-medium text-lg'>{displayINRCurrency(product.sellingPrice)}</p>
                            <p className='text-gray-500 line-through'>{displayINRCurrency(product.price)}</p>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => handleAddToCart(e, product._id)}
                          className='mt-4 w-2/3 bg-[#ffd814] px-3 py-2 rounded-full self-center'
                        >
                          Add to Cart
                        </button>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className='mx-4'>No products available in this category.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className='mx-4'>No products available.</p>
        )}
      </div>
    </>
  );
};

export default Cards;

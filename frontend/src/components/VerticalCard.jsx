import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import displayINRCurrency from '../services/displayCurrency';


const VerticalCard = ({ products, heading }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft - 200,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + 200,
      behavior: 'smooth',
    });
  };

  return (
    <div className="container mx-auto px-4">
    <div className="container relative p-4 rounded-md bg-white shadow-md mt-5 overflow-hidden">
      <h2 className="text-xl font-bold mb-4">{heading}</h2>
      <div className="flex items-center justify-between">
        <button onClick={scrollLeft} className="absolute left-0 ml-2 text-gray-600 p-2 z-10">
          <FaChevronLeft />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-hidden mr-4" 
          style={{ maxWidth: `calc(100% - 32px)` }} 
        >
          {products.map((product, index) => (
            <Link to={`/product/${product?._id}`} key={index} className="flex-shrink-0 w-60 mt-2 h-80 border border-gray-200 p-4 rounded-md">
              <img
                src={product.productImage[0]}
                alt={product.title}
                className="object-cover h-32 w-32  mb-2 rounded-md hover:scale-110 transition-transform duration-200"
              />
              <div className='flex-1'>
                    <h2 className='font-medium text-medium text-black '>{product.title}</h2>
                    <p className='capitalize text-slate-500'>{product.brandName}</p>
                    <div className='flex items-center gap-3 mt-2'>
                      <p className=' font-medium text-lg'>{displayINRCurrency(product.sellingPrice)}</p>
                      <p className='text-gray-500 line-through'>{displayINRCurrency(product.price)}</p>
                    </div>
                  </div>
                  
            </Link>
          ))}
        </div>
        <button onClick={scrollRight} className="absolute right-0 mr-2 text-gray-600 p-2 z-10">
          <FaChevronRight />
        </button>
      </div>
    </div>
    </div>
  );
}

export default VerticalCard;

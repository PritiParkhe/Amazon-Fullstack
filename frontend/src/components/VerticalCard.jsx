import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
          className="flex gap-4 overflow-hidden mr-4" // Added mr-4 to the flex container
          style={{ maxWidth: `calc(100% - 32px)` }} // Adjusted max width to account for padding
        >
          {products.map((product, index) => (
            <Link to={"product/"+product?._id} key={index} className="flex-shrink-0 w-48 mt-6 h-48">
              <img
                src={product.productImage[0]}
                alt={product.title}
                className="object-contain h-40 w-full mb-2 rounded-md hover:scale-110 transition-transform duration-200"
              />
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




/* <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p> */

          
  // <Link to={"product/"+products?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
  //                       <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
  //                           <img src={products.productImage[0]} alt='' className='object-scale-down h-full hover:scale-110 transition-all'/>
  //                       </div>
  //                       <div className='p-4 grid'>
  //                           <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{heading}</h2>
  //                           <p className='capitalize text-slate-500'>{products?.category}</p>
  //                           {/* <div className='flex gap-3'>
  //                               <p className='text-red-600 font-medium'>{ displayINRCurrency(products?.sellingPrice) }</p>
  //                               <p className='text-slate-500 line-through'>{ displayINRCurrency(products?.price)  }</p>
  //                           </div> */}
  //                           {/* <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,products?._id)}>Add to Cart</button> */}
  //                       </div>
  //                   </Link>
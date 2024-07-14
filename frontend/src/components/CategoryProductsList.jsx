import React from 'react';
import { Link } from 'react-router-dom';

const CategoryProductsList = ({ categoryData }) => {
  // Function to get the first two words of a string
  const getFirstTwoWords = (str) => {
    return str.split(' ').slice(0, 2).join(' ');
  };

  return (
    <div className='container mx-auto px-4 -mt-[80px] sm:px-6 lg:px-8 relative lg:-mt-[430px] '>
      <div className='absolute top-0 left-0 w-full h-full bg-gray-100 opacity-50 blur-lg z-0'></div>
      <div className='relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-4'>
        {categoryData.map((category, index) => (
          <Link
            key={index}
            to={`/category/${category.heading.toLowerCase()}`} // Pass category heading as URL parameter
            className='bg-white p-4 rounded shadow-md'
          >
            <div>
              <h2 className='text-lg font-bold capitalize mb-2'>{category.heading}</h2>
              <div className='flex flex-wrap items-center justify-center gap-3 md:gap-5'>
                {category.products.slice(0, 4).map((product, prodIndex) => (
                  <div key={prodIndex} className='text-center'>
                    <img
                      src={product.productImage[0]}
                      alt={product.title}
                      className='w-24 md:w-32 h-24 md:h-32 shadow-md object-cover mb-1 mx-auto'
                    />
                    <p className='text-sm'>{getFirstTwoWords(product.title)}</p>
                  </div>
                ))}
              </div>
              <p className='text-[#007185] mt-1 text-center'>See more</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductsList;

import React, { useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../Helper/getCategoryWiseProduct';

const HorizontalCard = ({category, heading}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container mx-4 px-4 my-6 shadow-2xl bg-white'>
      <h1 className='text-2xl font-bold py-2'>{heading}</h1>
      {
        data.map((product, index) => (
          <div key={index} className='w-full min-w-[280px] md:min-w-[320] max-w-[280px] md:max-w-[320] h-64 rounded-sm shadow'>
            <div className='h-full p-2 bg-red-300 min-w-[120px] md:min-w-[145px]'>
              <img src={product.productImage[0]} alt=''/>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default HorizontalCard;

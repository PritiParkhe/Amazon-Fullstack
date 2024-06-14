import React, { useEffect, useState } from 'react';
import AllApiUrls from '../services';
import box1_image from '../assets/box1_image.jpg';
import box2_image from '../assets/box2_image.jpg';
import box3_image from '../assets/box3_image.jpg';
import box4_image from '../assets/box4_image.jpg';
import box5_image from '../assets/box5_image.jpg';
import box6_image from '../assets/box6_image.jpg';
import box7_image from '../assets/box7_image.jpg';
import box8_image from '../assets/box8_image.jpg';
import { Link } from 'react-router-dom';



const CategoryProductsList = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const getAllCategoryProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(AllApiUrls.getCategoryProduct.url);
        const dataResponse = await response.json();
        setCategoryProducts(dataResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    getAllCategoryProducts();
  }, []);

  const categories = [
    {
      title: 'Cloths',
      imageUrl: box1_image,
    },
    {
      title: 'Health & Personal Care',
      imageUrl: box2_image,
    },
    {
      title: 'Furniture',
      imageUrl: box3_image,
    },
    {
      title: 'Electronics',
      imageUrl: box4_image,
    },
    {
      title: 'Beauty pics',
      imageUrl: box5_image,
    },
    {
      title: 'Pet care',
      imageUrl: box6_image,
    },
    {
      title: 'New Arrival & Toys',
      imageUrl: box7_image,
    },
    {
      title: 'Discover Fashion Trends',
      imageUrl: box8_image,
    },
  ];

  return (
    <div className='container mx-auto p-4 bg-gray-100'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        {categories.map((category, index) => (
          <>
            <Link to={`/product-category/${category.title}`} key={index} className="w-[24%] h-[420px] bg-white p-4 rounded shadow-md">
            <div className="mx-4">
              <h2 className="text-2xl font-semibold capitalize mb-2">{category.title}</h2>
              <div className='h-[300px]'>
                <img
                  src={category.imageUrl}
                  alt={category.title}
                  className="h-full w-full object-cover shadow-md"
                />
              </div>
              <p className="text-[#007185] mt-2">See more</p>
            </div>
          </Link>
          </>
          
        ))}
      </div>
    </div>
  );
};

export default CategoryProductsList;

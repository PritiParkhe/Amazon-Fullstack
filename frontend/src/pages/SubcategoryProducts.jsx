import React from 'react';
import { useParams, Link } from 'react-router-dom';
import productCategory from '../Helper/ProductCategory';

const SubcategoryProducts = () => {
  const { category } = useParams();

  if (!category) {
    console.error("Category parameter is undefined or not provided.");
    return <div>Category not specified.</div>;
  }

  // Normalize category for case insensitivity and trimming
  const normalizedCategory = category.toLowerCase().trim();

  // Find the category data based on normalized category
  const categoryData = productCategory.find(cat => cat.title.toLowerCase() === normalizedCategory);

  if (!categoryData) {
    console.error(`Category '${normalizedCategory}' not found in productCategory.`);
    return <div>{`Category '${category}' not found`}</div>;
  }

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-3xl font-semibold mb-4'>{categoryData.title}</h1>
      <div className='flex flex-wrap gap-4'>
        {categoryData.options.map(subcategory => (
          <Link
            to={`/product-category/${category}/${subcategory.value}`}
            key={subcategory.id}
            className="w-full md:w-1/4 p-4 bg-white rounded shadow-md"
          >
            <div className="h-full flex flex-col justify-between">
              <h2 className="text-xl font-semibold mb-2">{subcategory.label}</h2>
              <p className="text-[#007185]">See products</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryProducts;

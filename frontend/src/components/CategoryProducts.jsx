import React, { useState } from "react";
import { useParams } from "react-router-dom";
import productCategory from "../Helper/ProductCategory";
import VerticalCard from "../components/VerticalCard"

const CategoryProducts = () => {
  const params = useParams();
  const [data, setdata] = useState([])
  const [loading, setLoading] = useState(false)
  const [visibleCategories, setVisibleCategories] = useState({});

  const fetchData = async() => {
    const response = await fetch()
    const responseData = response.json()
    setdata(responseData?.data || [])
    console.log(responseData);
  }

  const handleCategoryChange = (categoryTitle) => {
    setVisibleCategories((prevState) => ({
      ...prevState,
      [categoryTitle]: !prevState[categoryTitle],
    }));
  };

  return (
    <div className="container mx-auto p-4">
      {/** dekstopVersion */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/** leftside */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/** sortby */}
          <div className="">
            <h3 className="text-base font-medium text-gray-700 border-b pb-1 border-gray-400">
              SORT BY
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>
          {/** filterby */}
          <div className="">
            <h3 className="text-base font-medium text-gray-600 border-b pb-1 border-gray-400">
              FILTER BY
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="category"
                      id={category.title}
                      onChange={() => handleCategoryChange(category.title)}
                    />
                    <label htmlFor={category.title}>{category.title}</label>
                  </div>
                  {visibleCategories[category.title] && (
                    <div className="ml-4">
                      {category.options.map((option) => (
                        <div key={option.id} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name={option.label}
                            id={option.value}
                          />
                          <label htmlFor={option.value}>{option.value}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </form>
          </div>
        </div>
        {/** rightside */}
        <div>
          {
            data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;

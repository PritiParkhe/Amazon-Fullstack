import React, { useState, useEffect } from "react";
import productCategory from "../Helper/ProductCategory";
import VerticalCard from "../components/VerticalCard";
import AllApiUrls from "../services";

const CategoryProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState({});
  const [visibleCategories, setVisibleCategories] = useState({});
  const [sortBy,setSortBy] = useState("")


  useEffect(() => {
    fetchData();
  }, [selectCategory]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const selectedCategories = Object.keys(selectCategory).filter(
        (key) => selectCategory[key]
      );

      const response = await fetch(AllApiUrls.filterProduct.url, {
        method: AllApiUrls.filterProduct.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: selectedCategories }),
      });

      const responseData = await response.json();
      setData(responseData?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryTitle) => {
    setVisibleCategories((prevState) => ({
      ...prevState,
      [categoryTitle]: !prevState[categoryTitle],
    }));
  };

  const handleCheckboxChange = (e, categoryTitle) => {
    handleCategoryChange(categoryTitle);
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };
  const handleOnChangeSortBy = (e)=>{
    const { value } = e.target

    setSortBy(value)

    if(value === 'asc'){
      setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
    }

    if(value === 'dsc'){
      setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }
  }

  useEffect(()=>{

  },[sortBy])

  return (
    <div className="container mx-auto p-4">
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          <div className="">
            <h3 className="text-base font-medium text-gray-700 border-b pb-1 border-gray-400">
              SORT BY
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy"  checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"}/>
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"} />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>
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
                      value={category.title}
                      checked={selectCategory[category.title] || false}
                      onChange={(e) => handleCheckboxChange(e, category.title)}
                    />
                    <label htmlFor={category.title}>{category.title}</label>
                  </div>
                </div>
              ))}
            </form>
          </div>
        </div>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : data.length > 0 ? (
            <VerticalCard products={data} heading="Filtered Products" />
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;

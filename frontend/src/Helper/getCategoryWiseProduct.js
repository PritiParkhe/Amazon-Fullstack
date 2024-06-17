import AllApiUrls from "../services";

const fetchCategoryWiseProduct = async (subCategory) => {
  const response = await fetch(AllApiUrls.getCategoryWiseProduct.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      subCategory: subCategory
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error response:", errorData);
    throw new Error(errorData.message || 'Network response was not ok');
  }

  const dataResponse = await response.json();
  return dataResponse;
};

export default fetchCategoryWiseProduct;

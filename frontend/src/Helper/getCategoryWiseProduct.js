import AllApiUrls from "../services";

const fetchCategoryWiseProduct = async (category) => {
  const response = await fetch(AllApiUrls.getCategoryWiseProduct.url, {
    method: AllApiUrls.getCategoryWiseProduct.method, // This should be "POST"
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      category: category
    })
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const dataResponse = await response.json();
  return dataResponse;
};

export default fetchCategoryWiseProduct;

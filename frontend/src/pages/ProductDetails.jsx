import React, { useEffect, useState, useCallback, useContext } from "react";
import Footer from "../components/Footer/Footer";
import { useParams } from "react-router-dom";
import AllApiUrls from "../services";
import SmallHerosection from "../components/Header/SmallHerosection";
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../services/displayCurrency";
import VerticalCard from "../components/VerticalCard";
import fetchCategoryWiseProduct from "../Helper/getCategoryWiseProduct";
import addToCart from '../Helper/addToCard.js'; 
import Context from "../context";
import MainHeader from "../components/Header/MainHeader.jsx";
import MainFooter from "../components/Footer/MainFooter.jsx";


const ProductDetails = () => {
  const { fetchUserAddToCart } = useContext(Context)
  const [mobileProducts, setMobileProducts] = useState([]);
  const [airpodesProducts, setAirpodesProducts] = useState([]);
  const [data, setData] = useState({
    title: "",
    brandName: "",
    category: "",
    subCategory: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();

  const [loading, setLoading] = useState(true);

  const productImageLoading = new Array(4).fill(null);

  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const fetchProductsDetails = useCallback(async () => {
    setLoading(true);
    const response = await fetch(AllApiUrls.getProductDetails.url, {
      method: AllApiUrls.getProductDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data.productImage[0]);
  }, [params?.id]);

  useEffect(() => {
    fetchProductsDetails();
  }, [fetchProductsDetails]);

  const handleMouseEnterProduct = (imgURl) => {
    setActiveImage(imgURl);
  };

  const addLineBreaksAfterCommas = (text) => {
    return text.replace(/([,.])\s*/g, "$1<br>");
  };

  const addLineBreaksAfterWords = (text, wordCount) => {
    const words = text.split(" ");
    for (let i = wordCount; i < words.length; i += wordCount + 1) {
      words.splice(i, 0, "<br>");
    }
    return words.join(" ");
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({
      x,
      y,
    });
  }, []);

  const handleZoomOutImage = () => {
    setZoomImage(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {        

        const airpodesResponse = await fetchCategoryWiseProduct('airpods');
        setAirpodesProducts(airpodesResponse.data);
        const mobileResponse = await fetchCategoryWiseProduct('mobiles');
        setMobileProducts(mobileResponse.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id); 
    fetchUserAddToCart()
  };

  return (
    <>
      <MainHeader />
      <SmallHerosection />
      <div className="container mx-auto p-4 bg-white">
        <div className="min-h-[200px] flex flex-col lg:flex-row gap-6">
          {/* product image */}
          <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
            <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 relative">
              <img
                src={activeImage}
                alt=""
                className="h-full w-full object-scale-down mix-blend-multiply"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleZoomOutImage}
              />
              {/* zoom product */}
              {zoomImage && (
                <div className="hidden overflow-hidden lg:block absolute min-w-[400px] min-h-[400px] p-1 bg-gray-100 -right-[810px] top-0">
                  <div
                    className="w-full h-full min-h-[420px] min-w-[800px] bg-white mix-blend-multiply scale-125"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                        zoomImageCoordinate.y * 100
                      }%`,
                    }}
                  ></div>
                </div>
              )}
            </div>
            <div className="h-full">
              {loading ? (
                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                  {productImageLoading.map((_, index) => (
                    <div
                      className="h-20 w-20 rounded animate-pulse"
                      key={index}
                    ></div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                  {data.productImage.map((imgURl, index) => (
                    <div className="h-20 w-20 rounded p-1" key={index}>
                      <img
                        src={imgURl}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imgURl)}
                        onClick={() => handleMouseEnterProduct(imgURl)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* product details */}
          <div className="flex flex-col gap-1">
            <p className="bg-white">{data?.brandName} </p>
            <h2
              className="text-2xl lg:text-2xl"
              dangerouslySetInnerHTML={{
                __html: addLineBreaksAfterWords(data?.title, 5),
              }}
            ></h2>
            <p className="capitalize text-gray-500">{data?.subCategory} </p>

            <div className="flex text-[#ffd814] text-xl gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex gap-2 items-center my-1">
              <p className="font-semibold text-xl">
                {displayINRCurrency(data?.sellingPrice)}{" "}
              </p>
              <p className="line-through text-gray-500">
                {displayINRCurrency(data?.price)}{" "}
              </p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button 
                onClick={(e) => handleAddToCart(e, data._id)} // Pass the event object correctly
                className="bg-[#ffd814] rounded px-3 py-1 min-w-[140px] hover:bg-[#c8ab1d]">
                Add To Cart
              </button>
              <button className="bg-[#ffa41c] rounded px-3 py-1 min-w-[120px] hover:bg-[#ad7520]">
                Buy
              </button>
            </div>

            <div className="">
              <p className="font-medium my-1">Description: </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: addLineBreaksAfterCommas(data?.description),
                }}
              ></p>
            </div>
            
          </div>
        </div>
        <VerticalCard products={airpodesProducts} heading={"Latest in airpodes"}/>
        <VerticalCard products={mobileProducts} heading={"Latest in mobile"}/>

      </div>
      <MainFooter />
    </>
  );
};

export default ProductDetails;

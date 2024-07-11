import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Herosection from "../components/Header/Herosection";
import Footer from "../components/Footer/Footer";
import CategoryProductsList from "../components/CategoryProductsList";
import HorizontalCard from "../components/HorizontalCard";
import fetchCategoryWiseProduct from "../Helper/getCategoryWiseProduct";

const Home = () => {
  const [airpodesProducts, setAirpodesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [watchesProducts, setWatchesProducts] = useState([]);
  const [topsProducts, setTopsProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const airpodesResponse = await fetchCategoryWiseProduct("airpodes");
        setAirpodesProducts(airpodesResponse.data);

        const mobileResponse = await fetchCategoryWiseProduct("mobiles");
        setMobileProducts(mobileResponse.data);

        const watchesResponse = await fetchCategoryWiseProduct("watches");
        setWatchesProducts(watchesResponse.data);

        const topsResponse = await fetchCategoryWiseProduct("tops");
        setTopsProducts(topsResponse.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const categoryData = [
    { products: airpodesProducts, heading: "Airpodes" },
    { products: mobileProducts, heading: "Mobiles" },
    { products: watchesProducts, heading: "Watches" },
    { products: topsProducts, heading: "Tops" },
  ];

  return (
    <>
      <Header />
      <Herosection />
      <CategoryProductsList categoryData={categoryData} />
      <HorizontalCard
        products={airpodesProducts}
        heading={"Pick up where you left off"}
      />
      <HorizontalCard products={mobileProducts} heading={"Latest in mobile"} />
      <Footer />
    </>
  );
};

export default Home;

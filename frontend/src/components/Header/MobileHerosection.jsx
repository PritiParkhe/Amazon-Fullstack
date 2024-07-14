import React, { useEffect, useState } from 'react';
import { TfiAngleRight, TfiAngleLeft } from "react-icons/tfi";
import AllApiUrls from '../../services';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../stores/userSlice';
import Banner1 from '../../assets/img1_mobile.jpg';
import Banner2 from '../../assets/img2_mobile.webp';
import Banner3 from '../../assets/img3_mobile.jpg';
import Banner4 from '../../assets/img4_mobile.jpg';
import Banner5 from '../../assets/img5_mobile.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

function MobileHerosection() {
  const [currentImg, setCurrentImg] = useState(0);
  const bannerCorousel = [
    Banner1,
    Banner2,
    Banner3,
    Banner4,
    Banner5,
  ];

  const dispatch = useDispatch(); // Get dispatch function from redux
  const user = useSelector(state => state?.user?.user); // Select user from Redux state
  const navigate = useNavigate(); // Get navigate function for routing

  const nextImg = () => {
    if (bannerCorousel.length - 1 > currentImg) {
      setCurrentImg(prev => prev + 1);
    }
  };

  const prevImg = () => {
    if (currentImg !== 0) {
      setCurrentImg(prev => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (bannerCorousel.length - 1 > currentImg) {
        nextImg();
      } else {
        setCurrentImg(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImg, bannerCorousel.length, nextImg]);

  const handleUserLogout = async () => {
    const response = await fetch(AllApiUrls.logout.url, {
      method: AllApiUrls.logout.method,
      credentials: 'include',
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    } else if (data.error) {
      toast.error(data.message);
    }
  };

  const handleProfileClick = () => {
    if (user) {
      navigate('/user');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="container mx-auto px-2 md:px-4"> {/* Adjusted padding for different screen sizes */}
      <div className="relative h-64 md:h-screen w-full bg-gray-200 overflow-hidden"> {/* Set initial height and adjust for mobile */}
        <div className="absolute z-10 w-full flex items-center justify-between text-4xl text-white mt-0">
          <button className="py-2 px-1 md:py-4 md:px-2 h-[50px] md:h-[100px] hover:border border-[#007185]" onClick={prevImg}> {/* Adjusted button size */}
            <TfiAngleLeft />
          </button>
          <button className="py-2 px-1 md:py-4 md:px-2 h-[50px] md:h-[100px] hover:border border-[#007185]" onClick={nextImg}> {/* Adjusted button size */}
            <TfiAngleRight />
          </button>
        </div>
        <div className="flex h-full w-full">
          {bannerCorousel.map((banner, index) => (
            <div
              className="h-full w-full min-w-full transition-transform duration-700"
              key={banner}
              style={{ transform: `translateX(-${currentImg * 100}%)` }}
            >
              <img src={banner} alt={`Banner ${index}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MobileHerosection;

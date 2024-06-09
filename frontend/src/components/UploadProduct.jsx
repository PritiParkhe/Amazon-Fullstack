import React, { useState } from 'react';
import Logo from '../assets/Form_Logo.jpg';
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import productCategory from '../Helper/ProductCategory';
import uploadImage from '../Helper/uploadImage';

function UploadProduct({ onclose }) {
  const [data, setData] = useState({
    title: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [uploadProductImage, setUploadProductImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUploadProduct = async(e) => {
    const file = e.target.files[0];
    const uploloadImageOnCloudinary = await uploadImage(file)
    console.log('uploadImage',uploloadImageOnCloudinary.url);
    setData((prevData) => {
      return { 
        ...prevData, 
        productImage: [...prevData.productImage, uploloadImageOnCloudinary.url] 
      }
    });
    // if (file) {
    //   setUploadProductImage(URL.createObjectURL(file));
    //   
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
    console.log('Form data: ', data);
  };

  return (
    <div className='fixed w-full h-full bg-black bg-opacity-50 top-0 right-0 left-0 bottom-0 flex justify-center items-center'>
      <div className="bg-white w-full h-full max-h-[80%] max-w-lg p-4 sm:p-6 flex flex-col items-center shadow-xl rounded-sm overflow-hidden">
        <div className='w-fit text-2xl cursor-pointer ml-auto' onClick={onclose}>
          <CgClose />
        </div>
        <div className="mb-2">
          <img src={Logo} alt='Form Logo' className="w-32 mx-auto" />
        </div>
        <form className="border border-gray-300 w-full p-4 sm:p-6 flex flex-col items-center rounded overflow-y-scroll" onSubmit={handleSubmit}>
          <label className="text-xl mb-4">Add Product</label>
          <div className="w-full mb-3">
            <label htmlFor='title' className="mb-2 font-semibold">Title :</label>
            <input
              type='text'
              id='title'
              name='title'
              placeholder='Enter product name'
              className="w-full mt-1 p-2 border border-gray-300 rounded bg-slate-50"
              value={data.title}
              onChange={handleOnChange}
            />
          </div>
          <div className="w-full mb-3">
            <label htmlFor='brandName' className="mb-2 font-semibold">Brand :</label>
            <input
              type='text'
              id='brandName'
              name='brandName'
              placeholder='Enter product brand name'
              className="w-full mt-1 p-2 mb-1 border border-gray-300 rounded bg-slate-50"
              value={data.brandName}
              onChange={handleOnChange}
            />
          </div>
          <div className="w-full mb-3">
            <label htmlFor='category' className="mb-2 font-semibold">Category :</label>
            <select
              id='category'
              name='category'
              className="w-full mt-1 p-2 mb-2 border border-gray-300 rounded bg-slate-50"
              value={data.category}
              onChange={handleOnChange}
            >
              {productCategory.map((product) => (
                <option value={product.value} key={product.value}>
                  {product.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full mb-3">
            <label htmlFor='productImage' className="font-semibold">Product Image :</label>
            <label htmlFor='uploadImage'>
              <div className='w-full mt-1 p-2 border border-gray-300 rounded bg-slate-50 h-32 flex items-center justify-center'>
                <div className='text-slate-500 flex items-center justify-center flex-col gap-2'>
                  <span className='text-4xl'><FaCloudUploadAlt /></span>
                  <p className='text-sm'>Upload Product Image</p>
                  <input type="file" id='uploadImage' className='hidden' onChange={handleUploadProduct} />
                </div>
              </div>
            </label>
            <div className='mt-2'>
              {data?.productImage && data.productImage.length > 0 ? (
                data.productImage.map((e, index) => (
                  <img
                    key={index}
                    src={e}
                    alt={`product-${index}`}
                    width="90px"
                    height="90px"
                    className='bg-slate-50 border'
                  />
                ))
              ) : (
                <p className='text-red-600 text-xs'>Please Upload Image</p>
              )}
            </div>

          </div>
          <div className='h-10 w-full flex items-center justify-center'>
            <button className="px-5 py-2 w-full bg-yellow-500 hover:bg-gray-300 border-gray-300 outline-none rounded-lg" type="submit">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadProduct;

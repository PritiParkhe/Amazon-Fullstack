import React from 'react'
import { CgClose } from "react-icons/cg";




const DisplayImage = ({
  imgUrl,
  onclose
}) => {
  return (
    <div className='fixed bottom-0 top-0 left-0 right-0  flex justify-center items-center  '>
      <div className='bg-white shadow-lg  rounded max-w-5xl mx-auto p-5'>
        <div className='w-fit text-2xl cursor-pointer ml-auto' onClick={onclose}>
          <CgClose />
        </div>
        <div className='flex justify-center items-center p-1 max-w-[80vh] max-h-[80vh] '>
          <img src={imgUrl} alt="" className='w-[550px] h-[550px]'/>
        </div>

      </div>
      
    </div>
    
  )
}

export default DisplayImage
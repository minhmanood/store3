import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img className='w-12 m-auto mb-5' src={assets.return2} alt="" />
        <p className='font-semibold'>ĐỔI TRẢ DỄ DÀNG</p>
        <p className='text-gray-400'>Cam kết đổi trả nếu hàng lỗi</p>
      </div>
      <div>
        <img className='w-12 m-auto mb-5' src={assets.done} alt="" />
        <p className='font-semibold'>Giao hàng nhanh chóng</p>
        <p className='text-gray-400'>Giao từ 3-4 ngày </p>
      </div>
      <div>
        <a 
          href="https://www.facebook.com/minh.man.756714" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="cursor-pointer"
        >
          <img className='w-12 m-auto mb-5' src={assets.mes} alt="" />
          <p className='font-semibold'>Nhân viên Hỗ trợ 24/7</p>
          <p className='text-gray-400'>Liên hệ trực tiếp qua mesenger</p>
        </a>
      </div>
    </div>
  )
}

export default OurPolicy

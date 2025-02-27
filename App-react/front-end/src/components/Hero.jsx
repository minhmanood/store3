import React from 'react'
import {assets} from '../assets/assets'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border boder-gray-400'>
      {/*Hero Left side*/}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
      <div className='text-[#414141]'>
        <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#494747]'></p>
            <p className='font-medium text-sm md:text-base'>Sản Phẩm bán chạy nhất </p>
        </div>
        <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Các sản phẩm mới nhất </h1>
        <div className='flex items-center gap-2'>
            <Link><p className='font-semibold text-sm md:text-base'>Xem tất cả</p>  </Link>
            <p className='w-8 md:w-11 h-[2px] bg-[#494747]'></p>
        </div>
      </div>
      </div>
      {/*Hero Right side*/}
      <img className='w-full sm:w-1/2' src={assets.combo2} alt="" />
    </div>
  )
}

export default Hero

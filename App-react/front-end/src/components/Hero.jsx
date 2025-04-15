import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <div className='relative h-[500px] overflow-hidden'>
      <motion.video 
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
        className='absolute top-0 left-0 w-full h-full object-cover'
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1],
          delay: 0.2
        }}
      >
        <source src={assets.video} type="video/webm" />
      </motion.video>
      
      <motion.div 
        className='absolute inset-0 bg-black/30'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      ></motion.div>

      <div className='relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8'>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.6
          }}
          className='text-center text-white'
        >
          <motion.div 
            className='flex items-center justify-center gap-2 mb-4'
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.8, 
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <p className='w-8 md:w-11 h-[2px] bg-white'></p>
            <p className='font-medium text-sm md:text-base'>Sản Phẩm bán chạy nhất</p>
            <p className='w-8 md:w-11 h-[2px] bg-white'></p>
          </motion.div>
          
          <motion.h1 
            className='prata-regular text-4xl sm:text-5xl lg:text-6xl mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 1.0, 
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            Các sản phẩm mới nhất
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 1.2, 
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <Link 
              to="/collection" 
              className='inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors duration-200'
            >
              <span className='font-medium'>Xem tất cả</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero

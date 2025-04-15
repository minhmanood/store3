import React from 'react'
import { assets } from '../assets/assets.js'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
  const navigate = useNavigate()
  
  const categories = [
    { name: 'Áo thun', value: 'Tshirt' },
    { name: 'Áo sơ mi', value: 'shirt' },
    { name: 'Trang sức', value: 'jewelry' },
    { name: 'Giày dép', value: 'shoes' }, 
    { name: 'Mỹ phẩm', value: 'cosmetics' }
  ]

  const handleCategoryClick = (categoryValue) => {
    navigate('/collection', { state: { subCategory: [categoryValue] } })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-2xl font-bold mb-8">DANH MỤC SẢN PHẨM</h2>
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="group cursor-pointer"
            variants={itemVariants}
            onClick={() => handleCategoryClick(category.value)}
          >
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={assets[`combo${index+1}`]}
                alt={category.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
              />
            </div>
            <h3 className="mt-2 text-sm font-medium text-center">{category.name}</h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Categories
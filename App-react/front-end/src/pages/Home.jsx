import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets.js'


const Categories = () => {
  const categories = [
    { name: 'Áo thun', image:assets.combo1 },
    { name: 'Áo sơ mi', image:assets.combo2},
    { name: 'Trang sức', image:assets.combo3},
    { name: 'Giày dép',image:assets.combo4 },
    { name: 'Mỹ phẩm', image:assets.combo5 }
  ]

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-2xl font-bold mb-8">DANH MỤC SẢN PHẨM</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
              />
            </div>
            <h3 className="mt-2 text-sm font-medium text-center">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

const home = () => {
  return (
    <div>
      <Hero/>
      <Categories/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      {/* <NewsletterBox/> */}
    </div>
  )
}

export default home

import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Tiltle from './Title'
import ProductItem from './ProductItem'


const LatestCollection = () => {
    const {products}=useContext(ShopContext)
    const [latestProducts,setLatestProducts]=useState([])
    useEffect(()=>{
        setLatestProducts(products.slice(0,10))
    },[products])
    
    
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Tiltle text1={'SẢN PHẨM '} text2={'NỔI BẬT'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base  text-gray-600'>
       Những sản phẩm mới nhất được ra mắt vào mùa xuân
        </p>

      </div>
      {/* REnder product */}
     <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            latestProducts.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
        }
     </div>
    </div>
  )
}

export default LatestCollection

import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Tiltle from './Title'
import ProductItem from './ProductItem'
import { motion } from 'framer-motion'

const LatestCollection = () => {
    const {products} = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        if (products.length > 0) {
            setLatestProducts(products.slice(0,10))
            setIsLoading(false)
        }
    }, [products])

    if (isLoading) {
        return (
            <div className='my-10'>
                <div className='text-center py-8 text-3xl'>
                    <Tiltle text1={'SẢN PHẨM '} text2={'NỔI BẬT'}/>
                    <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                        Những sản phẩm mới nhất được ra mắt vào mùa xuân
                    </p>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className='bg-gray-200 h-64 animate-pulse rounded'></div>
                    ))}
                </div>
            </div>
        )
    }
    
    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Tiltle text1={'SẢN PHẨM '} text2={'NỔI BẬT'}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Những sản phẩm mới nhất được ra mắt vào mùa xuân
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProducts.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.4}}
                    >
                        <ProductItem 
                            id={item._id} 
                            image={item.image} 
                            name={item.name} 
                            price={item.price}
                            sizes={item.sizes}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default LatestCollection

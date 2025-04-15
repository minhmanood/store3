import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Tiltle from './Title'
import ProductItem from './ProductItem'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const LatestCollection = () => {
    const {products} = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const controls = useAnimation()
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    })

    useEffect(() => {
        if (products.length > 0) {
            setLatestProducts(products.slice(0,10))
            setIsLoading(false)
        }
    }, [products])

    useEffect(() => {
        if (inView && !isLoading) {
            controls.start("visible")
        }
    }, [controls, inView, isLoading])

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
        <div className='my-10' ref={ref}>
            <div className='text-center py-8 text-3xl'>
                <Tiltle text1={'SẢN PHẨM '} text2={'NỔI BẬT'}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Những sản phẩm mới nhất được ra mắt vào mùa xuân
                </p>
            </div>
            <motion.div 
                className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'
                initial="hidden"
                animate={controls}
                variants={{
                    visible: {
                        opacity: 1,
                        transition: {
                            when: "beforeChildren",
                            staggerChildren: 0.1
                        }
                    },
                    hidden: { opacity: 0 }
                }}
            >
                {latestProducts.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            visible: { opacity: 1, y: 0 },
                            hidden: { opacity: 0, y: 20 }
                        }}
                        transition={{ duration: 0.5 }}
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
            </motion.div>
        </div>
    )
}

export default LatestCollection

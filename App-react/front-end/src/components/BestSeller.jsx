import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { motion } from 'framer-motion'

const BestSeller = () => {
    const {products} = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])
    
    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller)
        setBestSeller(bestProduct.slice(0, 3))
    }, [products])

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'Top '} text2={'Bán Chạy'}/>
                <p className='w-3/4 m-auto text-sm text-gray-600'>
                    Những sản phẩm đứng đầu doanh số
                </p>
            </div>
            
            <div className='flex flex-col md:flex-row items-end justify-center gap-6 max-w-6xl mx-auto'>
                {/* Top 2 */}
                {bestSeller[1] && (
                    <div className='relative w-full md:w-1/3 mt-8'>
                        <div className='absolute -top-3 -left-3 z-10 bg-gray-400 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md'>
                            <span className='text-sm font-bold'>2</span>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <ProductItem 
                                id={bestSeller[1]._id}
                                image={bestSeller[1].image}
                                name={bestSeller[1].name}
                                price={bestSeller[1].price}
                                sizes={bestSeller[1].sizes}
                            />
                        </motion.div>
                    </div>
                )}
            
                {/* Top 1 - Centered and elevated */}
                {bestSeller[0] && (
                    <div className='relative w-full  md:w-1/3'>
                        <div className='absolute -top-3 -left-3 z-10 bg-yellow-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md'>
                            <span className='text-lg font-bold'>1</span>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ProductItem 
                                id={bestSeller[0]._id}
                                image={bestSeller[0].image}
                                name={bestSeller[0].name}
                                price={bestSeller[0].price}
                                sizes={bestSeller[0].sizes}
                            />
                        </motion.div>
                    </div>
                )}
            
                {/* Top 3 */}
                {bestSeller[2] && (
                    <div className='relative w-full md:w-1/3 mt-12'>
                        <div className='absolute -top-3 -left-3 z-10 bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md'>
                            <span className='text-sm font-bold'>3</span>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <ProductItem 
                                id={bestSeller[2]._id}
                                image={bestSeller[2].image}
                                name={bestSeller[2].name}
                                price={bestSeller[2].price}
                                sizes={bestSeller[2].sizes}
                            />
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BestSeller

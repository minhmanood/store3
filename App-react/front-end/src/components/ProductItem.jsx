import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

const ProductItem = ({id,image,name,price}) => {
    const {currency}=useContext(ShopContext)
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
     <div className='overflow-hidden'>
        <img src={image[0]} alt="" className='hover:scale-110 transition ease-in-out ' />
     </div>
     <p className='pt-3 pb-1 text-sm'>{name}</p>
     <p className='text-sm font-medium'>{formatPrice(price)}{currency}</p>
    </Link>
  )}
  export default ProductItem
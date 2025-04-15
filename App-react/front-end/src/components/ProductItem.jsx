import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { formatCurrency } from '../utils/formatCurrency'

const ProductItem = ({id, image, name, price, sizes = []}) => {
    const {currency, addToCart} = useContext(ShopContext)
    const [showAnimation, setShowAnimation] = useState(false)
    const [selectedSize, setSelectedSize] = useState('')
    const [showSizes, setShowSizes] = useState(false)
    
    const formatUrlName = (name) => {
      return name.trim().replace(/\s+/g, '-');
    }

    const handleAddToCart = (e) => {
      e.preventDefault();
      if (!sizes || sizes.length === 0) {
        toast.warning('Sản phẩm này hiện không có sẵn');
        return;
      }
      if (!selectedSize) {
        toast.warning('Vui lòng chọn kích thước');
        setShowSizes(true);
        return;
      }
      addToCart(id, selectedSize);
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
        setShowSizes(false);
        setSelectedSize('');
      }, 800);
    }

  return (
    <Link className='text-gray-700 cursor-pointer group relative block' to={`/product/${formatUrlName(name)}`}>
      <div className='overflow-hidden relative'>
        <img src={image[0]} alt="" className='hover:scale-110 transition ease-in-out duration-300' />
        
        {/* Quick add to cart button and size selection */}
        <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
          {showSizes && sizes && sizes.length > 0 ? (
            <div className='bg-white rounded-lg p-3 mb-2 animate-fade-in'>
              <p className='text-sm text-gray-600 mb-2'>Chọn kích thước:</p>
              <div className='flex gap-2 justify-center flex-wrap'>
                {sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSize(size);
                    }}
                    className={`px-2 py-1 rounded ${
                      selectedSize === size 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    } transition-colors text-sm`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          
          <button
            onClick={handleAddToCart}
            className='w-full bg-white text-gray-900 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2'
          >
            <img src={assets.cart} className='w-4 h-4' alt="" />
            {!sizes || sizes.length === 0 
              ? 'Hết hàng'
              : selectedSize 
                ? 'Thêm vào giỏ' 
                : 'Chọn kích thước'
            }
          </button>
        </div>

        {/* Add to cart animation */}
        {showAnimation && (
          <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='animate-fly-to-cart'>
              <img 
                src={image[0]} 
                alt={name} 
                className='w-20 h-20 object-cover rounded-lg shadow-lg'
              />
            </div>
          </div>
        )}
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{formatCurrency(price)}</p>
    </Link>
  )
}

export default ProductItem
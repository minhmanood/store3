import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Tiltle from './Title'
import { formatCurrency } from '../utils/formatCurrency'
import { useLocation } from 'react-router-dom'

const CartTotal = () => {
    const {
      currency,
      delivery_Fee,
      getCartAmount,
      discountCode,
      applyDiscountCode,
      removeDiscountCode,
      getDiscountedAmount,

      
      getFinalAmount
    } = useContext(ShopContext)

    const [inputCode, setInputCode] = useState('')
    const location = useLocation()

    useEffect(() => {
      // Clear discount code when component is mounted on the order placement page
      if (location.pathname === '/place-order' && discountCode) {
        removeDiscountCode()
      }
    }, [location.pathname])

    const handleApplyCode = () => {
      if (inputCode.trim()) {
        applyDiscountCode(inputCode);
      }
    }

    return (
      <div className='w-full'>
        <div className='text-2xl'>
          <Tiltle text1={"Tổng Tiền"} />
        </div>

        {/* Discount Code Input */}
        <div className='mt-4 mb-6'>
          <div className='flex gap-2'>
            <input 
              type="text" 
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Nhập mã giảm giá" 
              className='flex-1 border px-3 py-2 text-sm rounded'
            />
            <button 
              onClick={handleApplyCode}
              className='bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800 transition-colors'
            >
              Áp dụng
            </button>
          </div>
          {discountCode && (
            <div className='flex items-center gap-2 mt-2 text-sm text-green-600'>
              <span>Mã giảm giá đã áp dụng: {discountCode}</span>
              <button 
                onClick={removeDiscountCode}
                className='text-red-500 hover:text-red-600'
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm sm:text-lg'>
          <div className='flex justify-between'>
            <p>Tạm tính</p>
            <p>{formatCurrency(getCartAmount())}</p>
          </div>
          
          {discountCode && (
            <div className='flex justify-between text-green-600'>
              <p>Giảm giá</p>
              <p>-{formatCurrency(getDiscountedAmount())}</p>
            </div>
          )}

          <hr />
          <div className='flex justify-between'>
            <p>Phí vận chuyển</p>
            <p>{formatCurrency(delivery_Fee)}</p>
          </div>
          <div className='flex justify-between'>
            <b>Tổng tiền</b>
            <b>{formatCurrency(getFinalAmount())}</b>
          </div>
        </div>
      </div>
    )
}

export default CartTotal

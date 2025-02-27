import React ,{useContext} from 'react'
import { ShopContext } from '../context/ShopContext'
import Tiltle from './Title'

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

const CartTotal = () => {
    const {currency,delivery_Fee,getCartAmount}=useContext(ShopContext)
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Tiltle text1={"Cart Total"} />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm sm:text-lg'>
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{formatPrice(getCartAmount())} {currency}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Delivery Fee</p>
            <p>{formatPrice(delivery_Fee)} {currency}</p>
        </div>
        <div className='flex justify-between'>
            <b>Total</b>
            <b>{formatPrice(getCartAmount() === 0 ? 0 : getCartAmount() + delivery_Fee)} {currency}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal

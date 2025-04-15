import React,{useContext,useState,useEffect} from 'react'
import { ShopContext } from '../context/ShopContext'
import Tiltle from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import { color } from 'framer-motion'

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

const Cart = () => {
  const {products,currency,cartItems,updateQuantity,navigate} = useContext(ShopContext)
  const [cartData,setCartData]=useState([])

  useEffect(()=>{
    if(products.length>0){
       const tempData=[]
    for(const items in cartItems){
        for(const item in cartItems[items]){
            if(cartItems[items][item]>0){
                const [size, colors] = item.split('|'); // Tách key thành size và colors
                tempData.push({
                  _id: items,
                  size: size,       // Chỉ lấy phần size
                  colors: colors,   // Chỉ lấy phần colors
                  quantity: cartItems[items][item]
                })
            }
        }
    }
        setCartData(tempData)
    }

   
    
  },[cartItems,products])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3 '>
        <Tiltle text1={'Giỏ hàng'} text2={'Sản phẩm'} />
      </div>
      <div>
        {
          cartData.map((item,index)=>{
           const productData = products.find((product)=>product._id===item._id);
           return(
            <div key={index} className='py-4 border-t text-gray-400 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center'>
              <div className='flex items-start gap-6'>
                <img src={productData.image[0]} alt="" className='w-16 sm:w-20' />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p className='text-xs sm:text-sm'>Size: {item.size}</p>
                    <p className='text-xs sm:text-sm'>Màu: {item.colors}</p>
                    <p className='text-xs sm:text-sm'>{formatPrice(productData.price)} {currency}</p>
                  </div>
                  
                </div>
              </div>
              <input 
                onChange={(e)=> e.target.value ==='' || e.target.value ==='0' ? null : 
                  updateQuantity(item._id, item.size, item.colors, Number(e.target.value))} 
                type="number" 
                min={1} 
                defaultValue={item.quantity} 
                className='border max-w-10 sm:max-w-20 sm:px-2 py-1' 
              />
              
              <img 
                onClick={()=>updateQuantity(item._id, item.size, item.colors, 0)} 
                className='w-5 cursor-pointer' 
                src={assets.bin} 
                alt="" 
              />
            </div>
            
           )
          })
        }
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
         
          <div className='w-full text-end'>
            <button onClick={()=>navigate('/place-order')} className='bg-black text-white text-sm sm:text-lg px-4 py-2 '>Tiến hành đặt</button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

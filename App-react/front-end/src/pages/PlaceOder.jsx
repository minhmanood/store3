import React, { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import Tiltle from '../components/Title'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const PlaceOder = () => {
  const [method, setMethod] = useState('cod')
   const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_Fee,products} = useContext(ShopContext)
  const [formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:'',
  })
  const onChangeHandler=(event)=>{
    const name = event.target.name
    const value = event.target.value
    setFormData(data=>({...data,[name]:value}))
  }
  const onSubmitHandler=async(event)=>{
    event.preventDefault()
    try {
      let orderItems=[]

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if (cartItems[items][item]>0) {
            const itemInfo=structuredClone(products.find(product=>product._id===items))
            if(itemInfo){
              itemInfo.size=item
              itemInfo.quantity=cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData={
        address:formData,
        items:orderItems,
        amount:getCartAmount()+delivery_Fee
      }
      switch(method){
        case 'cod':
          const response =await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
          
          
          if(response.data.success){
            setCartItems({})
            navigate('/orders')
          }
          else{
            toast.error(response.data.message)
          }
          break;
         
          default:
            break;
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }


  
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]  '>
      <div className='flex flex-col gap-4  sm:max-w[480]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'Delivery '} text2={'Information'} />
        </div>
        <div  className='flex gap-3'>
          <input required  onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='Firts name' className='border border-gray-300 rounded-md p-2 w-full'/>
          <input required   onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last name' className='border border-gray-300 rounded-md p-2 w-full'/>
        </div>
    
          <input  required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email' className='border border-gray-300 rounded-md p-2 w-full'/>
          <input required  onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street Address' className='border border-gray-300 rounded-md p-2 w-full'/>
         <div className='flex gap-3'>
          <input required  onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded-md p-2 w-full'/>
          <input required  onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded-md p-2 w-full'/>
        </div>
         <div className='flex gap-3'>
          <input  required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="text" placeholder='Zipcode' className='border border-gray-300 rounded-md p-2 w-full'/>
          <input required  onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-300 rounded-md p-2 w-full'/>
        </div>
         <input required  onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Phone' className='border border-gray-300 rounded-md p-2 w-full'/>
      </div>
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>

        </div>
        <div className='mt-12'>
          <Tiltle text1={'Payment '} text2={'Method'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
           
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-blue-500' : ''}`}></p>
              <p>CASH On Delivery</p>

            </div>

          </div>
          <div className='w-full text-end mt-8'>
           <button type='submit'className='bg-black text-white text-sm sm:text-lg px-4 py-2 '>Place Order</button>

          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOder

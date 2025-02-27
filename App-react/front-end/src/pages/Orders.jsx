import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Tiltle from '../components/Title'
import axios from 'axios'

const Orders = () => {
  const {backendUrl,token,currency} = useContext(ShopContext)
  const [orderData,setorderData]=useState([])
  const loadOrderData= async()=>{
    try {
      if(!token){
        return null
      }
      const response=await axios.post(backendUrl+'/api/order/userorder',{},{headers:{token}})
      if (response.data.success){
        let allOrdersItem=[]
       
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status
            item['payment']=order.payment
            item['paymentMethod']=order.paymentMethod
            item['date']=order.date
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
        
        
      }
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    loadOrderData()
  },[token])
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Tiltle text1={'Đơn hàng của bạn'}  />
      </div>
      
      <div>
        {
              orderData.map((item,index)=>(
            <div key={index} className='py-4 border-t border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.image[0]} alt="" className='w-16 sm:ư-20' />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex item-center gap-3 mt-1 text-base text-gray-400'>
                    
                    <p>{currency}{item.price}</p>
                    <p>số lượng:{item.quantity}</p>
                    <p>size :{item.size}</p>
                  </div>
                  <p className='mt-1'>Ngày đặt: <span>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Hình thức thanh toán: <span>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-3.5 h-3.5 border rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium'>Theo dõi đơn hàng</button>
              </div>

            </div>
          ))
        }
      </div>
      
    </div>
    
  )
}

export default Orders

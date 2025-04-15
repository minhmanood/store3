import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Tiltle from '../components/Title'
import axios from 'axios'
import { formatDate } from '../utils/formatDate'
import { formatCurrency } from '../utils/formatCurrency'
import OrderTrackingMap from '../components/OrderTrackingMap'
import { toast } from 'react-toastify'

const Orders = () => {
  const {backendUrl,token} = useContext(ShopContext)
  const [orderData,setorderData]=useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  
  const loadOrderData = async() => {
    try {
      if(!token){
        return null
      }
      const response = await axios.post(backendUrl+'/api/order/userorder',{},{headers:{token}})
      if (response.data.success){
        setorderData(response.data.orders.reverse())
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.post(backendUrl+'/api/order/cancel', 
        { orderId }, 
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        // Remove the canceled order from the list
        setorderData(prev => prev.filter(order => order._id !== orderId));
        setSelectedOrder(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Không thể hủy đơn hàng");
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
          orderData.map((order,index)=>(
            <div key={index} className='py-4 border-t border-b'>
              <div className='flex justify-between items-center mb-4'>
                <div>
                  <p className='text-sm'>Ngày đặt: <span>{formatDate(order.date)}</span></p>
                  <p className='text-sm'>Hình thức thanh toán: <span>{order.paymentMethod}</span></p>
                </div>
                <div className='flex flex-col items-end'>
                  <div className='flex items-center gap-2'>
                    <p className='min-w-3.5 h-3.5 border rounded-full bg-green-500'></p>
                    <p className='text-sm md:text-base'>{order.status}</p>
                  </div>
                  <p className='text-sm font-medium mt-1'>
                    Tổng đơn: {formatCurrency(order.amount)}
                    {order.discountCode && (
                      <span className='text-green-600 ml-2'>
                        (-{order.discountAmount}%)
                      </span>
                    )}
                  </p>
                </div>
              </div>
              
              <div className='space-y-4'>
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className='flex items-start gap-6 text-sm border-t pt-4'>
                    <img src={item.image[0]} alt="" className='w-16 sm:w-20' />
                    <div>
                      <p className='sm:text-base font-medium'>{item.name}</p>
                      <div className='flex items-center gap-3 mt-1 text-base text-gray-400'>
                        <p>{formatCurrency(item.price)}</p>
                        <p>số lượng: {item.quantity}</p>
                        <p>size: {item.size}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className='mt-4 flex justify-end gap-2'>
                {order.status === 'Chờ xác nhận' && (
                  <button 
                    onClick={() => handleCancelOrder(order._id)} 
                    className='border border-red-500 text-red-500 px-4 py-2 text-sm font-medium hover:bg-red-500 hover:text-white transition-colors'
                  >
                    Hủy đơn hàng
                  </button>
                )}
                <button 
                  onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)} 
                  className='border px-4 py-2 text-sm font-medium'
                >
                  {selectedOrder === order._id ? 'Ẩn bản đồ' : 'Theo dõi đơn hàng'}
                </button>
              </div>

              {selectedOrder === order._id && (
                <div className='mt-4'>
                  <OrderTrackingMap orderStatus={order.status} deliveryAddress={order.address} />
                </div>
              )}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders

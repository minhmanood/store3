import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { backendUrl } from '../App'
import { toast } from'react-toastify'
import { assets } from '../assets/assets'
import { formatCurrency } from '../utils/formatCurrency'

const formatDate = (date) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const Orders = ({token}) => {
    const [orders, setOrder] = useState([])
    const fetchAllOrder = async () => {
        if (!token) {
            return null
        }
        try {
            const response = await axios.post(backendUrl +'/api/order/list', {}, { headers: { token } })
            if (response.data.success) {
                // Sort orders by date, newest first
                const sortedOrders = response.data.orders.sort((a, b) => 
                    new Date(b.date) - new Date(a.date)
                );
                setOrder(sortedOrders)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const statusHandler = async(event,orderId)=>{
        try {
            const response= await axios.post(backendUrl+'/api/order/status',{orderId, status:event.target.value},{headers:{token}})
            if(response.data.success){
                await fetchAllOrder()
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    useEffect(() => {
        fetchAllOrder()
    }, [token])
 
    return (
        <div>
            <h3>Order Page</h3>
        
            <div>
                {orders.map((order, index) => (
                    <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-500 ' key={index}>
                        <img className='w-80' src={assets.delivery} alt="" />
                        <div>
                            {order.items.map((item, index) => (
                                <p className='py-0.5' key={index}>
                                    {item.name} x {item.quantity} <span>{item.size}</span>
                                </p>
                            ))}
                            <p className='mt-3 mb-2 font-medium'>{order.address.firstName} {order.address.lastName}</p>
                            <div>
                                <p>{order.address.street},</p>
                                <p>{order.address.state}, {order.address.city}, {order.address.country}, {order.address.zipcode}</p>
                            </div>
                            <p>{order.address.phone}</p>
                        </div>
                           
                        <div>
                            <p className='text-sm sm:text-[15px]'>Số lượng: {order.items.length}</p>
                            <p className='mt-3'>Phương thức: {order.paymentMethod}</p>
                            <p>Thanh toán: {order.payment ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                            <p>Ngày đặt: {new Date(order.date).toLocaleDateString('vi-VN')}</p>
                        </div>
                        <p className='text-sm sm:text-[15px]'>{formatCurrency(order.amount)}</p>
                        <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='p-2 font-semibold' name="" id="">
                            <option value="Đơn hàng đã được đặt">Đơn hàng đã được xác nhận</option>
                            <option value="Đang đóng gói">Đang đóng gói</option>
                            <option value="Shipper đang đến lấy hàng">Shipper đang đến lấy hàng </option>
                            <option value="Đang trên đường giao đến bạn">Đang trên đường giao đến bạn</option>
                            <option value="Đã giao">Đã giao </option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders

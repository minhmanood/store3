import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from'react-toastify'
import { assets } from '../assets/assets'
const Orders = ({token}) => {
    const [orders, setOrder] = useState([])
    const fetchAllOrder = async () => {
        if (!token) {
            return null
        }
        try {
            const response = await axios.post(backendUrl +'/api/order/list', {}, { headers: { token } })
            if (response.data.success) {
                setOrder(response.data.orders)
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
            {
            orders.map((order, index) => (
                <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-500 ' key={index}>
                    <img className='w-80' src={assets.delivery} alt="" />
                    <div>
                        {order.items.map((item, index) => {
                            if (index === order.items.length -1) {  
                                return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span>{item.size}</span> </p>
                              }
                              else{
                                 return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span>{item.size}</span> </p>
                              }
                        })}
                          <p className='mt-3 mb-2 font-medium'>{order.address.firstName+""+order.address.className}</p>
                         <div>
                            <p>{order.address.street+","}</p>
                            <p>{order.address.state+","+order.address.city+","+order.address.country+","+order.address.zipcode}</p>

                         </div>
                         <p>{order.address.phone}</p>
                    </div>
                       
                    <div>
                               
                    <p className='text-sm sm:text-[15px]'>Items: {order.items.lenght}</p>
                    <p className='mt-3'>Method: {order.paymentMethod}</p>
                    <p>Payment: {order.payment ?'Done':'Pending'}</p>
                    <p>Date:{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <p className='text-sm sm:text-[15px]'>{order.amount}  {currency}</p>
                    <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='p-2 font-semibold' name="" id="">
                        <option value="Đơn hàng đã được đặt">Đơn hàng đã được xác nhận</option>
                        <option value="Đang đóng gói">Đang đóng gói</option>
                        <option value="Shipper đang đến lấy hàng">Shipper đang đến lấy hàng </option>
                        <option value="Đang trên đường giao đến bạn">Đang trên đường giao đến bạn</option>
                        <option value="Đã giao">Đã giao </option>
                    </select>
                </div>
             
                
                
            )
        )
        }
        </div>
       
        </div>
     )
    
}

export default Orders

import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
           <h1 className='text-3xl font-medium mb-12 mt-12'>MAN STORE</h1>
            <p className='w-2/3 w-full prata-regular  text-gray-700'><span className='font-bold'>MAN STORE</span> được thành lập vào năm 2023 với sự hợp tác của 3 người bạn với vốn hóa thị trường hơn 35 tỷ vnd . Tháng 1-2025 công ty chính thức trở thành công ty cổ phần thương  mại thời trang với vốn hóa thị trường 2459 tỷ đồng với giá cổ phiếu niêm yết là: 23.000 VND/CP.</p>
            <p className='w-2/3 w-full prata-regular  text-gray-700'><span className='font-bold'>MAN STORE</span> hiện nay đã có mặt trên 35 quốc gia với 235 cửa hàng  </p>
        </div>
        <div className='mt-18 '>
            <p className='text-3xl font-medium mb-12 mt-12'>CỬA HÀNG</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>HOME</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privary policy</li>

            </ul>
        </div>
        <div className='mt-18 '>
            <p className='text-3xl font-medium mb-12 mt-12'>LIÊN HỆ</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Địa chỉ: 123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM</li>
                <li>Điện thoại: 0909090909</li>
                <li>EMAIL: manstore@gmail.com</li>
                <li>FANPAGE: <a href='https://www.facebook.com/manstore.vn'>https://www.facebook.com/manstore.vn</a></li>

            </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer

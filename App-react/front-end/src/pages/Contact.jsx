import React from 'react'
import Tiltle from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets'
const Contact = () => {
  return (
    <div>
        <div className='text-2xl text-center pt-8 border-t'>
            <Tiltle text1={'Liên hệ '} text2={'Chúng tôi qua'} />
        </div>
        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
            <div className='w-full md:max-w-[480px]'>
                <img src={assets.combo11} alt="" />
            </div>
            <div className='flex flex-col gap-6 justify-center md:w-2/4 text-gray-500'>
               <div >
        <p><strong>Tên cửa hàng:</strong> Man Store</p>
        <p><strong>Địa chỉ:</strong> 22/38 Tống Văn Hên p15 Tân Bình HCM</p>
        <p><strong>Số điện thoại:</strong> 0834491197</p>
        <p><strong>Giờ mở cửa:</strong></p>
        <ul>
            <li>Thứ Hai - Thứ Sáu: 9:00 AM - 9:00 PM</li>
            <li>Thứ Bảy - Chủ Nhật: 9:00 AM - 10:00 PM</li>
        </ul>
        <p><strong>Website:</strong> manstore.com</p>
        <p><strong>Email:</strong> minhmanne0809@gmail.com</p>
        <p><strong>Mạng xã hội:</strong> </p>
    </div>
              
                <button className='bg-gray-800 text-white px-4 py-2  mx-auto mt-5'>
              Đăng ký
            </button>
            </div>
           
        </div>
        <NewsletterBox />
    </div>
    
  )
}

export default Contact

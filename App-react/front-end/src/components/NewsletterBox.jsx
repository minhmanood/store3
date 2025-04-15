import React from 'react'
const onSubmitHanler=()=>{
   event.preventDefault()
}
const NewsletterBox = () => {
  return (
    <div className='text-center '>
        <p className='text-2xl font-medium text-gray-800'>Nhận ngay voucher 20% khi đăng nhập ngây </p>
        <p className='text-gray-500 mt-3'>Đăng ký để nhận được thông tin sản phẩm mới nhất</p>
        <form onSubmit={onSubmitHanler} action="">
            <input type="email" placeholder='Nhập email của bạn' className='border-2 border-gray-300  p-2 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto mt-5 ' required/>
            <button className='bg-gray-800 text-white px-4 py-2  mx-auto mt-5'>Đăng ký</button>     
        </form>
    </div>
  )
}

export default NewsletterBox

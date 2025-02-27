import React from 'react'
import { assets } from '../assets/assets'
import Tiltle from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Tiltle text1={'Về'} text2={'Chúng Tôi'} />
        
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.combo11} alt="" />
        <div className='flex flex-col gap-6 justify-center md:w-2/4 text-gray-500'>
        <p>Chào mừng bạn đến với Man Store, điểm đến lý tưởng dành cho các tín đồ thời trang nam! Tại Man Store, chúng tôi tự hào mang đến cho khách hàng những bộ sưu tập quần áo đa dạng, phong cách và chất lượng. Với mục tiêu đáp ứng nhu cầu thời trang của phái mạnh, chúng tôi cung cấp từ những trang phục thường ngày, công sở cho đến những bộ đồ dự tiệc sang trọng.

Chúng tôi luôn cập nhật những xu hướng mới nhất từ các thương hiệu nổi tiếng, đảm bảo rằng bạn sẽ tìm thấy những sản phẩm phù hợp nhất với phong cách cá nhân của mình. Đội ngũ nhân viên tận tình và chuyên nghiệp của Man Store sẽ sẵn sàng tư vấn và hỗ trợ bạn trong việc chọn lựa trang phục hoàn hảo.

Hãy đến với Man Store để trải nghiệm sự khác biệt trong phong cách và chất lượng thời trang!</p>
       
        </div>
      </div>
      <div className='text-4xl py-4'>
       

      </div>
      <NewsletterBox />
    </div>
  )
}

export default About

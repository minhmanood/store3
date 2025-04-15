import React,{useContext,useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';
import BMI from '../components/BMI'
import StarRating from '../components/StarRating'
import axios from 'axios'
import { toast } from 'react-toastify'
import { formatCurrency } from '../utils/formatCurrency'
import { color } from 'framer-motion';

const formatPrice = (price) => {
  return formatCurrency(price)
}

const Product = () => {
  const {productName} = useParams();
  const {products, currency, addToCart, backendUrl} = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [color, setColors] = useState('')
  const [loading, setLoading] = useState(true)
  const [ratings, setRatings] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [totalRatings, setTotalRatings] = useState(0)
  const [productId, setProductId] = useState(null)
  const [showAnimation, setShowAnimation] = useState(false)

  const formatUrlName = (name) => {
    return name.trim().replace(/\s+/g, '-');
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN')
  }

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (!products || products.length === 0) {
          const response = await axios.post(`${backendUrl}/api/product/list`)
          if (response.data.success) {
            const product = response.data.products.find(item => formatUrlName(item.name) === productName)
            if (product) {
              setProductData(product)
              setProductId(product._id)
              setImage(product.image[0])
            }
          }
        } else {
          const product = products.find(item => formatUrlName(item.name) === productName)
          if (product) {
            setProductData(product)
            setProductId(product._id)
            setImage(product.image[0])
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProductData()
  }, [productName, products, backendUrl])

  const fetchRatings = async () => {
    if (!productId) return;
    
    try {
      const response = await axios.get(`${backendUrl}/api/ratings/product/${productId}`)
      if (response.data.success) {
        setRatings(response.data.ratings)
        setAverageRating(response.data.averageRating)
        setTotalRatings(response.data.totalRatings)
      }
    } catch (error) {
      console.error('Error fetching ratings:', error)
    }
  }

  useEffect(() => {
    if (productId) {
      fetchRatings()
    }
  }, [productId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Không tìm thấy sản phẩm</div>
      </div>
    )
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img 
                  key={index} 
                  src={item} 
                  alt="" 
                  onClick={() => setImage(item)}
                  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="" className='w-full h-auto'/>
          </div>
        </div>
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              {[1, 2, 3, 4, 5].map((star) => (
                <img 
                  key={star}
                  className='w-3.5' 
                  src={star <= Math.round(averageRating) ? assets.starlight : assets.stardark} 
                  alt="" 
                />
              ))}
              <p className='pl-2'>({totalRatings} đánh giá)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{formatPrice(productData.price)}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
           
            <div className='flex flex-col gap-4 my-8 relative'>
              <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center'>
                <div>
                  <p>Kích cở</p>
                  <div className='flex gap-2'>
                    {productData.sizes.map((item,index)=>(
                      <div key={index} 
                        onClick={()=>setSize(item)}
                        className={`px-2 sm:px-3 sm:py-1 border cursor-pointer ${
                          size === item ? 'bg-black text-white' : 'bg-slate-50'
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <BMI />
              </div>
            </div>
            
            <div className='flex flex-col gap-4 my-8 relative'>
              <p>Màu sắc</p>
              <div className='flex gap-2'>
                {productData.colors.map((item,index)=>(
                  <div key={index} 
                    onClick={()=>setColors(item)}
                    className={`px-2 sm:px-3 sm:py-1 border cursor-pointer flex items-center gap-2 ${
                      color === item ? 'ring-2 ring-black' : 'bg-slate-50'
                    }`}
                  >
                    <span 
                      className="w-4 h-4 rounded-full" 
                      style={{
                        backgroundColor: 
                          item === 'Đỏ' ? '#ff0000' :
                          item === 'Xanh dương' ? '#0000ff' :
                          item === 'Xanh lá' ? '#00ff00' :
                          item === 'Đen' ? '#000000' :
                          item === 'Trắng' ? '#ffffff' :
                          item === 'Vàng' ? '#ffff00' :
                          item === 'Hồng' ? '#ffc0cb' :
                          item === 'Tím' ? '#800080' : '#cccccc',
                        border: item === 'Trắng' ? '1px solid #ccc' : 'none'
                      }}
                    ></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
           
            <div className="relative">
              <button 
                onClick={() => {
                  if (!size) {
                    toast.warning('Vui lòng chọn kích thước');
                    return;
                  }
                  if (!color) {
                    toast.warning('Vui lòng chọn màu sắc');
                    return;
                  }
                  addToCart(productData._id, size, color);
                  setShowAnimation(true);
                  setTimeout(() => {
                    setShowAnimation(false);
                    setSize('');
                    setColors('');
                  }, 800);
                }} 
                className='bg-black mb-4 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors'
              >
                Thêm vào giỏ hàng
              </button>
              
                
              {/* Add to cart animation */}
              {showAnimation && (
                <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <div className='animate-fly-to-cart'>
                    <img 
                      src={image} 
                      alt={productData.name} 
                      className='w-20 h-20 object-cover rounded-lg shadow-lg'
                    />
                  </div>
                </div>
              )}
              
            </div>
        </div>
        
      </div>
      
      {/* Phần đánh giá sản phẩm */}
      <div className='mt-20 border-t pt-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch'>
          {/* Phần form đánh giá */}
          <div>
            <StarRating productId={productId} onRatingSubmit={fetchRatings} />
          </div>
          {/* Phần hiển thị đánh giá */}
          <div>
            {ratings.length > 0 && (
              <div className="p-4 border rounded-lg h-full">
                <h3 className="text-xl font-medium mb-4">Đánh giá từ khách hàng ({totalRatings})</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <img
                          key={star}
                          className='w-5'
                          src={star <= Math.round(averageRating) ? assets.starlight : assets.stardark}
                          alt=""
                        />
                      ))}
                    </div>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto pr-4">
                    {ratings.map((rating, index) => (
                      <div key={index} className="border-b pb-4 mb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <img 
                            src={rating.userId?.avatar || assets.profile_pic} 
                            alt="User" 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{rating.userId?.name || 'Người dùng ẩn danh'}</p>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <img
                                  key={star}
                                  className='w-4'
                                  src={star <= rating.rating ? assets.starlight : assets.stardark}
                                  alt=""
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        {rating.comment && (
                          <p className="mt-2 text-gray-600 ml-13">{rating.comment}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1 ml-13">
                          {formatDate(rating.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Phần sản phẩm liên quan */}
      <div className='mt-20 border-t pt-10'>
        <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
      </div>
    </div>
  )
}

export default Product

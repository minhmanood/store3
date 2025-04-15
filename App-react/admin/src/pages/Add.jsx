import React, { useState } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import {backendUrl} from '../App'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Add = ({token}) => {
  const [image1,setImage1]=useState(false)
  const [image2,setImage2]=useState(false)
  const [image3,setImage3]=useState(false)
  const [image4,setImage4]=useState(false)

  const [name,setName]=useState('');
  const [description,setDescription]=useState('')
  const [price,setPrice]= useState('')
  const [category,setCategory]= useState('Men')
  const [subCategory,setSubCategory]= useState('Thu')
  const [bestseller,setBestseller]=useState(false)
  const [sizes,setSizes]=useState([])
  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    setName('')
    setDescription('')
    setImage1(null)
    setImage2(null)
    setImage3(null)
    setImage4(null)
    setPrice('')
    setBestseller(false)
    setSizes([])
    setCategory('Men')
    setSubCategory('Thu')
  }

  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    try {
      if (!image1) {
        toast.warning('Vui lòng chọn ít nhất 1 hình ảnh')
        return
      }

      if (sizes.length === 0) {
        toast.warning('Vui lòng chọn ít nhất 1 kích thước')
        return
      }

      setLoading(true)

      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("subColor", subColor)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      if (image1) formData.append("image1", image1)
      if (image2) formData.append("image2", image2)
      if (image3) formData.append("image3", image3)
      if (image4) formData.append("image4", image4)

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            token,
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      console.log('API Response:', response.data)

      if (response.data && response.data.success === true) {
        toast.success('Thêm sản phẩm thành công!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        resetForm()
      } else {
        const errorMsg = response.data?.message || 'Có lỗi xảy ra khi thêm sản phẩm'
        toast.error(errorMsg)
      }
    } catch (error) {
      console.error('Error adding product:', error)
      const errorMsg = error.response?.data?.message || error.message || 'Có lỗi xảy ra khi thêm sản phẩm'
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Tải lên hình ảnh</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20 border border-gray-300' src={!image1 ? assets.upload : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden accept="image/*" />
          </label>
          <label htmlFor="image2">
            <img className='w-20 border border-gray-300' src={!image2 ? assets.upload : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden accept="image/*" />
          </label>
          <label htmlFor="image3">
            <img className='w-20 border border-gray-300' src={!image3 ? assets.upload : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden accept="image/*" />
          </label>
          <label htmlFor="image4">
            <img className='w-20 border border-gray-300' src={!image4 ? assets.upload : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden accept="image/*" />
          </label>
        </div>
      </div>
     
      <div className='w-full'>
        <p className='mb-2'>Tên sản phẩm</p>
        <input 
          onChange={(e)=>setName(e.target.value)} 
          value={name} 
          className='w-full max-w-[500px] px-3 py-2 border rounded' 
          type="text" 
          placeholder='Nhập tên sản phẩm' 
          required 
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Mô tả sản phẩm</p>
        <textarea 
          onChange={(e)=>setDescription(e.target.value)} 
          value={description} 
          className='w-full max-w-[500px] px-3 py-2 min-h-[100px] border rounded' 
          placeholder='Nhập mô tả sản phẩm' 
          required 
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p>Danh mục</p>
          <select onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full px-3 py-3 border rounded'>
            <option value="Men">Nam</option>
            <option value="Women">Nữ</option>
            <option value="Kids">Trẻ em</option>
           
          </select>
        </div>

        <div>
          <p>Loại sản phẩm</p>
          <select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-3 border rounded'>
            <option value="Tshirt">Áo Thun</option>
            <option value="shirt">Áo Sơ Mi</option>
            <option value="longpants">Quần dài</option>
            <option value="pants">Quần Ngắn</option>
            <option value="cosmetics">Mỹ Phẩm</option>
            <option value="jewelry">Trang Sức</option>
          </select>
        </div>
       

        <div>
          <p className='mb-2'>Giá (VNĐ)</p>
          <input 
            onChange={(e)=>setPrice(e.target.value)} 
            value={price}
            className='w-full px-3 py-2 sm:w-[120px] border rounded' 
            type="number" 
            placeholder='Nhập giá'
            required
          />
        </div>
      </div>

      <div>
        <p className='mb-2'>Kích thước</p>
        <div className='flex gap-3'>
          <div onClick={()=>setSizes(prev =>prev.includes("S") ? prev.filter(item=>item !=="S"):[...prev,"S"])}>
            <p className={`${sizes.includes("S") ? "bg-pink-300":"bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>S</p>
          </div>

          <div onClick={()=>setSizes(prev=>prev.includes("M") ? prev.filter(item=>item !=="M"):[...prev,"M"])}>
            <p className={`${sizes.includes("M") ? "bg-pink-300":"bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>M</p>
          </div>

          <div onClick={()=>setSizes(prev=>prev.includes("L") ? prev.filter(item=>item !=="L"):[...prev,"L"])}>
            <p className={`${sizes.includes("L") ? "bg-pink-300":"bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>L</p>
          </div>

          <div onClick={()=>setSizes(prev=>prev.includes("XL") ? prev.filter(item=>item !=="XL"):[...prev,"XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-pink-300":"bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>XL</p>
          </div>

          <div onClick={()=>setSizes(prev=>prev.includes("XXL") ? prev.filter(item=>item !=="XXL"):[...prev,"XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-300":"bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input 
          onChange={()=>setBestseller(prev=>!prev)} 
          checked={bestseller} 
          type="checkbox" 
          id='bestseller'
        />
        <label className='cursor-pointer' htmlFor="bestseller">Thêm vào Bán chạy nhất</label>
      </div>

      <button 
        type='submit' 
        disabled={loading}
        className={`w-28 py-3 text-white rounded ${loading ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'} transition-colors`}
      >
        {loading ? 'Đang thêm...' : 'Thêm'}
      </button>
    </form>
  )
}

export default Add

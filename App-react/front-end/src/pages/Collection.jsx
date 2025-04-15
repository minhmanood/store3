import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { useLocation } from 'react-router-dom'

const Collection = () => {
  const location = useLocation()
  const {products,search,showSearch} = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')
  const toggleCategory = (e)=>{
    if(
      category.includes(e.target.value)
    ){
      setCategory(prev=>prev.filter(item=>item !== e.target.value))
    }
    else{
      setCategory(prev=>[...prev, e.target.value])
    }
  }


    const toggleSubCategory = (e)=>{
      if(
        subCategory.includes(e.target.value)
      ){
        setSubCategory(prev=>prev.filter(item=>item !== e.target.value))
      }
      else{
        setSubCategory(prev=>[...prev, e.target.value])
      } 
    }
    const applyFilter = ()=>{
      let productsCopy = products.slice()
      if(showSearch&&search){
        productsCopy = productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
      }
      if(category.length > 0){
        productsCopy = productsCopy.filter(item=>category.includes(item.category))
      }
      if(subCategory.length > 0){
        productsCopy = productsCopy.filter(item=>subCategory.includes(item.subCategory))
      }
      setFilterProducts(productsCopy)
    }
    const sortProducts = ()=>{
    let fpCopy = filterProducts.slice()
    switch(sortType){
     case 'low-hight':
      setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)))
      break;
     case 'hight-low':
       setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)))
      break;
      default:
        applyFilter()
        break;
      
  
    }
    }

  
  useEffect(()=>{
    applyFilter()
  },[category, subCategory,search,showSearch,products])
  useEffect(()=>{
    sortProducts()
  },[sortType])
  useEffect(() => {
    if (location.state?.subCategory) {
      setSubCategory(location.state.subCategory)
    }
  }, [location.state])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
     {/*   */} 
     <div className='min-w-60'>
      <div className='sm:sticky sm:top-4'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'> BỘ LỌC
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90':''}`} src={assets.dropdown} alt="" />
        </p>
        {/*CATEGORY */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden sm:block'}`}>
          <p className='mb-3 text-sm font-medium'>Giới tính</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} />Thời trang Nam
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} />Thời trang Nữ
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} />Trẻ em
            </p>
          </div>
        </div>
        {/*TYPE */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden sm:block'}`}>
          <p className='mb-3 text-sm font-medium'>Loại sản phẩm </p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Tshirt'} onChange={toggleSubCategory} />Áo thun
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'shirt'} onChange={toggleSubCategory} />Áo sơ mi
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'longpants'} onChange={toggleSubCategory} />Quần dài
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'pants'} onChange={toggleSubCategory} />Quần ngắn
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'cosmetics'} onChange={toggleSubCategory} />Mỹ Phẩm
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'jewelry'} onChange={toggleSubCategory} />Trang sức
            </p>
          </div>
        </div>
      </div>
     </div>
     {/*Right slide */}
     <div className='flex-1'>

      <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <Title text1={'TẤT CẢ'} text2={'SẢN PHẨM'}/>
        {/*Filter */}
        <select onChange={e=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2' name="" id="">
          <option value="relavent" >Mặt định</option>
          <option value="low-hight">THẤP ĐẾN CAO</option>
          <option value="hight-low">CAO ĐẾN THẤP</option>
        </select>
      </div>
      {/*map product */}
      <div className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
      filterProducts.map((item,index)=>(
        <ProductItem 
          key={index} 
          id={item._id} 
          image={item.image} 
          name={item.name} 
          price={item.price}
          sizes={item.sizes}
          
        />
      ))
    }
      </div>
    
     </div>

    </div>
  )
}

export default Collection

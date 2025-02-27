import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {
 const [list,setList]= useState([])
 const fetchList=async()=>{
    try {
        const reponse=await axios.post(backendUrl+'/api/product/list')
       if(reponse.data.success){
        setList(reponse.data.products)
       }
       else{
        toast.error(reponse.data.message)
       }
        
    } catch (error) {
        console.log(error)
        toast.error(error.message)
        
    }}

    const removeProduct = async (id)=>{
        try {
          const reponse= await axios.post(backendUrl+'/api/product/remove',{id},{headers:{token}})  
          if(reponse.data.success){
            toast.success(reponse.data.message)
            await fetchList()
          }else{
            toast.error(reponse.data.message)
          }
        } catch (error) {
            console.log(error)
        toast.error(error.message)
        }
    }
 
 useEffect(()=>{
fetchList()
 },[])
  return (
   <>
   <p className='mb-2'>All Products List</p>
   <div className='flex flex-col gap-2'>
    {/* {} */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] gap-2 items-center py-1 px-2 border bg-gray-200 text-sm'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className='text-center'>Action</b>
        </div>


        {
            list.map((item,index)=>(
                <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center  py-1 px-2 border text-sm ' key={index}>
                    <img className='w-12' src={item.image[0]} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{item.price}{currency}</p>
                    <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
                </div>
            ))
        }
   </div>

   </>
  )
}

export default List

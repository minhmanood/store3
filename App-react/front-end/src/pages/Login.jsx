import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState,setCurrentState]=useState('Đăng nhập')
  const { token, setToken, navigate, backendUrl, setUserId } = useContext(ShopContext)
  const[name,setName]=useState('')
  const[password,setPassword]=useState('')
  const[email,setEmail]=useState('')
  const onsubmitHanler=async(event)=>{
    event.preventDefault()
    try {
      if(currentState==='Đăng kí'){
        const reponse= await axios.post(backendUrl+'/api/user/register',{name,email,password})
        if(reponse.data.success){
          setToken(reponse.data.token)
          setUserId(reponse.data.userId)
          localStorage.setItem('token',reponse.data.token)
          localStorage.setItem('userId',reponse.data.userId)
        }else{
          toast.error(reponse.data.message)
        }
        
      }else{
        const reponse=await axios.post(backendUrl+'/api/user/login',{email,password})
       if(reponse.data.success){
        setToken(reponse.data.token)
        setUserId(reponse.data.userId)
        localStorage.setItem('token',reponse.data.token)
        localStorage.setItem('userId',reponse.data.userId)
       }else{
        toast.error(reponse.data.message)
       }
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }

  }
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
   <form onSubmit={onsubmitHanler} action="" className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-400'>
    <div className='inline-flex gap-2 mb-2 mt-10 items-center'>
      <p className='prata-regular text-3xl'>{currentState}</p>
      <hr />

     
    </div>
    {currentState==='Đăng nhập'?'':<input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full border p-2 rounded-lg border-gray-400 outline-none bg-transparent text-gray-400 placeholder:text-gray-400' placeholder='Name' />}
    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" className='w-full border rounded-lg p-2 border-gray-400 outline-none bg-transparent text-gray-400 placeholder:text-gray-400' placeholder='Email'/>
    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full rounded-lg  border p-2  border-gray-400 outline-none bg-transparent text-gray-400 placeholder:text-gray-400' placeholder='Password'/>
    <div className='w-full flex justify-between text-sm mt-[-8px]'>
      <p className='cursor-pointer'>Quên mật khẩu</p>
      {
        currentState==='Đăng nhập'
        ?<p onClick={()=>setCurrentState('Đăng kí')} className='cursor-pointer'>Tạo tài khoản</p>
        :<p onClick={()=>setCurrentState('Đăng nhập')} className='cursor-pointer'>Đăng Nhập ngay</p>
      }
      
    </div>
    <button className='w-full bg-black text-white py-2 rounded-full'>{currentState === 'Đăng nhập' ?  'Đăng kí' : 'Đăng kí'}</button>
   </form>
  
  )
}

export default Login

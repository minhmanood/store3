import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route,Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import User from './pages/User'
import Login from './components/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import 'antd/dist/reset.css';
import Voucher from'./pages/ListVoucher'

export const backendUrl=import.meta.env.VITE_BACKEND_URL
export const currency='Vnd'

const App = () => {
  const[token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  return (
    <div className='bg-gray-100 min-h-screen'> 
    <ToastContainer/>
    {token ===""
    ?<Login setToken={setToken}/>:
    <>
     <Navbar setToken={setToken}/>
      <div className='flex w-full min-h-[calc(100vh-57px)]'>
        <div className='w-[240px] flex-shrink-0'>
          <Sidebar/>
        </div>
        <div className='flex-1 p-6 mx-6 my-6 bg-white rounded-lg shadow-sm'>
          <Routes>
            <Route path='/' element={<Add token={token} />}/>
            <Route path='/add' element={<Add token={token} />}/>
            <Route path='/list' element={<List token={token} />}/>
            <Route path='/orders' element={<Orders token={token} />}/>
            <Route path='/users' element={<User token={token} />}/>
            <Route path='/voucher' element={<Voucher token={token} />}/>
          </Routes>
        </div>
      </div>
    </> }
    </div>
  )
}

export default App

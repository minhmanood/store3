import React from 'react'
import { assets } from '../assets/assets'
const Navbar = ({setToken}) => {
  return (
    <>
      <div className='h-[57px]'></div>
      <div className='flex items-center h-[57px] px-6 justify-between fixed top-0 left-0 right-0 bg-white z-50 shadow-sm transition-all duration-200'>
        <div className='flex items-center gap-3'>
          <img className='h-8' src={assets.logo} alt="" />
          <div className='h-6 w-px bg-gray-200 hidden sm:block'></div>
          <span className='text-base font-medium text-gray-800 hidden sm:block'>Admin Dashboard</span>
        </div>
        <button 
          onClick={()=>setToken('')} 
          className='inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 px-3 py-1.5 rounded-lg text-sm'
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          Logout
        </button>
      </div>
    </>
  )
}

export default Navbar

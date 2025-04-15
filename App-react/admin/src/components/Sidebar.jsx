import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='fixed top-[57px] bottom-0 w-[240px] bg-white border-r'>
      <div className='flex flex-col gap-2 py-4 px-3 overflow-y-auto h-full'>
        <div className='px-3 py-2 mb-2'>
          <h2 className='text-xs font-semibold text-gray-400 uppercase'>Menu</h2>
        </div>
        <NavLink 
          className={({isActive}) => 
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
            }`
          } 
          to="/add"
        >
          <img className='w-5 h-5' src={assets.add} alt="" />
          <p className='hidden md:block text-sm'>Add items</p>
        </NavLink>
        <NavLink 
          className={({isActive}) => 
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
            }`
          }
          to="/list"
        >
          <img className='w-5 h-5' src={assets.items} alt="" />
          <p className='hidden md:block text-sm'>List items</p>
        </NavLink>
        <NavLink 
          className={({isActive}) => 
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
            }`
          }
          to="/orders"
        >
          <img className='w-5 h-5' src={assets.items} alt="" />
          <p className='hidden md:block text-sm'>Orders</p>
        </NavLink>
        <NavLink 
          className={({isActive}) => 
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
            }`
          }
          to="/users"
        >
          <img className='w-5 h-5' src={assets.items} alt="" />
          <p className='hidden md:block text-sm'>Quản lý người dùng</p>
        </NavLink>
      
      </div>
    </div>
  )
}

export default Sidebar

import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)
  
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
    toast.success('Man Store cảm ơn quý khách , mong quý khách sớm quay lại đây nhé')
    setToken('')
    setCartItems({})
  }

  return (
    <div className='relative'>
      <div className='flex items-center justify-between py-5 font-medium'>
        {/* Menu Button */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className='flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors'
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <span className='text-sm font-medium'></span>
        </button>
         <Link to='/'><h1 className='text-3xl font-medium'>Man Store</h1></Link>
        {/* Icons */}
        <div className='flex items-center gap-6'>
          <img onClick={() => setShowSearch(true)} src={assets.search} className='w-5 cursor-pointer' alt="" />

          <div className='group relative'>
            <img onClick={() => token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.avt} alt="" />
            {token &&
              <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-white shadow-lg text-gray-500 rounded-lg'>
                  <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black transition-colors'>TÀI KHOẢN CỦA TÔI</p>
                  <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black transition-colors'>ĐƠN HÀNG CỦA TÔI</p>
                  <p onClick={logout} className='cursor-pointer hover:text-black transition-colors'>ĐĂNG XUẤT </p>
                </div>
              </div>}
          </div>

          <Link to='/cart' className='relative'>
            <img src={assets.cart} className='w-5 min-w-5' alt="" />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[-8px]'>{getCartCount()}</p>
          </Link>
        </div>
      </div>

      {/* Animated Menu */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      />
      
      <div className={`fixed top-0 left-0 bottom-0 w-72 bg-white shadow-lg z-50 transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='p-6 flex flex-col h-full'>
          {/* Menu Header */}
          <div className='flex items-center justify-between mb-8'>
            <h2 className='text-xl font-semibold text-gray-900'>Menu</h2>
            <button onClick={() => setMenuOpen(false)} className='text-gray-500 hover:text-gray-700'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Links */}
          <nav className='flex flex-col gap-4'>
            <NavLink 
              to='/' 
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => 
                `text-lg font-medium transition-all duration-200 ${isActive ? 'text-blue-600 translate-x-2' : 'text-gray-600 hover:text-gray-900 hover:translate-x-1'}`
              }
            >
              TRANG CHỦ
            </NavLink>
            <NavLink 
              to='/collection'
              onClick={() => setMenuOpen(false)} 
              className={({ isActive }) => 
                `text-lg font-medium transition-all duration-200 ${isActive ? 'text-blue-600 translate-x-2' : 'text-gray-600 hover:text-gray-900 hover:translate-x-1'}`
              }
            >
              SẢN PHẨM
            </NavLink>
            <NavLink 
              to='/about'
              onClick={() => setMenuOpen(false)} 
              className={({ isActive }) => 
                `text-lg font-medium transition-all duration-200 ${isActive ? 'text-blue-600 translate-x-2' : 'text-gray-600 hover:text-gray-900 hover:translate-x-1'}`
              }
            >
              THÔNG TIN
            </NavLink>
            <NavLink 
              to='/contact'
              onClick={() => setMenuOpen(false)} 
              className={({ isActive }) => 
                `text-lg font-medium transition-all duration-200 ${isActive ? 'text-blue-600 translate-x-2' : 'text-gray-600 hover:text-gray-900 hover:translate-x-1'}`
              }
            >
              LIÊN HỆ
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar

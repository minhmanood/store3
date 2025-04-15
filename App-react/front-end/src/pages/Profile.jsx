import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Title from '../components/Title'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { token, backendUrl } = useContext(ShopContext)
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/get-user`, {
          headers: { token }
        })
        if (response.data.success) {
          setUserInfo(response.data.user)
          setFormData({
            name: response.data.user.name || '',
            phone: response.data.user.phone || ''
          })
        } else {
          toast.error(response.data.message || 'Không thể tải thông tin người dùng')
        }
      } catch (error) {
        toast.error('Không thể tải thông tin người dùng')
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchUserInfo()
    } else {
      setLoading(false)
    }
  }, [token, backendUrl])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Mật khẩu mới không khớp')
      return
    }
    try {
      const response = await axios.put(
        `${backendUrl}/api/user/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success('Đổi mật khẩu thành công')
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
        // Redirect to login after password change
        navigate('/login')
      } else {
        toast.error(response.data.message || 'Không thể đổi mật khẩu')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Không thể đổi mật khẩu')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`${backendUrl}/api/user/update`, formData, {
        headers: { token }
      })
      if (response.data.success) {
        setUserInfo(response.data.user)
        setEditing(false)
        toast.success('Cập nhật thông tin thành công')
      } else {
        toast.error(response.data.message || 'Không thể cập nhật thông tin')
      }
    } catch (error) {
      toast.error('Không thể cập nhật thông tin')
    }
  }

  if (!token) {
    return <div className="text-center py-8">Vui lòng đăng nhập để xem thông tin tài khoản</div>
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  }

  if (!userInfo) {
    return <div className="text-center py-8">Không thể tải thông tin người dùng</div>
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center">
        <Title text1="Thông tin" text2="tài khoản" />
        <button
          onClick={() => setEditing(!editing)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {editing ? 'Hủy' : 'Chỉnh sửa'}
        </button>
      </div>
      
      <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium text-gray-900">Thông tin cá nhân</h3>
              {editing ? (
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Họ và tên</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Số điện thoại</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-4 grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Họ và tên</p>
                    <p className="mt-1 text-sm text-gray-900">{userInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="mt-1 text-sm text-gray-900">{userInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Số điện thoại</p>
                    <p className="mt-1 text-sm text-gray-900">{userInfo.phone || 'Chưa cập nhật'}</p>
                  </div>
                </div>
              )}
            </div>

            {userInfo.address && (
              <div>
                <h3 className="text-lg font-medium text-gray-900">Địa chỉ mặc định</h3>
                <div className="mt-4">
                  <p className="text-sm text-gray-900">
                    {userInfo.address.street && `${userInfo.address.street}, `}
                    {userInfo.address.city && `${userInfo.address.city}`}
                    {userInfo.address.state && <br />}
                    {userInfo.address.state && `${userInfo.address.state}, `}
                    {userInfo.address.country && `${userInfo.address.country}`}
                    {userInfo.address.zipcode && <br />}
                    {userInfo.address.zipcode}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Password Change Section */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900">Đổi mật khẩu</h3>
            <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                  minLength="6"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Mật khẩu mới</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                  minLength="6"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                  minLength="6"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Đổi mật khẩu
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Profile

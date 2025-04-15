import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const ListVoucher = ({ token }) => {
  const [vouchers, setVouchers] = useState([])
  const [loading, setLoading] = useState(false)
  const [newVoucher, setNewVoucher] = useState({
    code: '',
    discount: '',
    expiryDate: '',
    maxUses: '',
    description: ''
  })

  // Fetch vouchers
  const fetchVouchers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/voucher/list`, {
        headers: { token }
      })
      setVouchers(response.data.vouchers)
    } catch (error) {
      toast.error('Lỗi khi tải danh sách voucher')
    }
  }

  useEffect(() => {
    fetchVouchers()
  }, [token])

  // Add new voucher
  const handleAddVoucher = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await axios.post(`${backendUrl}/api/voucher/add`, newVoucher, {
        headers: { token }
      })
      toast.success('Thêm voucher thành công')
      fetchVouchers()
      setNewVoucher({
        code: '',
        discount: '',
        expiryDate: '',
        maxUses: '',
        description: ''
      })
    } catch (error) {
      toast.error('Lỗi khi thêm voucher')
    } finally {
      setLoading(false)
    }
  }

  // Delete voucher
  const handleDeleteVoucher = async (voucherId) => {
    if (window.confirm('Bạn có chắc muốn xóa voucher này?')) {
      try {
        await axios.delete(`${backendUrl}/api/voucher/delete/${voucherId}`, {
          headers: { token }
        })
        toast.success('Xóa voucher thành công')
        fetchVouchers()
      } catch (error) {
        toast.error('Lỗi khi xóa voucher')
      }
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Quản lý Voucher</h2>
      
      {/* Add Voucher Form */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Thêm Voucher Mới</h3>
        <form onSubmit={handleAddVoucher} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Mã voucher"
              value={newVoucher.code}
              onChange={(e) => setNewVoucher({...newVoucher, code: e.target.value})}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Mức giảm giá (%)"
              value={newVoucher.discount}
              onChange={(e) => setNewVoucher({...newVoucher, discount: e.target.value})}
              className="border p-2 rounded"
              required
              min="1"
              max="100"
            />
            <input
              type="datetime-local"
              value={newVoucher.expiryDate}
              onChange={(e) => setNewVoucher({...newVoucher, expiryDate: e.target.value})}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Số lần sử dụng tối đa"
              value={newVoucher.maxUses}
              onChange={(e) => setNewVoucher({...newVoucher, maxUses: e.target.value})}
              className="border p-2 rounded"
              required
              min="1"
            />
            <input
              type="text"
              placeholder="Mô tả"
              value={newVoucher.description}
              onChange={(e) => setNewVoucher({...newVoucher, description: e.target.value})}
              className="border p-2 rounded md:col-span-2"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            {loading ? 'Đang thêm...' : 'Thêm Voucher'}
          </button>
        </form>
      </div>

      {/* Vouchers List */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giảm giá</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hết hạn</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Còn lại</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mô tả</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vouchers.map((voucher) => (
                <tr key={voucher._id}>
                  <td className="px-6 py-4">{voucher.code}</td>
                  <td className="px-6 py-4">{voucher.discount}%</td>
                  <td className="px-6 py-4">{new Date(voucher.expiryDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{voucher.maxUses - voucher.usedCount}</td>
                  <td className="px-6 py-4">{voucher.description}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteVoucher(voucher._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ListVoucher
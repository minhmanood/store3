import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const EditProduct = ({ token }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        sizes: [],
        image: []
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.post(
                    `${backendUrl}/api/product/get`,
                    { id },
                    { headers: { token } }
                );
                
                if(response.data.success) {
                    setProduct(response.data.product);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error('Không thể tải thông tin sản phẩm');
                console.error('API Error:', error.response?.data || error.message);
                navigate('/list');
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                backendUrl+'/api/product/update',
                { id, ...product },
                { headers: { token } }
            );
            
            if(response.data.success) {
                toast.success('Cập nhật sản phẩm thành công');
                navigate('/list');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Lỗi khi cập nhật sản phẩm');
            console.error(error);
        }
    };

    if (!product.name) return <div>Đang tải...</div>;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Chỉnh sửa sản phẩm</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Tên sản phẩm</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                
                <div>
                    <label className="block mb-1">Mô tả</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows="3"
                    />
                </div>
                
                <div>
                    <label className="block mb-1">Giá</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                
                <div>
                    <label className="block mb-1">Danh mục</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Lưu thay đổi
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
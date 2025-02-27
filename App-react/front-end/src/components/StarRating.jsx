import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const StarRating = ({ productId, onRatingSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const { backendUrl, token } = useContext(ShopContext);

    const handleRatingSubmit = async () => {
        if (!token) {
            setError('Vui lòng đăng nhập để đánh giá sản phẩm');
            return;
        }

        if (!rating) {
            setError('Vui lòng chọn số sao đánh giá');
            return;
        }

        if (!productId) {
            setError('Không tìm thấy thông tin sản phẩm');
            return;
        }

        try {
            const response = await axios.post(
                `${backendUrl}/api/ratings/add`, 
                { 
                    productId: productId.toString(), 
                    rating, 
                    comment 
                },
                { 
                    headers: { 
                        'Content-Type': 'application/json',
                        'token': token 
                    } 
                }
            );
            
            if (response.data.success) {
                setRating(0);
                setComment('');
                setError('');
                if (onRatingSubmit) {
                    onRatingSubmit();
                }
                alert('Cảm ơn bạn đã đánh giá!');
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra khi gửi đánh giá';
            setError(errorMessage);
        }
    };

    return (
        <div className="p-4 border rounded-lg h-full">
            <h3 className="text-xl font-medium mb-4">Đánh giá sản phẩm</h3>
            {error && (
                <div className="text-red-500 mb-4">{error}</div>
            )}
            <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        className="focus:outline-none"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <img
                            src={(hover || rating) >= star ? assets.starlight : assets.stardark}
                            alt={`star ${star}`}
                            className="w-6 h-6"
                        />
                    </button>
                ))}
                <span className="ml-2 text-gray-600">
                    {rating ? `${rating} sao` : 'Chưa đánh giá'}
                </span>
            </div>
            <textarea
                className="w-full p-2 border rounded-lg mb-4"
                rows="3"
                placeholder="Nhập nhận xét của bạn (không bắt buộc)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                onClick={handleRatingSubmit}
                disabled={!rating}
            >
                Gửi đánh giá
            </button>
        </div>
    );
};

export default StarRating;

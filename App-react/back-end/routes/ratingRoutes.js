import express from 'express';
import Rating from '../models/Rating.js';
import User from '../models/userModels.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Add a new rating
router.post('/add', async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const token = req.headers.token;
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Vui lòng đăng nhập để đánh giá' 
            });
        }

        // Verify token and get user
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Validate productId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ 
                success: false, 
                message: 'ID sản phẩm không hợp lệ' 
            });
        }

        // Check if user has already rated this product
        const existingRating = await Rating.findOne({ productId, userId });
        if (existingRating) {
            return res.status(400).json({ 
                success: false, 
                message: 'Bạn đã đánh giá sản phẩm này rồi' 
            });
        }

        const newRating = new Rating({
            productId,
            userId,
            rating,
            comment
        });
        await newRating.save();
        res.json({ success: true, message: 'Đánh giá đã được lưu' });
    } catch (error) {
        console.error('Error adding rating:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false, 
                message: 'Token không hợp lệ' 
            });
        }
        res.status(500).json({ 
            success: false, 
            message: error.name === 'ValidationError' 
                ? 'Dữ liệu đánh giá không hợp lệ' 
                : 'Lỗi khi lưu đánh giá' 
        });
    }
});

// Get ratings for a product
router.get('/product/:productId', async (req, res) => {
    try {
        // Validate productId
        if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
            return res.status(400).json({ 
                success: false, 
                message: 'ID sản phẩm không hợp lệ' 
            });
        }

        // Fetch ratings with basic user info
        const ratings = await Rating.find({ productId: req.params.productId })
            .populate('userId', 'name email avatar')
            .sort({ createdAt: -1 })
            .lean(); // Use lean() for better performance

        // Handle case where user was deleted
        const processedRatings = ratings.map(rating => ({
            ...rating,
            userId: rating.userId || {
                name: 'Người dùng ẩn danh',
                email: '',
                avatar: ''
            }
        }));
        
        const totalRatings = processedRatings.length;
        const averageRating = totalRatings > 0
            ? processedRatings.reduce((acc, curr) => acc + curr.rating, 0) / totalRatings
            : 0;

        res.json({
            success: true,
            ratings: processedRatings,
            totalRatings,
            averageRating
        });
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Lỗi khi lấy đánh giá',
            error: error.message 
        });
    }
});

export default router;

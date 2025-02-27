import jwt from 'jsonwebtoken';
import User from '../models/userModels.js';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.token;
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Không tìm thấy token xác thực' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Người dùng không tồn tại' 
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false, 
                message: 'Token không hợp lệ' 
            });
        }
        res.status(500).json({ 
            success: false, 
            message: 'Lỗi xác thực' 
        });
    }
};

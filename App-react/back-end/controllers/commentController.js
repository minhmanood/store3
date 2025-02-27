import Comment from '../models/Comment.js';

const commentController = {
    // Get all comments for a product
    getComments: async (req, res) => {
        try {
            const { productId } = req.params;
            const comments = await Comment.find({ productId }).sort({ timestamp: -1 });
            res.json(comments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Add a new comment
    addComment: async (req, res) => {
        try {
            const { productId, text, username } = req.body;
            if (!username) {
                return res.status(400).json({ message: "Username is required" });
            }
            const newComment = new Comment({
                productId,
                text,
                username
            });
            const savedComment = await newComment.save();
            res.status(201).json(savedComment);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

export default commentController;

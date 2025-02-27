import express from 'express';
import commentController from '../controllers/commentController.js';

const router = express.Router();

// Get all comments for a product
router.get('/:productId', commentController.getComments);

// Add a new comment
router.post('/', commentController.addComment);

export default router;

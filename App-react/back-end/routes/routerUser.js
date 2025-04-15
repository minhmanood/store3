import express from'express';
import { loginUser, registerUser, adminLogin, getUser, getAllUsers, updateUser } from '../controllers/userController.js';
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.get('/get-user', getUser)
userRouter.get('/', getAllUsers)
userRouter.put('/update', updateUser)

export default userRouter
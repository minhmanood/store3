import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/routerUser.js";
import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js";
import orderRouter from './routes/orderRoute.js' 
import commentRouter from './routes/commentRoutes.js'
import ratingRouter from './routes/ratingRoutes.js'

const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary();
//
app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/comments', commentRouter)
app.use('/api/ratings', ratingRouter)

app.get('/',(req,res)=>{
    res.send("API working")
})
app.listen(port,()=> console.log('serve start on port:'+port))

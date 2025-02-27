import orderModel from "../models/orderModels.js"
import userModel from "../models/userModels.js"




const placeOders=async(req,res)=>{
    try {
        const {userId,items,amount,address}=req.body
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }
        const newOrder= new orderModel(orderData)
        await newOrder.save()


        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Đơn hàng đã được đặt "})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}




const placeOderStripe=async(req,res)=>{

}



const placeOdersRazorpay=async(req,res)=>{

}




const allOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



const userOrders=async(req,res)=>{
        try {
            const {userId}=req.body
            const orders=await orderModel.find({userId})
            res.json({success:true,orders})
        } catch (error) {
             console.log(error);
             res.json({ success: false, message: error.message });
        }
}


const updateStatus=async(req,res)=>{
    try {
        const {orderId,status}=req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Đã cập nhật trạng thái đơn hàng"})
    } catch (error) {
        console.log(error);
        
    }

}
export{placeOderStripe,placeOders,placeOdersRazorpay,allOrders,updateStatus,userOrders}
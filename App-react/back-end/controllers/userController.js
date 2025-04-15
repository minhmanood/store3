import userModel from "../models/userModels.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
const loginUser = async (req, res) => {
    try {
        const {email,password}= req.body
        const user = await userModel.findOne({email})
        if(!user){
           return res.json({ success: false, message: "khong ton tai" }); 
        }
        const isMatch= await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:error.message})
        }
        
    } catch (error) {
        
    }
};
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "hay nhap email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "mau khau chua du manh" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const adminLogin = async (req, res) => {
    try {
        const {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password=== process.env.ADMIN_PASSWORD){
            const token =jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
          res.json({success:false,message:"invilid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
};

const getUser = async (req, res) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password');
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Vui lòng đăng nhập" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
        }

        // Update fields if provided
        if (req.body.name) user.name = req.body.name;
        if (req.body.phone) user.phone = req.body.phone;

        await user.save();
        
        // Return updated user without password
        const updatedUser = await userModel.findById(user._id).select('-password');
        res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

export { loginUser, registerUser, adminLogin, getUser, getAllUsers, updateUser };

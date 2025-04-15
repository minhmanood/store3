import userModel from "../models/userModels.js";

//them san pham vao gio hang
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size, colors } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    
    const itemKey = `${size}|${colors}`; // Combine size and colors as key
    
    if (cartData[itemId]) {
      if (cartData[itemId][itemKey]) {
        cartData[itemId][itemKey] += 1;
      } else {
        cartData[itemId][itemKey] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][itemKey] = 1;
    }
    await userModel.findByIdAndUpdate(userId, {cartData});
    res.json({ success: true, message: "Them vao gio hang" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, colors, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    const itemKey = `${size}|${colors}`; // Combine size and colors as key
    cartData[itemId][itemKey] = quantity;
    
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "ĐÃ cập nhật giỏ hàng" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };

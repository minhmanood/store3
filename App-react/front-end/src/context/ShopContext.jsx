import { createContext, useState,useEffect } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
export const ShopContext=createContext()

const ShopContextProvider=(props)=>{
    
    const delivery_Fee=20000;
    const currency='₫';
    const backendUrl =import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products,setProducts]=useState([])
    const [token, setToken]=useState('')
    const [userId, setUserId] = useState(null)
    const [discountCode, setDiscountCode] = useState('')
    const [discountAmount, setDiscountAmount] = useState(0)
    const navigate=useNavigate()

    // Discount codes with their percentages
    const availableDiscounts = {
        'SALE20': 20,
        'SALE30': 30,
        'SALE40': 40,
        'SALE50': 50
    }

    const applyDiscountCode = (code) => {
        const upperCode = code.toUpperCase();
        if (availableDiscounts[upperCode]) {
            setDiscountCode(upperCode);
            setDiscountAmount(availableDiscounts[upperCode]);
            toast.success(`Mã giảm giá ${availableDiscounts[upperCode]}% đã được áp dụng!`);
            return true;
        } else {
            toast.error('Mã giảm giá không hợp lệ');
            setDiscountCode('');
            setDiscountAmount(0);
            return false;
        }
    }

    const removeDiscountCode = () => {
        setDiscountCode('');
        setDiscountAmount(0);
    }

    const getDiscountedAmount = () => {
        const subtotal = getCartAmount();
        return Math.round((subtotal * discountAmount) / 100);
    }

    const getFinalAmount = () => {
        const subtotal = getCartAmount();
        const discount = getDiscountedAmount();
        return subtotal === 0 ? 0 : subtotal - discount + delivery_Fee;
    }

    const addToCart = async (itemId, size, colors) => {
        if (!size) {
            toast.error("Vui lòng chọn size");
            return;
        }
        if (!colors) {
            toast.error("Vui lòng chọn màu sắc");
            return;
        }
        
        let cartData = structuredClone(cartItems);
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
        
        setCartItems(cartData);
        
        if (token) {
            try {
                await axios.post(backendUrl + "/api/cart/add", 
                    { itemId, size, colors }, 
                    { headers: { token } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }
   const getCartCount=()=>{
    let totalCount=0;
    for(const items in cartItems){
        for(const item in cartItems[items]){
            try {
                if(cartItems[items][item]>0){
                    totalCount+=cartItems[items][item]
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    return totalCount
   }
   const updateQuantity=async(itemId,size,quantity)=>{
    let cartData=structuredClone(cartItems)
    cartData[itemId][size]=quantity
    setCartItems(cartData)
    if(token){
        try {
            await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
        } catch (error) {
             console.log(error);
                toast.error(error.message)
        }
    }
   }


   const getCartAmount=()=>{
    let totalAmount=0;
    for(const items in cartItems){
       let itemInfo=products.find((product)=>product._id===items)
       for(const item in cartItems[items]){
        try {
            if(cartItems[items][item]>0){
                totalAmount+=itemInfo.price*cartItems[items][item]
            }
        } catch (error) {
            console.log(error)
        }
    }
  
   }
return totalAmount
}


        const getProductsData= async ()  =>  {
                 try {
        const reponse=await axios.post(backendUrl+'/api/product/list')
      if(reponse.data.success){
        setProducts(reponse.data.products)
      }else{
        toast.error(reponse.data.message)
      }     
                 } catch (error) {
                    console.log(error);
                    toast.error(error.message)
                }
            }
            const getUserCart=async (token)=>{
                try {
                    const reponse=await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
                    if(reponse.data.success){
                        setCartItems(reponse.data.cartData)
                    }
                } catch (error) {
                     console.log(error);
                    toast.error(error.message)
                }
            }
            useEffect(()=>{
                getProductsData()
            },[])
            useEffect(() => {
                const storedToken = localStorage.getItem('token')
                const storedUserId = localStorage.getItem('userId')
                if (storedToken) {
                    setToken(storedToken)
                }
                if (storedUserId) {
                    setUserId(storedUserId)
                }
            }, [])
            useEffect(()=>{
                if(!token && localStorage.getItem('token')){
                    setToken(localStorage.getItem('token'))
                    getUserCart(localStorage.getItem('token'))
                }
            },[])

    const value={
        products,
        currency,
        delivery_Fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
        userId, 
        setUserId,
        discountCode,
        discountAmount,
        applyDiscountCode,
        removeDiscountCode,
        getDiscountedAmount,
        getFinalAmount
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
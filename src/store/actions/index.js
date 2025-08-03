import toast from "react-hot-toast";
import api from "../../api/api";

export const fetchProducts = (queryString)=>async (dispatch)=>{
    try{
        dispatch({type:"IS_FETCHING"});

        const { data } = await api.get(`/public/products?${queryString}`);        
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        });
        
        dispatch({type:"IS_SUCCESS"});
    }catch(error){
        console.log(error);
        dispatch({
            type:"IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch products",
        });
    }
};

export const fetchCategories = (queryString)=>async (dispatch)=>{
    try{
        dispatch({type:"CATEGORY_LOADER"});

        const { data } = await api.get(`/public/categories`);        
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        });
        
        dispatch({type:"CATEGORY_SUCCESS"});
    }catch(error){
        console.log(error);
        dispatch({
            type:"IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch category",
        });
    }
};

export const addToCart=(data,qty=1,toast)=>
    (dispatch,getState)=>{
        //find the product
        const { products } = getState().products;
        const getProduct = products.find(
            (item)=> item.productId===data.productId
        );
        //check for stocks
        const isQuantityExist = getProduct?.quantity >= qty;
        // if in stock add
        if(isQuantityExist){
            dispatch({
                type:"ADD_TO_CART",
                payload:{
                    ...data,
                    quantity:qty
                }
            });
            toast.success(`${data?.productName} added to cart`);
            localStorage.setItem(
                'cartItems',
                JSON.stringify(getState().carts.cart)
            );
        } else{
            toast.error("Product is out of stock");
        }
};

export const increaseCartQuantity = 
    (data,toast,currentQuantity,setCurrentQuantity)=>
    (dispatch, getState)=>{
    const { products } = getState().products;
    
    const getProduct = products.find(
        (item)=>item.productId === data.productId
    );
    
    const isQtyExist = getProduct.quantity >= (currentQuantity + 1);
    
    if (isQtyExist) {
        const newQty = currentQuantity + 1;
        setCurrentQuantity(newQty)
        dispatch({
            type: "ADD_TO_CART",
            payload: {...data, quantity: newQty}
        })
        localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));
    } else {
        toast.error("Quantity limit reached")
    }
};

export const decreaseCartQuantity = 
    (data,newQty)=>
    (dispatch, getState)=>{
        dispatch({
            type:"ADD_TO_CART",
            payload:{...data,quantity:newQty},
        })
        localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));

    }

export const removeFromcart = 
    (data,toast)=>
    (dispatch, getState)=>{
        dispatch({
            type:"REMOVE_FROM_CART",
            payload: data
        });
        toast.success(`${data.productName} removed from cart`);
        localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));
    }

export const authenticateSignInUser = 
    (sendData, toast, reset, navigate, setLoader) => async (dispatch) =>
    {
        try {
            setLoader(true);            
            const { data } = await api.post("/auth/signin",sendData);
            dispatch({
                type:"LOGIN_USER",
                payload: data
            });
            localStorage.setItem("auth",JSON.stringify(data));
            reset()
            toast.success("Login Success");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server Error");
        } finally {
            setLoader(false);
        }
    }

export const registerNewUser = 
    (sendData, toast, reset, navigate, setLoader) => async (dispatch) =>
    {
        try {
            setLoader(true);            
            const { data } = await api.post("/auth/signup",sendData);
            reset()
            toast.success("user Registered Successfully, Please Login");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server Error");
        } finally {
            setLoader(false);
        }
    }

export const logout = (navigate,toast)=>(dispatch)=>{
    dispatch({type:"LOG_OUT"});
    localStorage.removeItem("auth");
    toast.success("User successfully logged out");
    navigate("/login");
}

export const addUpdateUserAddress = 
(sendData,toast, addressId, setOpenAddressModal,setLoader)=>async(dispatch)=>{
    try {
        setLoader(true);
        if(addressId){
            await api.put(`/addresses/${addressId}`,sendData);
        } else {
            await api.post('/addresses',sendData);
        }
        dispatch(getUserAddresses())
        toast.success("Address saved successfully");
    } catch (error) {
        console.log(error);        
        toast.error(error?.response?.data?.message || "Internal Serer Error")
        dispatch({type: "IS_ERROR",payload:null});
    } finally {
        setLoader(false);
        setOpenAddressModal(false);
    }
}

export const getUserAddresses = ()=>async (dispatch)=>{
    try{
        dispatch({type:'IS_FETCHING'})
        const { data } = await api.get(`/addresses`);        
        dispatch({type: "FETCH_ADDRESS",payload:data});
        dispatch({type:"IS_SUCCESS"});
    }catch(error){
        console.log(error);
        dispatch({
            type:"IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user address",
        });
    }
};

export const selectUserCheckoutAddress = (address)=>{
    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address
    }
}

export const deleteUserAddress = (toast,addressId,setOpen)=>async (dispatch,getState)=>{
    try{
        dispatch({type:'IS_FETCHING'})
        await api.delete(`/addresses/${addressId}`);
        dispatch({type:"REMOVE_SELECTED_ADDRESS"})   
        dispatch({type:"IS_SUCCESS"});    
        dispatch(getUserAddresses())
        toast.success("Address deleted successfully");        
    }catch(error){
        console.log(error);
        dispatch({
            type:"IS_ERROR",
            payload: error?.response?.data?.message || "Address deletion failed",
        });
    } finally{
        setOpen(false)
    }
};

export const addPaymentMethod = (method) =>{
    return {
        type: "ADD_PAYMENT_METHOD",
        payload: method
    }
}

export const createUserCart = (sendcartItems)=>async (dispatch,getState)=>{
    try{        
        // dispatch({type:'IS_FETCHING'})
        await api.post("/cart/create",sendcartItems);        
        // await dispatch(getUserCart())
        // dispatch({type:'IS_SUCCESS'})


    }catch(error){
        console.log(error);
        dispatch({
            type:"IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create cart items",
        });
    }
};

export const getUserCart = ()=>async (dispatch,getState)=>{
    try{
        dispatch({type:'IS_FETCHING'})
        const {data} = await api.get("/carts/users/cart");
        dispatch({
            type:"GET_USER_CART_PRODUCTS",
            payload: data.products,
            totalPrice: data.totalPrice,
            cartId: data.cartId
        })
        localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart))
        dispatch({type:'IS_SUCCESS'})
    }catch(error){
        console.log(error);
        dispatch({
            type:"IS_ERROR",
            payload: error?.response?.data?.message || "Failed to get cart items",
        });
    }
};

export const updateCartPrice = (totalPrice,cartId)=>(dispatch)=>{
    dispatch({
        type:'UPDATE_CART_PRICE',
        payload: totalPrice,
        cartId: cartId
    })
}
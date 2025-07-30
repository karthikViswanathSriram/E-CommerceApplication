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
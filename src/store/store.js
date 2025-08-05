import { configureStore } from "@reduxjs/toolkit"; 
import { productReducer } from "./reducers/ProductReducer";
import { errorReducer } from "./reducers/errorReducer";
import { cartReducer } from "./reducers/cartReducer";
import { authReducer } from "./reducers/authReducer";
import { paymentMethodReducer } from "./reducers/paymentMethodReducer";

const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const user = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : null;

const selectedUserAddress = localStorage.getItem("CHECKOUT_ADDRESS")
    ? JSON.parse(localStorage.getItem('CHECKOUT_ADDRESS'))
    : null;

const initialState={
    auth: {user:user,selectedUserAddress},
    carts: {cart:cartItems}
}

export const store = configureStore({
    reducer:{
        products:productReducer,
        errors:errorReducer,
        carts:cartReducer,
        auth:authReducer,
        payment:paymentMethodReducer,
    },
    preloadedState: initialState,
});

export default store;
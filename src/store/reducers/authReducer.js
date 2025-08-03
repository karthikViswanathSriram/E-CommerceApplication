import { selectUserCheckoutAddress } from "../actions";

const initialState = {
    user:null,
    addresses:[],
    selectedUserAddress:null
}

export const authReducer = (state=initialState,action)=>{
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, user: action.payload }
        case "LOG_OUT":
            return initialState;
        case "FETCH_ADDRESS":
            return {...state,addresses:action.payload}
        case "SELECT_CHECKOUT_ADDRESS":
            return {...state,selectedUserAddress: action.payload}
        case "REMOVE_SELECTED_ADDRESS":
            return {...state, selectedUserAddress: null}
        default:
            return state;
    }
};
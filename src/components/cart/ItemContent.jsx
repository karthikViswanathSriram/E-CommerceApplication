import { Button } from "@mui/material";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import { decreaseCartQuantity, increaseCartQuantity, removeFromcart } from "../../store/actions";
import toast from "react-hot-toast";

const ItemContent = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    cartId
}) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const dispatch = useDispatch()

    const handleQtyIncrease = (cartItems) =>{
        dispatch(increaseCartQuantity(
            cartItems,
            toast,
            currentQuantity,
            setCurrentQuantity
        ))
    }

    const handleQtyDecrease = (cartItems) =>{
        if(currentQuantity > 1){
            const newQty = currentQuantity - 1;
            setCurrentQuantity(newQty);
            dispatch(decreaseCartQuantity(cartItems,newQty));
        }
    }

    const removeItem = (cartItems) =>{
        dispatch(removeFromcart(cartItems,toast));
    }

    return (
        <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4 
        items-center border border-slate-200 rounded-md lg:px-4 py-4 p-2">
            <div className="md:col-span-2 justify-self-start flex flex-col gap-2">
                <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start">
                    <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">
                        {productName}
                    </h3>
                </div>

                <div className="md:w-36 sm:w-24 w-12">
                        <img src={image} alt={productName} 
                        className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"/>
                

                <div className="flex items-start gap-5 mt-3">
                    <Button variant="text" color="error" size="small"
                    onClick={()=>removeItem({
                        image,
                        productName,
                        description,
                        specialPrice,
                        price,
                        productId,
                        quantity,
                    })}
                    startIcon={<HiOutlineTrash />} >
                        Remove
                    </Button>
                    </div>
                </div>
            </div>

            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                {Number(specialPrice)}
            </div>

            <div className="justify-self-center">
                <SetQuantity quantity={currentQuantity}
                cardCounter={true}
                handleQtyDecrease={()=>handleQtyDecrease({
                    image,
                    productName,
                    description,
                    specialPrice,
                    price,
                    productId,
                    quantity,
                })}
                handleQtyIncrease={()=>handleQtyIncrease({
                    image,
                    productName,
                    description,
                    specialPrice,
                    price,
                    productId,
                    quantity,
                })}/>
            </div>

            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                {Number(currentQuantity) * Number(specialPrice)}
            </div>

        </div>
    )        
};

export default ItemContent;
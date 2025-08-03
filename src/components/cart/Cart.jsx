import { Button } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";
import useProductFilter from "../../hooks/useProductFilter";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";
import { updateCartPrice } from "../../store/actions";

const Cart = ()=>{
    const {cart,cartId} = useSelector((state) => state.carts);
    const dispatch = useDispatch();

    useProductFilter();
    const newCart = {...cart};

    newCart.totalPrice = cart?.reduce(
        (acc,cur) => acc + Number(cur?.specialPrice) * Number(cur?.quantity), 0
    );

    const updateCart = () =>{
        dispatch(updateCartPrice(newCart.totalPrice,cartId))
    }

    if(!cart|| cart.length===0)
        return (<CartEmpty/>)

    return (
        <div className="lg:px-14 sm:px-8 px-4 py-10">
            <div className="flex flex-col items-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                    <MdShoppingCart size={36} className="text-gray-700"/>
                    Your cart
                </h1>
                <p className="text-lg text-gray-600 mt-2">All your selected items</p>
            </div>

            <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 font-semibold items-center">
               <div className="md:col-span-2 justify-self-start text-lg text-slate-800 lg:ps-4">
                    Product
               </div>

               <div className="justify-self-center text-lg text-slate-800">
                    Price
               </div>

               <div className="justify-self-center text-lg text-slate-800">
                    Quantity
               </div>

               <div className="justify-self-center text-lg text-slate-800">
                    Total
               </div>
            </div>

            <div>
                {cart && cart.length > 0 &&
                cart.map((item,i)=><ItemContent key={i} {...item} />)}
            </div>

            <div className="border-t-[1.5px] border-slate-200 py-4 flex sm:flex-row 
            sm:px-0 px-2 flex-col sm:justify-between gap-4">
                <div></div>
                <div className="flex text-sm gap-1 flex-col">
                    <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
                        <span>Subtotal</span>
                        <span>{formatPrice(newCart?.totalPrice)}</span>
                    </div>

                    <p className="text-slate-500">
                        Taxes and shipping calculated at checkout.
                    </p>

                    <Link className="w-full flex justify-end" to="/checkout">
                        <Button variant="contained" color="primary"
                        className="w-[300px] px-4 py-2"
                        onClick={updateCart}>
                             <FaShoppingCart size={20}/>
                            <span className="font-semibold px-2">                               
                                Checkout
                            </span>
                        </Button>
                    </Link>

                    <Link className="flex gap-2 items-center mt-2 text-slate-500" to="/products">
                        <MdArrowBack />
                        <span>Continue Shopping</span>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Cart;
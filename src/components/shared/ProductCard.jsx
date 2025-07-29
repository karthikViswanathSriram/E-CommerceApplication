import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import { FiShoppingCart } from "react-icons/fi";
import { Button } from "@mui/material";
import truncateText from "../../utils/truncateText";

const ProductCard =({
        productId,
        productName,
        image,
        description,
        quantity,
        price,
        discount,
        specialPrice,
        about=false
})=>{
    const [openProductViewModal,setOpenProductViewModal] = useState(false);
    const btnLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = quantity && Number(quantity) > 0;

    const handleProductView = (product)=>{
        if(!about){
            setSelectedViewProduct(product);
            setOpenProductViewModal(true);
        }
    };

    return (
        <div className="border rounded-lg shadow-xl overflow-hidden 
        transition-shadow duration-300">

            {/* below is for rendering the image which zooms on hover*/}
            <div onClick={()=>{
                handleProductView({
                    id: productId,
                    productName,
                    image,
                    description,
                    quantity,
                    price,
                    discount,
                    specialPrice
                })
            }} className="w-full overflow-hidden aspect-[3/2]">
                <img className="w-full h-full cursor-pointer 
                transition-transform duration-300 transform hover:scale-105"
                src={image}
                alt={productName}>
                </img>
            </div>

            {/* below is for rendering details of product */}
            <div className="p-4">
                <h2 onClick={()=>{
                    handleProductView({
                        id: productId,
                        productName,
                        image,
                        description,
                        quantity,
                        price,
                        discount,
                        specialPrice
                    })
                }}
                    className="text-lg font-semibold mb-2 cursor-pointer">
                    {truncateText(productName,50)}
                </h2>

                <div className="min-h-20 max-h-20">
                    <p className="text-gray-600 text-sm">{truncateText(description,80)}</p>
                </div>

                {!about && (
                <div className="flex items-center justify-between">
                    {specialPrice ? (
                    // this div is for showing special price striking through original price
                    <div className="flex flex-col">
                        <span className="text-gray-400 line-through">
                            ${Number(price).toFixed(2)}
                        </span>
                        <span className="text-xl font-bold text-slate-700">
                            ${Number(specialPrice).toFixed(2)}
                        </span>
                    </div>
                    ) : (
                        // without special price, it is displayed as it is
                        <span className="text-xl font-bold text-slate-700">
                                {" "}
                                ${Number(Price).toFixed(2)}
                        </span>
                    )}

                    {/* <button 
                        disabled={!isAvailable || btnLoader}
                        onClick={()=>{}}
                        className={`bg-blue-500 ${isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"}
                            text-white py-2 px-3 items-center rounded-lg transition-colors duration-300
                            w-36 flex justify-center`}>
                        <FaShoppingCart className="mr-2"/>
                        {isAvailable ? "Add to Cart" : "Stock out"}
                    </button> */}

                    <Button variant="contained" color="primary" disabled={!isAvailable || btnLoader}
                    onClick={()=>{}}
                    className={`flex items-center gap-2 h-10 rounded-lg
                                ${isAvailable ? "opacity-100" : "opacity-70"}`}>
                        <FiShoppingCart/>
                        {isAvailable ? "Add to Cart" : "Stock out"}
                    </Button>
                </div>                
                )}

                {/* this div is for showing the product view button */}
                
            </div>
            <ProductViewModal
                open = {openProductViewModal}
                setOpen = {setOpenProductViewModal}
                product={selectedViewProduct}
                isAvailable={isAvailable}
            />
        </div>
    )
}

export default ProductCard;
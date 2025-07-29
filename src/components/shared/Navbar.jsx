import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaSignInAlt, FaStore } from "react-icons/fa";
import Badge from "@mui/material/Badge";

const Navbar = () => {
    const path = useLocation().pathname;
    const [navbarOpen,setNavbarOpen] = useState(false);

    return (
        <div className="h-[70px] bg-custom-gradient text-white z-50 flex items-center sticky top-0">
            <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
                <Link to="/" className="flex items-center text-2xl font-bold">
                    <FaStore className="text-3xl mr-2" />
                    <span className="font-[Poppins]">E-Shop</span>
                </Link>

                <ul className="flex text-slate-800 gap-4">
                    <li className="font-[500] transiition-all duration-150">
                        <Link to="/" className={`${
                            path==="/" ? "text-white font-semibold" : "text-gray-400"
                        }`}>Home</Link>
                    </li>

                    <li className="font-[500] transiition-all duration-150">
                        <Link to="/products" className={`${
                            path==="/products" ? "text-white font-semibold" : "text-gray-400"
                        }`}>Products</Link>
                    </li>

                    <li className="font-[500] transiition-all duration-150">
                        <Link to="/about" className={`${
                            path==="/about" ? "text-white font-semibold" : "text-gray-400"
                        }`}>About</Link>
                    </li> 

                    <li className="font-[500] transiition-all duration-150">
                        <Link to="/contact" className={`${
                            path==="/contact" ? "text-white font-semibold" : "text-gray-400"
                        }`}>Contact</Link>
                    </li>

                    <li className="font-[500] transiition-all duration-150">
                        <Link to="/cart" className={`${
                            path==="/cart" ? "text-white font-semibold" : "text-gray-400"
                        }`}>
                            <Badge
                                showZero
                                badgeContent={0}
                                color="primary"
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}>
                                    <FaShoppingCart size={25}/>
                            </Badge>
                        </Link>
                    </li>

                    <li className="font-[500] transiition-all duration-150">
                        <Link to="/login" className="flex items-center space-x-2 px-4 py-[6px]
                            bg-gradient-to-r from-purple-600 to-red-500
                            text-white font-semibold rounded-md shadow-lg
                            hover:from-purple-500 hover:to-red-400 transition
                            duration-300 ease-in-out transform">
                            <FaSignInAlt />
                            <span>Login</span>
                        </Link>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default Navbar;
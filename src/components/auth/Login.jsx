import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { InputField } from "../shared/inputField";

export const Login =()=>{
    const navigate = useNavigate();
    const [loader,setLoader] = useState(false);
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm({mode:"onTouched"});

    const loginHandler = ()=>{
        console.log("login clicked");
        
    }

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form 
                onSubmit={handleSubmit(loginHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-2xl">
                <div
                    className="flex flex-col items-center justify-center space-y-4">
                    <AiOutlineLogin className="text-slate-800 text-5xl"/>
                    <h1 
                        className="text-slate-800 text-center font-montserrat
                        lg:text-3xl text-2xl font-bold">
                        Login Here
                    </h1>
                </div>
                <hr className="mt-2 mb-5 text-black border-1"/>
                <div className="flex flex-col gap-3">
                    <InputField
                        label="UserName"
                        required
                        id="username"
                        type="text"
                        message="*UserName is required"
                        register={register}
                        errors={errors}
                        placeholder="Enter your username"/>

                    <InputField
                        label="Password"
                        required
                        id="apssword"
                        type="password"
                        message="*Password is required"
                        register={register}
                        errors={errors}
                        placeholder="Enter your password"/>
                </div>

                <button
                    disabled={loader}
                    className="bg-button-gradient flex gap-2 items-center justify-center
                    font-semibold text-white w-full py-2 hover:text-slate-400 
                    transition-colors duration-100 rounded-lg my-3"
                    type="submit">
                        {loader ? "Loading..." : "Login"}
                </button>

                <p
                    className="text-center text-sm text-slate-700 mt-6">
                    Dont't have an account?
                    <Link
                        className="font-semibold underline hover:text-black px-2"
                        to="/register">
                        <span>SignUp</span>
                    </Link>
                </p>
            </form>
        </div>
    )
};
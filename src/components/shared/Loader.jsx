import { CircularProgress } from "@mui/material";

const Loader = ({text})=>{
    return (
        <div className="flex justify-center items-center w-full h-[450px]">
            <div className="flex flex-col items-center gap-1">
                <CircularProgress/>
                <p className="text-slate-800">
                    {text?text:"Please wait..."}
                </p>
            </div>
        </div>
        
    )
};

export default Loader;
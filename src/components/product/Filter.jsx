import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter=({categories})=>{

    // not using setter because whenever URL is updated, this variable is also updated
    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathName = useLocation().pathname;
    const navigate = useNavigate();

    const [category,setCategory] = useState("all");
    const [sortOrder,setSortOrder] = useState("asc");
    const [searchTerm,setSearchTerm] = useState("");

    useEffect(() => {
      const currentCategory = searchParams.get("category") || "all";
      const currentSortOrder = searchParams.get("sortBy") || "asc";
      const currentSearchTerm= searchParams.get("keyword") || "";

      setCategory(currentCategory);
      setSearchTerm(currentSearchTerm);
      setSortOrder(currentSortOrder);

    }, [searchParams])

    useEffect(() => {
        const handler = setTimeout(() => {
            if(searchTerm)
                params.set("keyword",searchTerm);
            else
                params.delete("keyword");
            navigate(`${pathName}?${params}`);
        }, 700);
        

        return()=>{
            clearTimeout(handler);
        }
    }, [params, searchTerm, navigate, pathName]);
    
    

    // setting query string using params and navigating to the formed URL
    // this updates the searchParams state automatically and triggers the useEffect since they are bound together
    const handleCategoryChange=(event)=>{
        const selectedCategory = event.target.value;
        if(selectedCategory==="all"){
            params.delete("category");
        }
        else{
            params.set("category",selectedCategory);
        }
        navigate(`${pathName}?${params}`);
        setCategory(event.target.value);
    };

    const toggleSort = ()=>{
        setSortOrder((prevOrder)=>{
            const newOrder = (prevOrder==="asc")?"desc":"asc";
            params.set("sortBy",newOrder);
            navigate(`${pathName}?${params}`);
            return newOrder;
        });
    };

    const handleClearFilter = ()=>{
        navigate({pathname: window.location.pathname});
    };

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between
        justify-center items-center gap-4">
            {/* Search bar */}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Search Products"
                    className="border border-gray-400 text-slate-800 rounded-md 
                    py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <FiSearch className="absolute left-3 text-slate-800 size={20}"/>
            </div>

            {/* category select option */}
            <div className="flex sm:flex-row flex-col gap-4 items-center">
                <FormControl
                    className="text-slate-800 border-slate-700"
                    variant="outlined"
                    size="small">
                        <InputLabel>Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            value={category}
                            onChange={handleCategoryChange}
                            label="Category"
                            className="min-w-[120px] text-slate-800 border-slate-700"
                        >
                            <MenuItem value="all">All</MenuItem>
                            {categories.map((item)=>(
                                <MenuItem key={item.categoryId} value={item.categoryName}>
                                    {item.categoryName}
                                </MenuItem>
                            ))} 
                        </Select>
                </FormControl>

                {/* sort button and clear filter */}
                <Tooltip title="Sorted by price: asc">
                    <Button variant="contained" color="primary"
                    onClick={toggleSort}
                    className="flex items-center gap-2 h-10">
                        Sort By
                        {sortOrder==="asc" ?
                            (<FiArrowUp size={20}/>)
                            : (<FiArrowDown size={20}/>)
                        }
                    </Button>
                </Tooltip>

                <button className="flex items-center gap-2 bg-rose-900 rounded-md
                transition duration-300 ease-in shadow-md focus:outline-none
                text-white px-3 py-2"
                onClick={handleClearFilter}>
                    <FiRefreshCw className="font-semibold" size={16}/>
                        Clear Filter
                </button>

            </div>
        </div>
    )
};

export default Filter;
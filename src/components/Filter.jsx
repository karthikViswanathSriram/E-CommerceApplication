import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useState } from "react";
import { FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";

const Filter=()=>{
    const categories=[
        {categoryId:1, categoryName:"Electronics"},
        {categoryId:2, categoryName:"Health and Fitness"},
        {categoryId:3, categoryName:"Produce"},
        {categoryId:4, categoryName:"Dairy"},
    ];

    const [category,setCategory] = useState("all");

    const handleCategoryChange=(event)=>{
        setCategory(event.target.value);
    };

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between
        justify-center items-center gap-4">
            {/* Search bar */}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input
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
                    className="flex items-center gap-2 h-10">
                        Sort By
                        <FiArrowUp size={20}/>
                    </Button>
                </Tooltip>

                <button className="flex items-center gap-2 bg-rose-900 rounded-md
                transition duration-300 ease-in shadow-md focus:outline-none
                text-white px-3 py-2">
                    <FiRefreshCw className="font-semibold" size={16}/>
                        Clear Filter
                </button>

            </div>
        </div>
    )
};

export default Filter;
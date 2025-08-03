import { Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { FaBuilding, FaCheckCircle, FaEdit, FaStreetView, FaTrash } from "react-icons/fa";
import { MdLocationCity, MdPinDrop, MdPublic } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux"
import { deleteUserAddress, selectUserCheckoutAddress } from "../../store/actions";
import AlertDialog from "./AlertDialog";
import toast from "react-hot-toast";

export const AddressList = ({setSelectedAddress,setOpenAddressModal}) => {
    const {addresses}= useSelector((state)=>state.auth)
    const {selectedUserAddress} = useSelector((state)=>state.auth)
    const [open,setOpen] = useState(false);
    const dispatch = useDispatch();

    const selectAddress = (address)=>{
       dispatch(selectUserCheckoutAddress(address))
    }

    const editSelectedAddress = (address)=>{
        setSelectedAddress(address);
        setOpenAddressModal(true);
    }

    const deleteSelectedAddress = (address)=>{
        setSelectedAddress(address);
        setOpen(true);
    }

    const deleteAddress = ()=>{
        dispatch(deleteUserAddress(toast,selectedUserAddress?.addressId,setOpen))
    }

  return (
    <div className="space-y-4">
        {addresses.map((addr)=>(
            <div
                key={addr.addressId}
                onClick={()=>selectAddress(addr)}
                className={`p-4 border rounded-md cursor-pointer relative
                ${selectedUserAddress?.addressId === addr.addressId
                ? "bg-green-100" : "bg-white"}`}>
                <div className="flex items-start">
                    <div className="space-y-1">
                        <div className="flex items-center">
                            <FaBuilding size={14} className="mr-2 text-gray-600"/>
                            <p className="font-semibold">{addr.buildingName}</p>
                            {selectedUserAddress?.addressId === addr.addressId && (
                                <FaCheckCircle className="text-green-500 ml-2"/>
                            )}
                        </div>

                        <div className="flex items-center">
                            <FaStreetView size={17} className="mr-2 text-gray-600"/>
                            <p className="font-semibold">{addr.street}</p>                          
                        </div>

                        <div className="flex items-center">
                            <MdLocationCity size={17} className="mr-2 text-gray-600"/>
                            <p className="font-semibold">{addr.city}, {addr.state}</p>                          
                        </div>

                        <div className="flex items-center">
                            <MdPinDrop size={17} className="mr-2 text-gray-600"/>
                            <p className="font-semibold">{addr.pincode}</p>                          
                        </div>

                        <div className="flex items-center">
                            <MdPublic size={17} className="mr-2 text-gray-600"/>
                            <p className="font-semibold">{addr.country}</p>                          
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 absolute top-4 right-2">
                    <IconButton type="contained" onClick={()=>editSelectedAddress(addr)}>
                        <FaEdit size={18} className="text-teal-700"/>
                    </IconButton>

                    <IconButton type="contained" onClick={()=>deleteSelectedAddress(addr)}>
                        <FaTrash size={17} className="text-rose-600"/>
                    </IconButton>
                </div>

                <AlertDialog
                    open={open}
                    setOpen={setOpen}
                    title="Delete Address"
                    message={`Are you sure you want to delete this address?\n
                        ${selectedUserAddress?.buildingName},
                        ${selectedUserAddress?.street},
                        ${selectedUserAddress?.city},
                        ${selectedUserAddress?.state},
                        ${selectedUserAddress?.country},
                        ${selectedUserAddress?.pincode}.`}
                    onYes={deleteAddress}
                    onCancel={()=>setOpen(false)}
                    />
            </div>
        ))}
    </div>
  )
}

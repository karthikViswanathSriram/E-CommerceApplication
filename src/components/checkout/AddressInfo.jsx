import { Button, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import { AddressInfoModal } from "./AddressInfoModal";
import { AddAddressForm } from "./AddAddressForm";
import { useSelector } from "react-redux";
import { AddressList } from "./AddressList";

export const AddressInfo = () => {
    const {addresses} = useSelector((state)=>state.auth)
    const noAddressExist = !addresses || addresses.length===0;
    const {isLoading} = useSelector((state)=>state.errors);
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const addNewAddressHandler= () =>{
        setSelectedAddress("");
        setOpenAddressModal(true);
    }

  return (
    <div className="pt-4">
        {noAddressExist ? (
            <div className="p-6 rounded-lg max-w-md mx-auto flex flex-col 
            items-center justify-center">
                <FaAddressBook size={50} className="text-gray-500 mb-4"/>
                <h1 className="mb-2 text-slate-900 text-center font-semibold text-2xl">
                    No Address Added Yet
                </h1>
                <p className="mb-6 text-slate-800 text-center">
                    Please add your address to complete purchase
                </p>

                <Button variant="contained" color="primary"
                sx={{fontWeight: "bold"}}
                onClick={addNewAddressHandler}>
                    Add Address
                </Button>
            </div>
        ):(
            <div className="relative p-6 rounded-lg max-w-md mx-auto">
                <h1 className="text-slate-800 text-center font-bold text-2xl">
                    Select Address
                </h1>

                {isLoading ? (
                    <div className="py-4 px-8">
                        <Skeleton/>
                    </div>
                    
                ):( <>
                    <div className="space-y- pt-6">
                        <AddressList 
                            setSelectedAddress={setSelectedAddress}
                            setOpenAddressModal={setOpenAddressModal}/>
                    </div>

                    {addresses.length > 0 && (
                        <div className="mt-4">
                            <Button variant="contained" color="primary"
                            sx={{fontWeight: "bold"}}
                            onClick={addNewAddressHandler}>
                                Add Address
                            </Button>
                        </div>
                        
                    )}
                    </>
                )}
            </div>
        )}

        <AddressInfoModal
            open={openAddressModal}
            setOpen={setOpenAddressModal}>
                <AddAddressForm 
                    address={selectedAddress} 
                    setOpenAddressModal={setOpenAddressModal}
                />
        </AddressInfoModal>
    </div>
  )
}

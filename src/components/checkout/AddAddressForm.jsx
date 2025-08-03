import { InputField } from "../shared/inputField"
import { useForm } from "react-hook-form";
import { FaAddressCard } from "react-icons/fa";
import { ButtonLoader } from "../shared/ButtonLoader";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addUpdateUserAddress } from "../../store/actions";

export const AddAddressForm = ({address, setOpenAddressModal}) => {
    const [loader,setLoader] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(address?.addressId){
            setValue("buildingName",address?.buildingName);
            setValue("street",address?.street);
            setValue("city",address?.city);
            setValue("state",address?.state);
            setValue("country",address?.country);
            setValue("pincode",address?.pincode);
        }
    }, [address])
    

    const {
            register,
            handleSubmit,
            reset,
            setValue,
            formState:{errors},
        } = useForm({mode:"onTouched"});

    const onSaveAddressHandler = async(data)=>{
        dispatch(addUpdateUserAddress(
            data,toast,address?.addressId,setOpenAddressModal, setLoader
        ))
    }

return (
    <div className="">
        <form
            onSubmit={handleSubmit(onSaveAddressHandler)}
            className=""
        >
            <div className="flex justify-center items-center mb-4 font-semibold text-2xl
            text-slate-800 py-2 px-4">
                <FaAddressCard className="mr-2 text-2xl" />
                    {!address?.addressId? "Add Address" : "Update Address"}
                    
            </div>
            
            <div className="flex flex-col gap-4">
                <InputField
                    label="Street Name"
                    required
                    min={5}
                    id="street"
                    type="text"
                    message="*Street Name is required"
                    register={register}
                    errors={errors}
                    placeholder="Enter Street Name"
                />

                <InputField
                    label="Apt/Building"
                    required
                    id="buildingName"
                    type="text"
                    message="*Apt/Building Name is required"
                    register={register}
                    errors={errors}
                    placeholder="Apt/Building"
                />

                <InputField
                    label="City"
                    required
                    id="city"
                    min={4}
                    type="text"
                    message="*City is required"
                    register={register}
                    errors={errors}
                    placeholder="Enter City"
                />

                <InputField
                    label="State"
                    required
                    id="state"
                    min={2}
                    type="text"
                    message="*State is required"
                    register={register}
                    errors={errors}
                    placeholder="Enter State"
                />

                <InputField
                    label="Country"
                    required
                    id="country"
                    min={2}
                    type="text"
                    message="*Country is required"
                    register={register}
                    errors={errors}
                    placeholder="Enter Country"
                />

                <InputField
                    label="Zipcode"
                    required
                    id="pincode"
                    min={5}
                    type="text"
                    message="*Zipcode is required"
                    register={register}
                    errors={errors}
                    placeholder="Enter Zipcode"
                />
            </div>

            <Button
                variant="contained"
                color="primary"
                disabled={loader}
                type="submit"
                className="w-full"
                sx={{marginTop: 2,borderRadius: '10px'}}
            >
                {loader ? <ButtonLoader /> : "Save"}
            </Button>
        </form>
    </div>
)
}

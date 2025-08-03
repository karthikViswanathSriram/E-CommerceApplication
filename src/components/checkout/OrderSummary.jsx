import React from 'react'
import { useSelector } from 'react-redux'
import { formatPrice, formatPriceCalculation } from '../../utils/formatPrice'

export const OrderSummary = () => {

    const {cart,totalPrice} = useSelector((state)=>state.carts)
    const {selectedUserAddress} = useSelector((state)=>state.auth)
    const {paymentMethod} = useSelector((state)=>state.payment)

  return (
    <div className='container mx-auto px-4'>
        <div className='flex flex-wrap'>
            <div className='w-full lg:w-8/12 pr-4'>
                <div className='space-y-4'>
                    <div className='p-4 border rounded-lg shadow-sm'>
                        <h2 className='text-2xl font-semibold mb-2'>Billing Address</h2>
                        <p>
                            <strong>Building Name: </strong>{selectedUserAddress?.buildingName}
                        </p>
                        <p>
                            <strong>Street: </strong>{selectedUserAddress?.street}
                        </p>
                        <p>
                            <strong>City: </strong>{selectedUserAddress?.city}
                        </p>
                        <p>
                            <strong>State: </strong>{selectedUserAddress?.state}
                        </p>
                        <p>
                            <strong>Pincode: </strong>{selectedUserAddress?.pincode}
                        </p>
                        <p>
                            <strong>Country: </strong>{selectedUserAddress?.country}
                        </p>
                    </div>

                    <div className='p-4 border rounded-lg shadow-sm'>
                        <h2 className='text-2xl font-semibold mb-2'>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>{paymentMethod}
                        </p>
                    </div>

                    <div className='p-4 border rounded-lg shadow-sm'>
                        <h2 className='text-2xl font-semibold mb-2'>Order Items</h2>
                        <div className='space-y-2'>
                            {cart?.map((item)=>(                                
                                <div key={item.productId} className='flex items-center'>
                                    <img src={item?.image}className='w-12 h-12 rounded'/>   
                                    <div className='text-gray-500 p-4'>
                                        <p>{item?.productName}</p>
                                        <p>
                                            {item?.quantity} * {formatPrice(item?.specialPrice)} = ${formatPriceCalculation(item.quantity,item.specialPrice)}
                                        </p>
                                    </div>                                 
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <div className='w-full lg:w-4/12 mt-4 lg:mt-0'>
                <div className='border rounded-lg shadow-sm p-4 space-y-4'>
                    <h2 className='text-2xl font-semibold mb-2'>Order Summary</h2>

                    <div className='space-y-2'>
                        <div className='flex justify-between'>
                            <span>Products</span>
                            <span>{formatPrice(totalPrice)}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>Tax (0%)</span>
                            <span>{formatPrice(0)}</span>
                        </div>
                        <div className='flex justify-between font-semibold'>
                            <span>SubTotal</span>
                            <span>{formatPrice(totalPrice)}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

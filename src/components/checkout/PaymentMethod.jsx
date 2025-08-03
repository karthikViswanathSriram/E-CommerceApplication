import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addPaymentMethod, createUserCart } from '../../store/actions';
import { useEffect } from 'react';


export const PaymentMethod = () => {

    const {paymentMethod} = useSelector((state)=>state.payment);
    const dispatch = useDispatch();
    const {cart} = useSelector((state)=>state.carts);

    useEffect(() => {
        
    //   if(cart.length > 0 && !cartId && !errorMessage){
        const sendCartItems = cart.map((item)=>{
            return{
                productId: item.productId,
                quantity: item.quantity
            };
        });

        dispatch(createUserCart(sendCartItems));
    //   }
    }, [])

    const paymentMethodHandler = (method)=>{
        dispatch(addPaymentMethod(method));
    };
    

  return (
    <div className='max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border'>
        <h1 className='text-2xl font-semibold mb-4'>
            Select Payment Method
        </h1>
        <FormControl>
            <RadioGroup
                aria-label='payment method'
                name='paymentMethod'
                value={paymentMethod}
                onChange={(e)=>paymentMethodHandler(e.target.value)}>                    
                <FormControlLabel
                    value='Stripe'
                    control={<Radio color='primary'/>} 
                    label='Stripe'
                    className='text-gray-700'/>

                <FormControlLabel
                    value='Paypal'
                    control={<Radio color='primary' />}
                    label='Paypal'
                    className='text-gray-700'/>

            </RadioGroup>
        </FormControl>
    </div>
  )
}

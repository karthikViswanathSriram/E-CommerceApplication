import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

export const StripePayment = () => {
  return (
    <div className='h-96 flex justify-center items-center'>
        <Alert severity='warning' variant='filled' style={{maxWidth:"400px"}}>
            <AlertTitle>Stripe Unavailable</AlertTitle>
            Stripe payment is currently unavailable. Please use another payment method.
        </Alert>
    </div>
  )
}

import React from 'react';
import   StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_live_51Hnuw4CRQdszCfiYWEzea8coRFBFC1PUdZs32DNXlCG6RdTdnELImbxXMvfOrVamOVOwjDQrMLFxte0pgMx7IWlE00DHkhBeKE';

  const onToken = token => {
    console.log(token);
    alert('Payment successful');
  }

  return (
    <StripeCheckout 
      label='Pay Now'
      name='React Ecommerce'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;
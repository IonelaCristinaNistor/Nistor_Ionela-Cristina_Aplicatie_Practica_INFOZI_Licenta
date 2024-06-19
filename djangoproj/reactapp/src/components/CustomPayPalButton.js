import React, { useEffect } from 'react';

const CustomPayPalButton = ({ amount, onSuccess }) => {
  useEffect(() => {
    if (window.paypal && !window.paypalButtonsRendered) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(details => {
            onSuccess(details)
          });
        }
      }).render('#paypal-button-container')
      window.paypalButtonsRendered = true
    } else {
      console.log('')
    }
  }, [amount, onSuccess]);

  return (
    <div>
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default CustomPayPalButton;

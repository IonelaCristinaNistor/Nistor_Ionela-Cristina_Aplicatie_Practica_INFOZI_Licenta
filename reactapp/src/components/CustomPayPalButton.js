import React, { useEffect } from 'react';

const CustomPayPalButton = ({ amount, onSuccess }) => {
  useEffect(() => {
    if (window.paypal && !window.paypalButtonsRendered) {
      console.log("Initializing PayPal Buttons");
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
            console.log("Payment approved:", details);
            onSuccess(details);
          });
        }
      }).render('#paypal-button-container');
      window.paypalButtonsRendered = true; // Mark buttons as rendered
    } else {
      console.log("PayPal SDK not found or buttons already rendered");
    }
  }, [amount, onSuccess]);

  return (
    <div>
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default CustomPayPalButton;

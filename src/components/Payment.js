import React, { useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import './Payment.css';

export default function Payment() {
  useEffect(() => {
    // Initialize Braintree and Google Pay
    const initializeGooglePay = () => {
      const script1 = document.createElement("script");
      script1.src = "https://pay.google.com/gp/p/js/pay.js";
      document.head.appendChild(script1);

      const script2 = document.createElement("script");
      script2.src = "https://js.braintreegateway.com/web/3.69.0/js/client.min.js";
      document.head.appendChild(script2);

      const script3 = document.createElement("script");
      script3.src = "https://js.braintreegateway.com/web/3.69.0/js/google-payment.min.js";
      document.head.appendChild(script3);

      script3.onload = () => {
        const button = document.getElementById('google-pay-button');

        const paymentsClient = new window.google.payments.api.PaymentsClient({
          environment: 'TEST' // Change to 'PRODUCTION' for live payments
        });

        window.braintree.client.create({
          authorization: 'sandbox_pg3yxjvm_fc8wj82bp28kddy9' // Replace with your Braintree sandbox authorization key
        }, (clientErr, clientInstance) => {
          if (clientErr) {
            console.log("Braintree client error:", clientErr);
            return;
          }

          window.braintree.googlePayment.create({
            client: clientInstance,
            googlePayVersion: 2
          }, (googlePaymentErr, googlePayInstance) => {
            if (googlePaymentErr) {
              console.log("Google Pay error:", googlePaymentErr);
              return;
            }

            paymentsClient.isReadyToPay({
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: googlePayInstance.createPaymentDataRequest().allowedPaymentMethods
            }).then(response => {
              if (response.result) {
                button.addEventListener('click', (event) => {
                  event.preventDefault();

                  const paymentDataRequest = googlePayInstance.createPaymentDataRequest({
                    transactionInfo: {
                      currencyCode: 'INR',
                      totalPriceStatus: 'FINAL',
                      totalPrice: '499.0'
                    }
                  });

                  paymentsClient.loadPaymentData(paymentDataRequest).then(paymentData => {
                    return googlePayInstance.parseResponse(paymentData);
                  }).then(result => {
                    console.log("Google Pay payment nonce:", result.nonce);
                    alert('Google Pay payment successful!');
                    // Here you would send the nonce to your server for processing
                  }).catch(err => {
                    console.error("Google Pay error:", err);
                  });
                });
              }
            }).catch(err => {
              console.error("isReadyToPay error:", err);
            });
          });
        });
      };
    };

    initializeGooglePay();
  }, []);

  return (
    <div>
      <div className="modalpp">
        <form className="form">
          <div>
            <PayPalScriptProvider options={{ "client-id": "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R" }}>
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: '5.99'
                      },
                    }],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(() => {
                    alert('PayPal Payment Complete!');
                  });
                }}
              />
            </PayPalScriptProvider>
          </div>

          <div id="button-wrapper">
            <input type="image" src="https://raw.githubusercontent.com/google-pay/google-pay-button/1d25aa6162ad2330d3c9441ba7e6e2fb406f64c0/docs/images/google-pay-button.svg" id="google-pay-button" alt="Google Pay" />
          </div>

          <div className="separator">
            <hr className="line" />
            <p>or pay using credit card</p>
            <hr className="line" />
          </div>

          <div className="credit-card-info--form">
            <div className="input_container">
              <label htmlFor="card_holder" className="input_label">Card holder full name</label>
              <input id="card_holder" className="input_field" type="text" name="card_holder" placeholder="Enter your full name" required='true'/>
            </div>
            <div className="input_container">
              <label htmlFor="card_number" className="input_label">Card Number</label>
              <input id="card_number" className="input_field" type="number" name="card_number" placeholder="0000 0000 0000 0000" required='true' />
            </div>
            <div className="input_container">
              <label htmlFor="expiry_date" className="input_label">Expiry Date / CVV</label>
              <div className="split">
                <input id="expiry_date" className="input_field" type="text" name="expiry_date" placeholder="MM/YY" required='true' />
                <input id="cvv" className="input_field" type="number" name="cvv" placeholder="CVV" required='true' />
              </div>
            </div>
          </div>
          <button className="purchase--btn">Checkout</button>
        </form>
      </div>
    </div>
  );
}

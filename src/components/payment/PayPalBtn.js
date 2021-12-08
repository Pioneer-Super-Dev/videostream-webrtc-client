import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

export default function PayPalBtn({ amount, onSuccess, currency }) {
  return (
    <PayPalButton
      amount={amount}
      currency={currency}
      onSuccess={(details, data) => onSuccess(details, data)}
      options={{
        clientId:
          "AWdLGXrc1fC8ABTijHE9CzLmzdn9ZpLyiUlPS0SPu9vN-RUVttYYrfKEgiOL1ByV9udMDvJB-pOT39Q3",
      }}
    />
  );
}

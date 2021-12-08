import React from "react";
import { Container, Grid } from "@mui/material";
import PayPalBtn from "./PayPalBtn";

export default function PaypalPayment() {
  const paymentHandler = (details, data) => {
    console.log(details, data);
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid
        component="main"
        justifyContent="center"
        display="flex"
        sx={{ my: 8 }}
      >
        <Grid item>
          <div>PaypalPayment</div>
          <PayPalBtn amount={200} currency={"USD"} onSuccess={paymentHandler} />
        </Grid>
      </Grid>
    </Container>
  );
}

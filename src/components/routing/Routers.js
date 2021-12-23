import { React, Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import LoginUser from "../auth/LoginUser";
import LoginStreamer from "../auth/LoginStreamer";
import SignupUser from "../auth/SignupUser";
import SignupStreamer from "../auth/SignupStreamer";
import Broadcaster from "../streaming/Broadcaster";
import Watcher from "../streaming/Watcher";
import Alert from "../layout/Alert";
import PrivateRoute from "./PrivateRoute";
import { NotFound } from "../layout/NotFound";
import Uploader from "../layout/Uploader";
import Profile from "../layout/Profile";
import PaypalPayment from "../payment/PayPalPayment";
import StripePayment from "../payment/StripePayment";
import AboutUs from "../layout/AboutUs";
import ContactUs from "../layout/ContactUs";

import { SnackbarProvider } from "notistack";
import Slide from "@mui/material/Slide";

const Routers = () => {
  return (
    <Fragment>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        TransitionComponent={Slide}
        maxSnack={10}
        autoHideDuration={2000}
        preventDuplicate={true}
      >
        <Alert />
      </SnackbarProvider>
      <Routes>
        <Route path="loginuser" element={<LoginUser />} />
        <Route path="loginstreamer" element={<LoginStreamer />} />
        <Route path="signupuser" element={<SignupUser />} />
        <Route path="signupstreamer" element={<SignupStreamer />} />
        <Route path="broadcaster" element={<Broadcaster />} />
        <Route path="watcher/:id" element={<Watcher />} />
        <Route path="upload" element={<Uploader />} />
        <Route path="profile" element={<Profile />} />
        <Route path="paypalpayment" element={<PaypalPayment />} />
        <Route
          path="stripepayment/:streamerid/:watcherid/:videoid/:price"
          element={<StripePayment />}
        />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route element={<NotFound />} />
      </Routes>
    </Fragment>
  );
};

export default Routers;

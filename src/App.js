import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LOGOUT } from "./actions/types";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser, loadStreamer } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Routers from "./components/routing/Routers";
import LoginUser from "./components/auth/LoginUser";
import LoginStreamer from "./components/auth/LoginStreamer";
import SignupUser from "./components/auth/SignupUser";
import SignupStreamer from "./components/auth/SignupStreamer";
import Broadcaster from "./components/streaming/Broadcaster";
import Watcher from "./components/streaming/Watcher";
import { NotFound } from "./components/layout/NotFound";
import Uploader from "./components/layout/Uploader";
import Profile from "./components/layout/Profile";
import PaypalPayment from "./components/payment/PayPalPayment";
import StripePayment from "./components/payment/StripePayment";
import AboutUs from "./components/layout/AboutUs";
import ContactUs from "./components/layout/ContactUs";
import GenderLanding from "./components/layout/GenderLanding";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token, localStorage.level);
    }
    if (localStorage.level == 1) store.dispatch(loadStreamer());
    else store.dispatch(loadUser());

    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/:gender" element={<GenderLanding />} />
            <Route path="/" element={<Routers />}>
              <Route path="loginuser" element={<LoginUser />} />
              <Route path="loginstreamer" element={<LoginStreamer />} />
              <Route path="signupuser" element={<SignupUser />} />
              <Route path="signupstreamer" element={<SignupStreamer />} />
              <Route path="broadcaster" element={<Broadcaster />} />
              <Route path="watcher/:id" element={<Watcher />} />
              <Route path="upload" element={<Uploader />} />
              <Route path="Profile" element={<Profile />} />
              <Route path="paypalpayment" element={<PaypalPayment />} />
              <Route
                path="stripepayment/:streamerid/:watcherid/:videoid/:price"
                element={<StripePayment />}
              />
              <Route path="aboutus" element={<AboutUs />} />
              <Route path="contactus" element={<ContactUs />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

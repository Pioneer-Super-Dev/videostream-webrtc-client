import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbarr from './components/layout/Navbar';
import Routers from './components/routing/Routers';
import LoginUser from './components/auth/LoginUser'
import LoginStreamer from './components/auth/LoginStreamer'
import SignupUser from './components/auth/SignupUser'
import SignupStreamer from './components/auth/SignupStreamer'
import Broadcaster from './components/streaming/Broadcaster';
import Watcher from './components/streaming/Watcher';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Container from '@mui/material/Container'

function App() {
  return (
    <Router>
      <Fragment>
        {/* <Container maxWidth="lx"> */}
        <Navbarr/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/" element={<Routers/>}>
            <Route path="loginuser" element={<LoginUser/>}/>
            <Route path="loginstreamer" element={<LoginStreamer/>}/>
            <Route path="signupuser" element={<SignupUser/>}/>
            <Route path="signupstreamer" element={<SignupStreamer/>}/>
            <Route path="broadcaster" element={<Broadcaster/>}/>
          <Route path="watcher" element={<Watcher/>}/>
          </Route>
        </Routes>
        {/* </Container> */}
      </Fragment>
    </Router>
  );
}

export default App;

import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Routers from './components/routing/Routers';
import Login from './components/auth/Login'
import SignupUser from './components/auth/SignupUser'
import SignupStreamer from './components/auth/SignupStreamer'

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
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          {/* <Route path="/login" element={<Login/>}/> */}
          <Route path="/" element={<Routers/>}>
            <Route path="login" element={<Login/>}/>
            <Route path="signupuser" element={<SignupUser/>}/>
            <Route path="signupstreamer" element={<SignupStreamer/>}/>
          </Route>
        </Routes>
        {/* </Container> */}
      </Fragment>
    </Router>
  );
}

export default App;

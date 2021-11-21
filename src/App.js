import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LOGOUT } from './actions/types';


//Redux
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
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

  useEffect(() => {
    if(localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    window.addEventListener('storage', () => {
      if(!localStorage.token) store.dispatch({type: LOGOUT});
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Container maxWidth="lx"> */}
          <Navbar/>
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
    </Provider>
  );
}

export default App;

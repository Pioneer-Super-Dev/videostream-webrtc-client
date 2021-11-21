import {React, Fragment} from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginUser from '../auth/LoginUser';
import LoginStreamer from '../auth/LoginStreamer';
import SignupUser from '../auth/SignupUser';
import SignupStreamer from '../auth/SignupStreamer';
import Broadcaster from '../streaming/Broadcaster';
import Watcher from '../streaming/Watcher';
import Alert from '../layout/Alert';

const Routers = () => {
  return (
    <Fragment>
      <Alert />
      <Routes>
        <Route path="loginuser" element={<LoginUser/>} />
        <Route path="loginstreamer" element={<LoginStreamer/>} />
        <Route path="signupuser" element={<SignupUser/>}/>
        <Route path="signupstreamer" element={<SignupStreamer/>}/>
        <Route path="broadcaster" element={<Broadcaster/>}/>
        <Route path="watcher" element={<Watcher/>}/>
      </Routes>
    </Fragment>
  );
};

export default Routers;

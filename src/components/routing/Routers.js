import {React, Fragment} from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../auth/Login';
import SignupUser from '../auth/SignupUser';
import SignupStreamer from '../auth/SignupStreamer';

const Routers = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="signupuser" element={<SignupUser/>}/>
        <Route path="signupstreamer" element={<SignupStreamer/>}/>
      </Routes>
    </Fragment>
  );
};

export default Routers;

import api from '../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';


// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/auth/user');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
      level: 2
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const registerUser = formData => async dispatch => {
  try {
    const res = await api.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());

    dispatch(setAlert('Sign Up Successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const loginUser = (email, password) => async dispatch => {
  const body = { email, password };

  try {
    const res = await api.post('/auth/user', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
      level: 2
    });

    console.log(res.data);

    dispatch(loadUser());

    dispatch(setAlert('Login Successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });


/*****************************************************/
/******************** STREAMER ***********************/
/*****************************************************/

// Load Streamer
export const loadStreamer = () => async dispatch => {
  try {
    const res = await api.get('/auth/streamer');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
      level: 1
    });

  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register Streamer
export const registerStreamer = formData => async dispatch => {
  try {
    console.log(formData);
    const res = await api.post('/streamers', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadStreamer());

    dispatch(setAlert('Sign Up Successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login Streamer
export const loginStreamer = (email, password) => async dispatch => {
  const body = { email, password };

  

  try {
    const res = await api.post('/auth/streamer', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
      level: 1
    });

    dispatch(loadStreamer());
    dispatch(setAlert('Login Successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};
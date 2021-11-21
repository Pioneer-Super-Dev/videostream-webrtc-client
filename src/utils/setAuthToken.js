import api from './api';

const setAuthToken = (token, level) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
    localStorage.setItem('level', level);
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
    localStorage.setItem('level', 0);
  }
};

export default setAuthToken;

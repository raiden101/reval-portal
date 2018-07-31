import axios from 'axios';

export const get_token = () => {
  return localStorage.getItem('token');
}

export const set_token = (token) => {
  localStorage.setItem('token', token);
}

export const check_auth = (source) => {
  return axios.get('/api/auth/check_auth', {}, {
    cancelToken: source.token
  })
}
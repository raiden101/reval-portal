import axios from 'axios';

export const get_token = () => {
  return localStorage.getItem('token');
}

export const set_token = (token) => {
  localStorage.setItem('token', token);
}

export const check_auth = (source) => {
  let tk = get_token();
  if(tk === null || tk === undefined || tk === "") 
    return Promise.reject('auth error');
  return axios.get('/api/auth/check_auth', {}, {
    cancelToken: source.token
  })
}

export const clear_token = () => {
  localStorage.setItem('token', "");
}
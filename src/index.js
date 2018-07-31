import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { get_token } from './utils/token_management';

axios.interceptors.request.use(req => {
  req.baseURL = "http://localhost:5000"
  req.headers.token = get_token();
  return req;
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();

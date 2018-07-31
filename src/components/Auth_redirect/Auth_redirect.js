import { Redirect } from 'react-router-dom';
import React, { Component } from 'react'
import axios from 'axios';

import { check_auth } from '../../utils/token_management';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default class Auth_redirect extends Component {
  // 2 stands for unknown state.
  state = {
    admin: 2
  }

  componentDidMount() {
    check_auth(source)
    .then(data => {
      this.setState({ admin: data.data.admin })
    })
    .catch(err => {
      if(axios.isCancel(err)) 
        console.log(err);
      else 
        this.setState({ admin: 2 })
    });
  }

  componentWillUnmount() {
    source.cancel('[Auth_redirect] cancel called');
  }

  render() {
    switch(this.state.admin) {
      case 1:
        return <Redirect to="/admin" />
      case 0:
        return <Redirect to="/student" /> 
      default:
        return null;   
    }
  }
}

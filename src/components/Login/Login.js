import React, { Component, Fragment } from 'react'
import axios from 'axios';

import { set_token } from '../../utils/token_management';
import AuthRedirect from '../Auth_redirect/Auth_redirect';

const cancelToken = axios.CancelToken;
const source = cancelToken.source();


export default class Login extends Component {
  state = {
    admin: 0,
    username: "",
    password: "",
    login_error: ""
  }
  
  componentDidMount() {
    this.setState({
      admin: (this.props.location.pathname === '/login/admin' ? 1 : 0)
    });
  }

  update_input = (field) => (e) => {
    this.setState({ [field]: e.target.value })
  }

  onSubmit() {
    axios.post('/api/auth/login', {
      username: this.state.username, 
      password: this.state.password,
      admin: this.state.admin
    }, { cancelToken: source.token })
    .then(data => {
      if(data.data.error) {
        this.setState({ login_error: data.data.error })
        set_token(null);
      }else {
        set_token(data.data.token);
        let to_route = this.state.admin ? '/admin' : '/student';
        this.props.history.push(to_route, "valid");
      }
    })
    .catch(err => {
      if (axios.isCancel(err))
        console.log(err.message);
      else
        this.setState({ login_error: "error while loggin in!!" })
    })
  }

  componentWillUnmount() {
    source.cancel('[Login] cancel called');
  }

  render() {
    return (
      <Fragment>
        <AuthRedirect />
        <div className="row section"
        style={{marginTop: '60px'}}>
          <form className="col s12 m6 offset-m3 l4 offset-l4">
            <h4 className="section center">
              {this.state.admin ? 'Admin' : 'Student'} Login
            </h4>
            <div className="row">
              <div className="input-field col s12">
                <input 
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.update_input('username')} />
                <label htmlFor="username">Username</label>
              </div>
            </div>
            
            <div className="row">
              <div className="input-field col s12">
                <input 
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.update_input('password')} />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            
            <p className="red-text" style={{marginTop: "-20px"}}>
            {this.state.login_error}
            </p>           
            <button 
            type="button"
            onClick={this.onSubmit.bind(this)}
            value="Login"
            className="waves-effect waves-light btn white-text">
              Login
            </button>
          </form>
        </div>
      </Fragment>
    )
  }
}

import React, { Component, Fragment } from 'react'
import axios from 'axios';

import { set_token } from '../../utils/token_management';
import AuthRedirect from '../Auth_redirect/Auth_redirect';


export default class Login extends Component {
  state = {
    admin: 0,
    username: "4nm16cs121",
    admin_password: "",
    student_password: "1998-06-08",
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
    let auth_data = {
      username: this.state.username,
      admin: this.state.admin
    };
    auth_data['password'] = (
      auth_data.admin === 1 ? 
      this.state.admin_password : this.state.student_password
    );
    axios.post('/api/auth/login', auth_data)
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
      this.setState({ login_error: "error while loggin in!!" })
    })
  }

  render() {
    let password_field = this.state.admin === 1 ? (
      <Fragment>
        <input 
        type="password"
        name="admin_password"
        value={this.state.admin_password}
        onChange={this.update_input('admin_password')} />
        <label htmlFor="admin_password">Password</label>
      </Fragment>
    ) : (
      <Fragment>
        <input 
        type="date"
        name="student_password"
        value={this.state.student_password}
        onChange={this.update_input('student_password')} />
        <label htmlFor="student_password">Password</label>
      </Fragment>
    );
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
                {password_field}
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

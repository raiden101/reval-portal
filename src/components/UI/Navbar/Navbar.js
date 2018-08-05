import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './Navbar.css';
import logo from './nitte-logo.png';
import { clear_token } from '../../../utils/token_management';

class Navbar extends Component {
  on_logout_clicked = () => {
    clear_token();
    this.props.history.replace('/login');
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <div className="container">
            <span className="brand-logo">
              <img src={logo} alt="Logo" />
            </span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>About</li>
              <li
              onClick={this.on_logout_clicked}>Logout</li>
            </ul>
          </div>
        </div>
      </nav>)
  }
}

export default withRouter(Navbar);

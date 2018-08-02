import React, { Component } from 'react'
import axios from 'axios';

import { check_auth } from '../../utils/token_management';
import FeatureList from '../../components/admin/FeatureList/FeatureList';
import FeatureRoutes from '../../components/admin/FeatureRoutes/FeatureRoutes';

const cancelToken = axios.CancelToken;
const source = cancelToken.source();

export default class Admin extends Component {
  componentDidMount() {
    let loc = this.props.location;
    if(loc.state !== "valid") {
      check_auth(source)
      .then(data => {
        if(data.data.admin === 0)
          this.props.history.replace('/student', 'valid');
        else if(data.data.admin !== 1)
          throw new Error("error");
      })
      .catch(err => {
        this.props.history.replace('/');
      })
    }
  }

  componentWillUnmount() {
    source.cancel('[Admin] cancel called')
  }
  
  render() {
    return (
      <div className="row">
        
        <div className="row">
          <div className="col s12">
            <h4>Hello Admin</h4>
            <hr />
          </div>
        </div>
        <div className="col s12 m4">
          <FeatureList />
        </div>
        
        <div className="col s12 m7 offset-m1">
          {this.props.location.pathname === '/admin' ?
          <p style={{fontSize: '17px'}}
          className="teal-text">
            Welcome Admin, <br />
            Click on any one of the 
            options to get started
          </p>: null}
          <FeatureRoutes />
        </div>
      
      </div>
    )
  }
}

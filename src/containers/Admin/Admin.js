import React, { Component } from 'react'
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';

import { check_auth } from '../../utils/token_management';
import FeatureList from '../../components/admin/FeatureList/FeatureList';
import AddCourses from '../../components/admin/AddCourses/AddCourses';
import UserRegistration from '../../components/admin/userRegistration/userRegistration';


const cancelToken = axios.CancelToken;
const source = cancelToken.source();

export default class Admin extends Component {

  constructor(props) {
    super(props);
    let baseurl = props.match.url;
    this.routes = [
      { path: `${baseurl}/addCourses`, component: AddCourses },
      { path: `${baseurl}/userRegistration`, component: UserRegistration }
    ];
  }
  
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
          <Switch>
            {this.routes.map((myRoute, index) => {
              return <Route 
              key={index}
              path={myRoute.path} 
              component={myRoute.component}/>
            })}
          </Switch>
        </div>
      
      </div>
    )
  }
}

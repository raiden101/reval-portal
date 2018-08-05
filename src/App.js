import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Login from './components/Login/Login';
import Admin from './containers/Admin/Admin'
import Student from './containers/Student/Student';
import Navbar from './components/UI/Navbar/Navbar';

const paths = [
  { path: '/login', component: Login },
  { path: '/admin', component: Admin },
  { path: '/student', component: Student },
];

class App extends Component {

  render() {
    return (
      <Fragment>
        <Navbar/>
        <div className="container">
        <Switch>
          {paths.map((currPath, index) => {
            return <Route key={index} path={currPath.path} 
            component={(props) => <currPath.component {...props} />} />
          })}
          <Redirect exact from="/" to="/login" />
          <Route render={() => <h2>404</h2>} />
        </Switch>
        </div>
      </Fragment>
    )
  }
}

export default App;

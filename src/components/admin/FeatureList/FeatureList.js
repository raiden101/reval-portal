import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './FeatureList.css';

class FeatureList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [
        { 
          path: '/admin/userRegistration', 
          name: 'User registration', 
          active: false 
        },
        { path: '/admin/addCourses', name: 'Add courses', active: false },
        { path: '/admin/addStudentRegSubs', name: 'Add student registered courses', active: false },
        { path: '/admin/addBooklet', name: 'Add booklet code', active: false },
        { path: '/admin/reports', name: 'Reports', active: false }
      ]
    }
  }

  goto = (path) => {
    this.props.history.push(path);
  }

  render() {
    let curr_url = this.props.location.pathname;
    return (
      <div className="FeatureList">
        <div className="col s12 no_padding">
          <ul className="ul_style">
            {this.state.features.map((feature, index) => {
              let _classes = 
              `li_style${curr_url === feature.path ? ' active': ''}`;
              return (<li
                key={index}
                className={_classes}
                onClick={() => this.goto(feature.path)}
                >{feature.name}
              </li>)
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(FeatureList);
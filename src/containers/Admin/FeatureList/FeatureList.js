import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './FeatureList.css';

export default class FeatureList extends Component {
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
        { path: '/admin/addStudentRegCourses', name: 'Add student registered courses', active: false },
        { path: '/admin/addBooklet', name: 'Add booklet code', active: false },
        { path: '/admin/reports', name: 'Reports', active: false }
      ]
    }
  }

  add_active = (index) => {
    console.log(index, this.state);
    let modified_features = this.state.features.map((el, _index) => {
      return {...el, active: _index === index}
    });
    // this.setState({ features: modified_features });
    console.log('before');
    this.setState(prevstate => {
      console.log('heyooo');
      return {
        features: modified_features
      }
    })
    console.log('after');
  }

  render() {
    return (
      <div className="FeatureList">
        <div className="col s12 no_padding">
          <ul className="ul_style">
            {this.state.features.map((feature, index) => {
              let _classes = `li_style${feature.active ? ' active': ''}`;
              return <Link key={index} to={feature.path}>
                <li
                className={_classes}
                onClick={() => this.add_active(index)}
                >{feature.name}</li>
              </Link>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

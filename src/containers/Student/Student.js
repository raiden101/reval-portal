import React, { Component } from 'react'
import axios from 'axios';

import { check_auth } from '../../utils/token_management';
import StudentMain from './StudentMain';

const CancelToken = axios.CancelToken;
const source = CancelToken.source()

export default class Student extends Component {

  componentDidMount() {
    let loc = this.props.location;
    if(loc.state !== "valid") {
      check_auth(source)
      .then(data => {
        if(data.data.admin === 1)
          this.props.history.replace('/admin', 'valid');
        else if(data.data.admin !== 0)
          throw new Error("error");
      })
      .catch(err => {
        this.props.history.replace('/');
      })
    }
  }

  componentWillUnmount() {
    source.cancel('[Student] cancel called');
  }

  render() {
    return (
      <div className="row Student">
    
        <div className="row">
          <div className="col s12">
            <StudentMain 
            history={this.props.history}/>
          </div>
        </div>
      
      </div>
      
    )
  }
}

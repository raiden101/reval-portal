import React, { Component } from 'react'
import axios from 'axios';
import { toast } from 'materialize-css';

import Select from '../../UI/Select/Select';
import { branches } from '../../../utils/select_data';
import FileUpload from '../../FileUpload/FileUpload';

export default class UserRegistration extends Component {
  state = {
    name: "",
    usn: "",
    dob: "",
    branch: "",
    email: "",
    form_error: null
  }

  on_input_change = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  save_user = () => {
    for(let key in this.state) {
      if(key !== 'form_error' && 
      (this.state[key] === "" || this.state[key] === null)) {
        this.setState({ form_error: "Enter all the fields!" });
        return;
      }
    }
    this.setState({ form_error: null })
    axios.post('/api/admin/add_student', {
      student_data: this.state
    })
    .then(data => {
      toast({ html: `${data.data}` })
    })
    .catch(err => {
      toast({ html: `${err.message}` })
    });
  }

  render() {
    return (
      <div className="row">
        <form className="col s12">
          <h5 className="feature_header">
          Enter student information.</h5>
          <div className="row">
            <div className="input-field col s12 m6">
              <input 
              name="name" type="text"
              value={this.state.name}
              onChange={this.on_input_change} />
              <label htmlFor="name">Name</label>
            </div>
            <div className="input-field col s12 m6">
              <input name="usn" type="text"
              value={this.state.usn} 
              onChange={this.on_input_change}/>
              <label htmlFor="usn">USN</label>
            </div>
          </div>

          <div className="row">        
            <div className="input-field col s12 m6">
              <input name="dob" type="date"
              value={this.state.dob} 
              onChange={this.on_input_change}/>
              <label htmlFor="dob">DOB</label>
            </div>
            <div className="input-field col s12 m6">
              <input name="email" type="email"
              value={this.state.email} 
              onChange={this.on_input_change}/>
              <label htmlFor="email">Email</label>
            </div>
          </div>

          <div className="row no_margin_padding">
            <div className="input-field col s12 m6">
              <Select
              name="branch"
              on_input={this.on_input_change}
              items={branches}
              msg="Select branch"
              />
              <label>Branch</label>
            </div>
            <div className="col s12 m6">
              <button 
              type="button" 
              onClick={this.save_user}
              style={{marginTop: '20px'}}
              className="btn btn-waves blue darken-3">
              Submit</button>
            </div>
          </div>
          <div className="row no_margin_padding">
            <div className="col s12 red-text no_margin_padding"
            style={{margin: '0px 0px 10px 0px'}}>
              {this.state.form_error}
            </div>
            <div className="col s12">
              <FileUpload 
                url_path="/api/admin/add_students"
                label_name="Add Student details" /> 
            </div>
          </div>

        </form>
      </div>
    )
  }
}

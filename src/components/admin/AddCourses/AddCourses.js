import React, { Component } from 'react';
import axios from 'axios';
import mat from 'materialize-css';

import Select from '../../UI/Select/Select';
import { sub_types, branches, semesters } from '../../../utils/select_data';

export default class AddCourses extends Component {
  state = {
    sub_code: "",
    sub_name: "",
    branch: "",
    sub_type: "",
    sem: ""
  }

  on_input_handler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  on_submit = () => {
    axios.post('/api/admin/add_subject', {
      subject: { ...this.state, sem: Number(this.state.sem) }
    })
    .then(data => {
      mat.toast({ html: `<span>${data.data}</span>` })
    })
    .catch(err => {
      mat.toast({ html: `<span>${err.message}</span>`})
    });
  }

  render() {
    return (
      <div className="row AddCourses">
        <form className="col s12">
          <h5 className="feature_header">
          Enter subject information.</h5>
          <div className="row">
            <div className="input-field col s12 m6">
              <input 
              required
              name="sub_code"
              type="text" 
              value={this.state.sub_code}
              onChange={this.on_input_handler}/>
              <label htmlFor="sub_code">Subject code</label>
            </div>
        
            <div className="input-field col s12 m6">
              <input 
              required
              name="sub_name" 
              value={this.state.sub_name}
              type="text"
              onChange={this.on_input_handler}/>
              <label htmlFor="sub_name">Subject name</label>
            </div>
          </div>
        
          <div className="row">
            <div className="input-field col s12 m6">
              <Select 
              required
              on_input={this.on_input_handler}
              msg="Select a branch"
              name="branch"
              items={branches}/>
              <label>Branch</label>
            </div>
        
            <div className="input-field col s12 m6">
              <Select 
              required
              on_input={this.on_input_handler}
              msg="Select Subject type" 
              name="sub_type"
              items={sub_types}/>
              <label>Subject type</label>
            </div>
          </div>

          <div className="row">
            <div className="col s12 m6">
              <Select 
              items={semesters}
              name="sem"
              msg="Select Semester"
              on_input={this.on_input_handler}
              />
              <label>Sem</label>
            </div>
            <div className="col s12 m6">
              <button type="button"
              className="btn btn-wave blue darken-3"
              onClick={this.on_submit}>Submit</button>
            </div>
          </div>
          
        </form>
      </div>
    )
  }
}

import React, { Component } from 'react'
import mat from 'materialize-css';
import axios from 'axios';

export default class AddStudentRegSubs extends Component {
  state = {
    usn: "",
    sub_code: "",
    sub_name: ""
  }

  on_input_handler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  on_submit = () => {
    axios.post('/api/admin/add_stud_reg_course', this.state)
    .then(data => {
      mat.toast({ html: `${data.data}` })
    })
    .catch(err => {
      mat.toast({ html: `${err.message}` })
    })
  }

  render() {
    return (
      <div className="row">
        <form className="col s12">
          <h5 className="feature_header">Enter Student Registered course.</h5>
          
          <div className="row">
            <div className="input-field col m6 s12">
              <input
              type="text"
              onChange={this.on_input_handler}
              value={this.state.usn}
              name="usn"
              />
              <label htmlFor="usn">USN</label>
            </div>
            <div className="input-field col m6 s12">
              <input
              type="text"
              onChange={this.on_input_handler}
              value={this.state.sub_code}
              name="sub_code"
              />
              <label htmlFor="sub_code">Subject code</label>
            </div>
          </div>

          <div className="row">
            <div className="col s12 m6 input-field">
              <input
              type="text"
              onChange={this.on_input_handler}
              value={this.state.sub_code}
              name="sub_name"
              />
              <label htmlFor="sub_name">Subject name</label>
            </div>
            <div className="col s12 m6">
              <button type="button"
              style={{marginTop: '21px'}}
              onClick={this.on_submit}
              className="blue darken-3 btn btn-wave">Submit</button>
            </div>
          </div>

        </form>
        
      </div>
    )
  }
}

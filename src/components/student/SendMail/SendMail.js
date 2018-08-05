import React, { Component, Fragment } from 'react'
import axios from 'axios';
import { toast } from 'materialize-css';

import './SendMail.css';

export default class SendMail extends Component {
  
  state = {
    mail: "",
    send_mail_disabled: true
  }

  on_mail_input = (e) => {
    this.setState({ 
      mail: e.target.value,
      send_mail_disabled: 
      !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      .test(e.target.value)
    });
  }

  sendMail = () => {
    this.setState({ send_mail_disabled: true })
    axios.post('/api/student/send_mail', {
      email: this.state.mail
    })
    .then(data => {
      this.setState({ send_mail_disabled: false })
      toast({ html: `${data.data}` })
    })
    .catch(err => {
      this.setState({ send_mail_disabled: false })
      toast({ html: `${err.message}` })
    })
  }

  render() {
    let table = (
    <Fragment>
      {this.props.count <= 0  ? 
      <h5>You have not selected any subjects!</h5>: (
        <table className="centered">
          <thead>
            <tr>
              <th>Sl. no</th>
              <th>Subject code</th>
              <th>Subject name</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.subjects.reduce(
                (acc, curr) => {
                  if(curr.reval)
                    acc.push(curr)
                  return acc;
                }, []
              ).map((el, index) => {
                return (
                  <tr key={el._id}>
                    <td>{index+1}</td>
                    <td>{el.sub_code}</td>
                    <td>{el.sub_name}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      )}
    </Fragment>
    )
    return (
      <Fragment>
        <div className="row SendMail">

          <div className="row" style={{marginLeft: '0px'}}>
            <div className="col s12">
              <button 
              className="btn waves-effect blue darken-3"
              onClick={this.props.back}>
                <span style={{fontSize: '18px'}}>&laquo; </span> 
                Back 
              </button>
            </div>
          </div>

          <div className="col s12 m6">
            <h6>subjects you have applied for revaluation.</h6>
            {table}
          </div>

          <div className="col s12 m5 offset-m1">
            <div className="row">
              <div className="col s12">
              <p>
                Enter the email address to which the mail is to be sent
              </p>
              </div>
            </div>
            
            <div className="input-field">
              <input
              name="mail"
              type="text"
              value={this.state.mail}
              onChange={this.on_mail_input}
              disabled={this.props.count === 0}
              />
              <label htmlFor="mail">Enter your email address</label>
            </div>
            <button type="button"
            className="btn waves-effect green accent-3"
            onClick={this.sendMail}
            disabled={this.props.count === 0
            || this.state.send_mail_disabled}>
            Send Mail</button>
          </div>
        </div>
      </Fragment>
    )
  }
}

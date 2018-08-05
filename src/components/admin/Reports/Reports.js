import React, { Component, Fragment } from 'react'
import axios from 'axios';
import { toast } from 'materialize-css';

import SemReport from './SemReport';
import Select from '../../UI/Select/Select';
import { branch_codes, find_name_if_code } from '../../../utils/select_data';
import './Reports.css'

const token = axios.CancelToken;
const source = token.source();

export default class Reports extends Component {

  state = {
    selected_branch_code: "",
    reval_data: null,
    curr_report_index: -1,
  }

  on_branch_selected = (e) => {
    this.setState({ 
      curr_report_index: -1,
      selected_branch_code: e.target.value
    });
    axios.post('/api/admin/report',
    { branch: e.target.value },
    { cancelToken: source.token })
    .then(({data}) => {
      this.setState({ reval_data: data })
    })
    .catch(err => {
      if(axios.isCancel(err)) {
        console.log(err);
      }else {
        toast({ html: `${err.message}` })
      }
    })
  }

  on_back_clicked = () => {
    this.setState({ curr_report_index: -1 });
  }

  on_sem_clicked = (index) => {
    this.setState({ curr_report_index: index })
  }

  componentWillUnmount() {
    axios.Cancel('[Report] cancell called');
  }

  render() {
    let sem_arr, data_to_reder;
    let select_menu = (
      <div className="row">
        <div className="col s6">
          <Select
          on_input={this.on_branch_selected}
          name="branch"
          items={branch_codes}
          msg="Select a branch"
          />
          <label>Branch</label>
        </div>
      </div>
    );
    if(this.state.reval_data === null) {
      sem_arr = <p
      style={{fontSize: "17px"}}>Select the branch for the reports.</p>
    }else {
      sem_arr = (
        <Fragment>
          <ul className="collection with-header">
            <li className="collection-header"
            style={{backgroundColor: 'rgba(250, 250, 250, 0.9)'}}>
              Tap on the list item for details.
            </li>
            {this.state.reval_data.map((data, index) => {
              return <li 
              onClick={() => this.on_sem_clicked(index)}
              key={index}
              className="collection-item">{data.sem}</li>
            })}
          </ul>
          <button className="btn btn-wave blue darken-3">
            Print all 
          </button>
        </Fragment>
      )
    }
    if(this.state.curr_report_index === -1) {
      data_to_reder = (
        <Fragment>
          {select_menu}
          <div className="row">
            <div className="col s10">
              {sem_arr}
            </div>
          </div>
        </Fragment>
       
      );
    }else {
      data_to_reder = <SemReport 
      data={this.state.reval_data[this.state.curr_report_index]}
      branch={find_name_if_code(this.state.selected_branch_code)}
      on_back_clicked={this.on_back_clicked} />
    }
  
    return (
      <div className="row Reports">

        <div className="row">
          <div className="col s12">
            <h5 className="feature_header">Reports.</h5>
          </div>
        </div>
        {data_to_reder}        
      </div>
    )
  }
}

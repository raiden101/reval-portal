import React, { Component } from 'react'
import axios from 'axios';
import { toast } from 'materialize-css';

import info_icon from './info.png'
import './Student.css';
import SubjectList from '../../components/student/SubjectList/SubjectList';
import SendMail from '../../components/student/SendMail/SendMail'

export default class StudentMain extends Component {

  state = {
    student_name: "",
    student_usn: "",
    opted_subjects: null,
    fetch_err: "",
    selected_count: 0,
    applied: false,
    apply_started: false
  }

  componentDidMount() {
    axios.get('/api/student/get_student_info')
    .then(({data}) => {
      this.setState({
        student_name: data.name,
        student_usn: data.usn,
        opted_subjects: data.opted_subjects,
        selected_count: data.opted_subjects.reduce((acc, curr) => {
          if(curr.reval)
            ++acc
          return acc;
        }, 0)
      })
    })
    .catch(err => {
      this.setState({ fetch_err: "Error while fetching the data!!" })
    })
  }

  on_subject_clicked = sub_code => {
    let was_selected = false;
    this.setState({
      opted_subjects: this.state.opted_subjects.map(sub => {
        if(sub.sub_code === sub_code) {
          was_selected = sub.reval;
          return { ...sub, reval: !sub.reval }
        }
        return {...sub}
      }),
      selected_count: was_selected ? this.state.selected_count - 1 : 
      this.state.selected_count + 1
    })
  }

  on_reval_apply = () => {
    let reval_subs = [],  subs = this.state.opted_subjects;
    for(let i=0;i<subs.length;++i) 
      if(subs[i].reval) reval_subs.push(subs[i].sub_code)

    this.setState({ apply_started: true })
    axios.post('/api/student/apply_reval', { reval_subs })
    .then(data => {
      this.setState({ applied: true, apply_started: false })
    })
    .catch(err => {
      this.setState({ applied: false, apply_started: false });
      toast({ html: `${err.data}` });
    })
  }

  back_to_main = () => {
    this.setState({ applied: false, apply_started: false })
  }

  render() {
    let info = this.state.usn !== "" ? (
      <div className="col s12 info">
        <h5>Hello {this.state.student_name}</h5>
        <h5>{this.state.student_usn}</h5>
      </div>
    ) : (<div className="col s12"><h6>Loading....</h6></div>);

    let main_data = this.state.apply_started ? 
    (<div className="col s12"><h6>Loading....</h6></div>) :
    this.state.applied ? (
      <SendMail 
      subjects={this.state.opted_subjects}
      count={this.state.selected_count}
      back={this.back_to_main}/>
    ) : (
      <div className="row" style={{margin: '0px'}}>
        <div className="col s12">
          <div className="row no_margin_padding">
            <div className="col s12 info no_margin_padding">
              <h5>List of your subjects.</h5>
            </div>
          </div>

          <div className="row"  style={{margin: '0px'}}>
            <div className="SubjectList col s12 m7">
              <SubjectList 
              subjects={this.state.opted_subjects}
              on_subject_clicked={this.on_subject_clicked}
              on_submit={this.on_reval_apply}
              selected_count={this.state.selected_count} />
              {this.state.fetch_err}
            </div>
            <div className="col s12 m4 offset-m1" id="trash_info">
              <h6>
                <img src={info_icon} alt="i" />
                Click on the subject you want to select</h6>
              <h6>
              <img src={info_icon} alt="i" />
                Click again to deselect</h6>
            </div>
          </div>
        </div>  
      </div>
    )


    return (
      <div className="row">
      
        <div className="row" style={{margin: '0px'}}>
          {info}
        </div>
        <hr />
        {main_data}
        
      </div>
    )
  }
}

import React, { Component } from 'react'
import axios from 'axios';
import { toast } from 'materialize-css';

import './FileUpload.css';

export default class FileUpload extends Component {
  
  state = {
    file_path: "",
    file: null,
    filename: null,
    submitting: false
  }
  
  on_file_select = ({ target: { value, files } }) => {
    this.setState({
      file_path: value,
      filename: files[0].name,
      file: files[0]
    });
  }

  on_file_submit = () => {
    this.setState({ submitting: true });
    let form_data = new FormData();
    form_data.append('file_input', this.state.file);
    axios.post(this.props.url_path, form_data, {
      headers: { "content-type": "multipart/form-data" }
    })
    .then(({data}) => {
      this.setState({ 
        file_path: "", file: null, 
        filename: null, submitting: false 
      });
      toast({ html: `${data}` })
    })
    .catch(err => {
      this.setState({ 
        file_path: "", file: null, 
        filename: null, submitting: false 
      });
      toast({ html: `${err.message}` });
    });
  }

  render() {
    let [btn_label, btn_cls] = 
    [
      ...this.state.submitting ? ['Loading...', 'btn disabled'] : 
      ['Submit File', "blue darken-3 btn btn-waves"],
    ];
    
    return (
      <div className="row">
        <div className="FormUpload col s12 input-fields">
          <label htmlFor="file_input" className="fileInput">
            <input
            id="_file_"
            type="file"
            name="file_input"
            value={this.state.file_path}
            onChange={this.on_file_select}
            />
            <span className="input_label">
              {this.state.filename ? this.state.filename : 
                this.props.label_name}
            </span>
          </label>
          {this.state.file_path !== "" && 
            <button
            type="button"
            onClick={this.on_file_submit}
            className={btn_cls}
            style={{marginTop: '14px'}}>
              {btn_label}
            </button>
          }
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'

import './FileUpload.css';

export default class FileUpload extends Component {
  
  state = {
    file_path: "",
    file: null,
    filename: null,
  }
  
  on_file_select = ({ target: { value, files } }) => {
    this.setState({
      file_path: value,
      filename: files[0].name,
      file: files[0]
    }, () => console.log(this.state));
  }

  render() {
    let classes = ['FormUpload', 'col', 's12', 'input-fields'];
    if(this.state.file !== null)
      classes.push('active')
    return (
      <div className="row">
        <div className={classes.join(" ")}>
          <input
          id="_file_"
          type="file"
          name="file_input"
          onChange={this.on_file_select}
          />
          <label>File input</label>
        </div>
      </div>
    )
  }
}

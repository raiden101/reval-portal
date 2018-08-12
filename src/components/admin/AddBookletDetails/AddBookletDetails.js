import React, { Component } from 'react'

import FileUpload from '../../FileUpload/FileUpload';

export default class AddBookletDetails extends Component {
  render() {
    return (
      <div>
        <h5 className="feature_header">
          Submit booklet info.</h5>
        <FileUpload 
        url_path="/api/admin/add_booklet_details"
        label_name="Add booklet details" />        
      </div>
    )
  }
}

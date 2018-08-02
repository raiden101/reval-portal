import React, { Component } from 'react';
import M from 'materialize-css';


export default class Select extends Component {

  componentDidMount() {
    M.FormSelect.init(document.querySelectorAll(
      `select[name=${this.props.name}`
    ));
  }
  
  render() {
    return (
      <select onChange={this.props.on_input} name={this.props.name}>
        <option value="" disabled selected>
          {this.props.msg}
        </option>
        {this.props.items.map((item, i) => (
          <option 
          key={i}
          name={item.name}
          value={String(item.value)}
          >{item.name}</option>
        ))}
      </select>
    )
  }
}

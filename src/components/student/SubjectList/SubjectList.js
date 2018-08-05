import React, { Fragment } from 'react'
import './SubjectList.css';

const capitalize = str => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export default props => {
  let btn_classes = "btn waves-effect waves-light blue darken-4 ";
  if(props.selected_count === 0)
    btn_classes.concat("disabled");
  let view = props.subjects === null ? <h5>Loading....</h5> : (
    <Fragment>
      <div className="row">
        <div className="col s12">
          <table className="centered">
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject Name</th>
              </tr>
            </thead>
            <tbody>
              {props.subjects.map(subject => {
                let classes = subject.reval ? "active": "";
                return (
                  <tr
                  key={subject._id}
                  className={classes}
                  onClick={() => props.on_subject_clicked(subject.sub_code)}>
                    <td>{subject.sub_code}</td>
                    <td>{capitalize(subject.sub_name)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <button 
          onClick={props.on_submit}
          className={btn_classes}
          >Apply</button>
        </div>
      </div>
    </Fragment>
  );

  return view;
}

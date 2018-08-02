import React from 'react';

export default props => {
  console.log(props);
  return (
    <div className="row">
      <div className="col s12">
        
        <div className="row" style={{marginBottom: '30px'}}>
          <div className="col s12">
            <button 
            onClick={props.on_back_clicked}
            className="btn btn-wave red lighten-1">
              <span 
              style={{fontSize: '20px', fontWeight: '600'}}
              >&laquo;</span> Back
            </button>
            <button
            className="right btn btn-wave blue darken-3">
              Print
            </button>
          </div>    
        </div>
        
        <h6 style={{fontSize: '18px'}}>Semester: {props.data.sem}</h6>
        
        {props.data.sem_details.map((subject, index) => {
          return (
            <div className="row" key={index}>
              <div className="col s10">
                <h6
                style={{textDecoration: 'underline'}}>Subject Code: {subject._id.sub_code}</h6>
                <table>
                  <thead>
                    <tr>
                      <th>USN</th>
                      <th>Booklet details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subject.applicants.map((applicant, _index) => {
                      return (
                        <tr key={_index}>
                          <td>{applicant.usn}</td>
                          <td>{applicant.sub_code}</td>
                        </tr>
                      )  
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}        

      
      </div>

    </div>
  )
}

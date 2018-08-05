import React from 'react';

export default props => {
  return (
    <div className="row">
      <div className="col s12">
        
        <div className="row" style={{marginBottom: '40px'}}>
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
        
        <h6 style={{fontSize: '18px'}}>
          Branch/Semester: {props.branch}/{props.data.sem}
        </h6>
        <hr style={{marginBottom: '30px'}}/>
        
        {props.data.sem_details.map((subject, index) => {
          return (
            <div className="row" key={index}>
              <div className="col s10">
                <h6
                className="blue-text">
                Subject : {subject.applicants[0].sub_name.toLowerCase()}
                    ({subject._id.sub_code})
                </h6>
                <table className="striped centered">
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
                          <td>{applicant.booklet_code.booklet_code}</td>
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

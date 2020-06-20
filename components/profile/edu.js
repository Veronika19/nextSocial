import React from 'react';
// import {useSelector, useDispatch} from 'react-redux'


function Educations(props){

	const educations = props.profile.Users_Educations;
	// console.log(profile.)

	function renderEdu(educations) {
		return educations.map((edu) => {
				return(
					<li class="list-group-item">
            <h4>{edu.school}</h4>
            <p>{edu.joinDate} - {(edu.current === 'true')?'Current':edu.relieveDate}</p>
            <p>
              <strong>Degree: </strong>{edu.degree}</p>
            <p>
              <strong>Field Of Study: </strong>{edu.fieldOfStudy}</p>
            <p>
              </p><p>
                <strong>Description:</strong>{edu.description}</p>
          </li>
				)
		})
	}

	return(
			<div className="col-md-6">
        <h3 className="text-center text-info">Educations</h3>
        <ul className="list-group">
        	{renderEdu(educations)}
        </ul>
      </div>
		)
}

export default Educations;
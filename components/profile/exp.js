import React from "react";
// import {useSelector, useDispatch} from 'react-redux'

function Experience(props) {
  const experiences = props.profile.Users_Experiences;
  // console.log(profile.)

  function renderExp(experiences) {
    return experiences.map((exp) => {
      return (
        <li key={exp.id} className="list-group-item">
          <h4>{exp.company}</h4>
          <p>
            {exp.joinDate} -{" "}
            {exp.current === "true" ? "Current" : exp.relieveDate}
          </p>
          <p>
            <strong>Position:</strong> {exp.title}
          </p>
          <p>
            <strong>Description:</strong> {exp.description}
          </p>
        </li>
      );
    });
  }

  return (
    <div className="col-md-6">
      <h3 className="text-center text-info">Experience</h3>
      <ul className="list-group">{renderExp(experiences)}</ul>
    </div>
  );
}

export default Experience;

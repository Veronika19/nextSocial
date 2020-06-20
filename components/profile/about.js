import React from "react";
import { listSkills } from "../../utils/commonfunctions";

// import {useSelector, useDispatch} from 'react-redux'

function About(props) {
  const profile = props.profile;

  function loadSocials(socials) {
    const links = socials.slice(1, -1).split(",");
    // alert(links[1]);
    return (
      <p>
        {links[0] === "" ? (
          ""
        ) : (
          <a
            rel="noopener noreferrer"
            className="text-white p-2"
            target="_blank"
            href={links[0]}
          >
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        )}
        {links[1] === "" ? (
          ""
        ) : (
          <a
            rel="noopener noreferrer"
            className="text-white p-2"
            target="_blank"
            href={links[1]}
          >
            <i className="fab fa-facebook fa-2x"></i>
          </a>
        )}
        {links[2] === "" ? (
          ""
        ) : (
          <a
            rel="noopener noreferrer"
            className="text-white p-2"
            target="_blank"
            href={links[2]}
          >
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        )}
      </p>
    );
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.User.name}</h1>
              <p className="lead text-center">
                {profile.status} at {profile.company}
              </p>
              <p>{profile.location}</p>
              {loadSocials(profile.social)}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{profile.User.name}'s Bio</h3>
            <p className="lead">{profile.bio}</p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">{listSkills(profile.skills)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

import React from "react";
import Link from "next/link";

function ProfileItem(props) {
  const profile = props.profile;
  // console.log(profile);
  const key = props.profile.id;

  // function userSkills(skills) {
  //   return skills
  //     .slice(1, -1)
  //     .split(",")
  //     .map((skill) => {
  //       return (
  //         <li key={skill} className="list-group-item">
  //           <i className="fa fa-check pr-1"></i>
  //           {skill}
  //         </li>
  //       );
  //     });
  // }

  return (
    <div className="card card-body bg-light mb-3">
      <div className="row" key={key}>
        <div className="col-md-2">
          <Link href={`/profile/${profile.handle}`}>
            <a>
              <img
                className="rounded-circle"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
              />
            </a>
          </Link>
        </div>
        <div className="col-lg-6 col-md-4 col-8">
          <h3>{profile.User.name}</h3>
          <p>
            {profile.status} at {profile.company.toUpperCase()}
          </p>
          <p>{profile.location.toUpperCase()}</p>
          <Link href="/freelancer/[user]" as={`/freelancer/${profile.handle}`}>
            <a className="btn btn-info">View Profile</a>
          </Link>
        </div>
        <div className="col-md-4 d-none d-lg-block">
          <h4>Skill Set</h4>
          {/*<ul className="list-group">{userSkills(profile.skills)}</ul>*/}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProfileItem);

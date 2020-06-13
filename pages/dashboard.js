import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../components/layout";
import {
	getCurrentProfile,
	removeExpData,
	removeEduData,
} from "../redux/actions/profileActions";
import { deleteAccount } from "../redux/actions/authActions";
import { toUcFirst } from "../utils/commonfunctions";

function Dashboard() {
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const { push } = useRouter();

	React.useEffect(() => {
		if (!isAuthenticated) {
			push("/login");
		}
	}, []);

	// In case user reloads dahsboard
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(getCurrentProfile());
	}, [dispatch]);

	const { profile, loading } = useSelector((state) => state.profile);

	function deleteProfile() {
		if (
			window.confirm(
				"Are you sure ? Your account will be in inactive , until requested by us to activate. "
			)
		) {
			dispatch(deleteAccount());
		}
	}

	// console.count("counter");

	function renderDataTabel(dataType) {
		if (profile && profile.Users_Experiences) {
			const loopOver =
				dataType === "exp"
					? profile.Users_Experiences
					: profile.Users_Educations;
			const expArray = loopOver.map((data) => {
				return (
					<tr key={data.id}>
						<td>{dataType === "exp" ? data.title : data.school}</td>
						<td>{dataType === "exp" ? data.company : data.degree}</td>
						<td>
							{data.joinDate} -
							{data.current === "true" ? "Now" : data.relieveDate}
						</td>
						<td>
							<button
								onClick={() => removeData(data.id, dataType)}
								className="btn btn-danger"
							>
								Delete
							</button>
						</td>
					</tr>
				);
			});
			return expArray;
		} else {
			return <p>Please add some work experience</p>;
		}
	}

	function removeData(id, removeType) {
		if (window.confirm("Do you want to remove this ?")) {
			if (removeType === "exp") {
				dispatch(removeExpData(id));
			} else {
				dispatch(removeEduData(id));
			}
		}
	}

	let dashboardContent;
	if (profile && Object.keys(profile).length > 0) {
		dashboardContent = (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
							<p className="lead text-muted">
								Welcome {user.name && toUcFirst(user.name)} to Dev Zilla
							</p>

							<div className="btn-group mb-4" role="group">
								<Link href="/edit-profile">
									<a className="btn btn-light">
										<i className="fas fa-user-circle text-info mr-1"></i> Edit
										Profile
									</a>
								</Link>
								&nbsp;
								<Link href="/create-experience">
									<a className="btn btn-light">
										<i className="fab fa-black-tie text-info mr-1"></i>
										Add Experience
									</a>
								</Link>
								&nbsp;
								<Link href="/create-education">
									<a className="btn btn-light">
										<i className="fas fa-graduation-cap text-info mr-1"></i>
										Add Education
									</a>
								</Link>
							</div>

							<div>
								<h4 className="mb-2">Experience Credentials</h4>
								<table className="table">
									<thead>
										<tr>
											<th>Company</th>
											<th>Title</th>
											<th>Years</th>
											<th />
										</tr>
									</thead>
									<tbody>{renderDataTabel("exp")}</tbody>
								</table>
							</div>

							<div>
								<h4 className="mb-2">Education Credentials</h4>
								<table className="table">
									<thead>
										<tr>
											<th>School</th>
											<th>Degree</th>
											<th>Years</th>
											<th />
										</tr>
									</thead>
									<tbody>{renderDataTabel("edu")}</tbody>
								</table>
							</div>

							<div style={{ marginBottom: "60px" }}>
								<button onClick={deleteProfile} className="btn btn-danger">
									Delete My Account
								</button>
								&nbsp;
								<Link href="/change-password">
									<a className="btn btn btn-info">Change Password</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		dashboardContent = (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h3 className="lead text-muted">
								Welcome {user.name && toUcFirst(user.name)} to Dev Zilla
							</h3>
							<p> You have not setup a profile please add your info</p>
							<Link href="/create-profile">
								<a className="btn btn btn-info">Create Profile</a>
							</Link>
							&nbsp;
							<Link href="/change-password">
								<a className="btn btn btn-info">Change Password</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<Layout
			title="Dashboard | Next Js Authorization"
			desc="Users profile, experience, education"
		>
			{dashboardContent}
		</Layout>
	);
}

export default Dashboard;

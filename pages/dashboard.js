import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import ssrAuth from "../utils/ssrAuth";
import Layout from "../components/layout";
import {
	getCurrentProfile,
	removeExpData,
	removeEduData,
} from "../redux/actions/profileActions";
import { deleteAccount } from "../redux/actions/authActions";
import { toUcFirst } from "../utils/commonfunctions";

function Dashboard(props) {
	console.count("dashboard");
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	let { profile } = useSelector((state) => state.profile);
	if (profile === null) profile = props.profile;

	const { push } = useRouter();

	React.useEffect(() => {
		if (!isAuthenticated && profile === null) {
			push("/login");
		}
	}, []);

	// In case user reloads dahsboard
	const dispatch = useDispatch();
	// React.useEffect(() => {
	// 	dispatch(getCurrentProfile());
	// }, [dispatch]);

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
								<Link href="/profile/edit-profile">
									<a className="btn btn-light">
										<i className="fas fa-user-circle text-info mr-1"></i> Edit
										Profile
									</a>
								</Link>
								&nbsp;
								<Link href="/profile/create-experience">
									<a className="btn btn-light">
										<i className="fab fa-black-tie text-info mr-1"></i>
										Add Experience
									</a>
								</Link>
								&nbsp;
								<Link href="/profile/create-education">
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
								<Link href="/auth/change-password">
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
							<Link href="/profile/create-profile">
								<a className="btn btn btn-info">Create Profile</a>
							</Link>
							&nbsp;
							<Link href="/auth/change-password">
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
			title="Dashboard | DevZilla"
			desc="Users profile, experience, education"
		>
			{dashboardContent}
		</Layout>
	);
}

// Next.js will pre-render this page at build time using the props returned by getStaticProps.
export async function getServerSideProps(ctx) {
	let res = {};
	// console.log(ctx.req.headers);
	const axioscfg = ssrAuth(ctx, axios);
	// console.log(axioscfg);
	if (axioscfg) {
		res = await axios.get(`/api/profile`, axioscfg);
		return {
			props: { profile: res.data }, // will be passed to the page component as props
		};
	}

	return { props: { profile: false } };
}

export default React.memo(Dashboard);

import axios from "axios";
import Link from "next/link";
import { useSelector } from "react-redux";

import Layout from "../../components/layout";
import About from "../../components/profile/about";
import Educations from "../../components/profile/edu";
import Experience from "../../components/profile/exp";
import Flash from "../../utils/flash";

const User = ({ profile }) => {
	const errors = useSelector((state) => state.errors);

	React.useEffect(() => {
		errors && window.flash(errors.connectionErr);
	}, [errors]);

	let singleProfile;
	if (profile === null) {
		singleProfile = <Flash />;
	} else {
		singleProfile = (
			<div>
				<About profile={profile} />
				<div className="row">
					<Experience profile={profile} />
					<Educations profile={profile} />
				</div>
			</div>
		);
	}

	return (
		<Layout
			title={`${profile.User.name} - ${profile.status} at ${profile.company} | Devzilla`}
			desc={`${profile.skills.slice(1, -1)} developer in Delhi-NCR, ${
				profile.location
			} and gurgaon`}
		>
			<div className="profile">
				<div className="container">
					<div className="row">
						<div className="col-md-12">{singleProfile}</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

User.getInitialProps = async (ctx) => {
	const handle = ctx.query.user;
	const axioscfg = ctx.req ? { baseURL: "http://localhost:3000" } : {};
	const res = await axios.get(`/api/profile/handle/${handle}`, axioscfg);
	// console.log(res.data);
	return { profile: res.data };
};

export default User;

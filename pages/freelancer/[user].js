import axios from "axios";
import Link from "next/link";
import { useSelector } from "react-redux";

import Layout from "../../components/layout";
import About from "../../components/profile/about";
import Educations from "../../components/profile/edu";
import Experience from "../../components/profile/exp";
import Flash from "../../utils/flash";

const User = ({ profile }) => {
	console.count("user pro");
	const errors = useSelector((state) => state.errors);

	React.useEffect(() => {
		errors && window.flash(errors.connectionErr);
	}, [errors]);

	let profileSkills = "kdkdk";

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
			desc={`${profileSkills} developer in Delhi-NCR, ${profile.location} and gurgaon`}
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

export async function getServerSideProps(ctx) {
	const handle = ctx.query.user;
	const axioscfg = ctx.req ? { baseURL: `http://${ctx.req.headers.host}` } : {};
	const res = await axios.get(`/api/profile/handle/${handle}`, axioscfg);
	// console.log(res.data);
	return { props: { profile: res.data } };
}

export default React.memo(User);

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Layout from "../components/layout";
import ProfileItem from "../components/profile-item";
import { getProfileList } from "../redux/actions/profileActions";
import Flash from "../utils/flash";

function Freelancers(props) {
	console.count("freelancer");
	// const [fetchErrors, setFetchErrors] = useState(null);
	const dispatch = useDispatch();
	let { profiles, loading } = useSelector((state) => state.profile);
	const errors = useSelector((state) => state.errors);
	if (profiles === null) profiles = props.profiles;

	React.useEffect(() => {
		errors && window.flash(errors.connectionErr);
	}, [errors]);

	// console.count("counter");

	// errors && setFetchErrors(errors);
	let profileLists, flashError;
	// console.log(errors);
	if (profiles == null && loading) {
		profileLists = "";
	} else if (profiles == null && loading === false) {
		flashError = <Flash />;
	} else {
		profileLists = profiles.map((profile) => {
			return <ProfileItem key={profile.id} profile={profile} />;
		});
	}

	return (
		<Layout
			title="Freelancers in Delhi | Devzilla"
			desc="Website, mobile app, seo, social marketing best freelancers in Delhi"
		>
			<div className="row">
				<div className="col-md-12">
					<h1 className="display-4 text-center">Freelancers</h1>
					<p className="lead text-center">
						Browse and connect with freelancers
					</p>
					{profileLists}
				</div>
			</div>
			{flashError}
		</Layout>
	);
}

// Next.js will pre-render this page at build time using the props returned by getStaticProps.
export async function getServerSideProps(ctx) {
	let res = {};
	const axioscfg = ctx.req ? { baseURL: `http://${ctx.req.headers.host}` } : {};
	try {
		res = await axios.get(`/api/profile/all`, axioscfg);
		return {
			props: { profiles: res.data }, // will be passed to the page component as props
		};
	} catch (err) {
		return { props: { profiles: [] } };
	}
}

export default React.memo(Freelancers);

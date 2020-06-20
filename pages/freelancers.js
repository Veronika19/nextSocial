import { useDispatch, useSelector } from "react-redux";

import Layout from "../components/layout";
import ProfileItem from "../components/profile-item";
import { getProfileList } from "../redux/actions/profileActions";
import Flash from "../utils/flash";

function Freelancers() {
	// const [fetchErrors, setFetchErrors] = useState(null);
	const dispatch = useDispatch();
	const { profiles, loading } = useSelector((state) => state.profile);
	const errors = useSelector((state) => state.errors);

	React.useEffect(() => {
		errors && window.flash(errors.connectionErr);
	}, [errors]);

	React.useEffect(() => {
		dispatch(getProfileList());
	}, [dispatch]);

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

export default Freelancers;

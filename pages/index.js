import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";

import Layout from "../components/layout";

function Index() {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const { push } = useRouter();
	React.useEffect(() => {
		if (isAuthenticated) {
			push("/dashboard");
		}
	});

	return (
		<Layout
			title="DevZilla | A Developer connection"
			desc="Connect with developers from India , Delhi/NCR"
			home={true}
		>
			<div className="landing">
				<div className="dark-overlay landing-inner text-light">
					<div className="row">
						<div className="col-md-12 text-center">
							<h1 className="display-3 mb-4 text-warning">Dev Zilla</h1>
							<p className="lead text-warning">
								Create a developer profile/portfolio, share posts and get help
								from other developers
							</p>
							<hr />
							<Link href="/register">
								<a className="btn btn-lg btn-info mr-2">Sign Up</a>
							</Link>
							<Link href="/login">
								<a className="btn btn-lg btn-light">Login</a>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<style jsx>
				{`
					a {
						cursor: pointer;
					}

					.landing {
						position: relative;
						background: url("/dev-zilla.svg") no-repeat;
						background-size: cover;
						background-position: center;
						height: 100vh;
						margin-top: -24px;
						margin-bottom: -50px;
					}

					.landing-inner {
						padding-top: 80px;
					}

					.dark-overlay {
						background-color: rgba(0, 0, 0, 0.7);
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
					}
				`}
			</style>
		</Layout>
	);
}

export default Index;

import Navbar from "./Navbar";
import Head from "next/head";
import { useRouter } from "next/router";

const MemoedNavbar = React.memo(Navbar);

function Layout(props) {
	// props children are the component wrapped inside the Layout component
	const { back } = useRouter();
	return (
		<>
			<Head>
				<title>{props.title}</title>
				<meta name="description" content={props.desc} />
			</Head>
			<MemoedNavbar />

			<div
				className={props.home ? `container-fluid px-0 mb-5` : `container mb-5`}
			>
				{props.backButton && (
					<div className="row">
						<div className="col-6">
							<button
								className="btn btn-light mb-3 float-left border border-dark"
								onClick={() => back()}
							>
								Back
							</button>
						</div>
						<div className="col-6"></div>
					</div>
				)}
				{props.children}
			</div>
			<style global jsx>
				{`
					.card .row .col-md-2 a img {
						width: 100%;
					}
					.custom-control.custom-checkbox label.custom-control-label {
						cursor: pointer;
					}
				`}
			</style>
		</>
	);
}

export default Layout;

import Navbar from "./Navbar";
import Head from "next/head";
import { useRouter } from "next/router";

function Layout(props) {
	// props children are the component wrapped inside the Layout component
	const { back } = useRouter();
	return (
		<>
			<Head>
				<title>{props.title}</title>
				<meta name="description" content={props.desc} />
			</Head>
			<Navbar />

			<div className={props.home ? `container-fluid px-0` : `container`}>
				{props.backButton && (
					<button className="btn btn-primary" onClick={() => back()}>
						<span>&#x2b05;</span>
					</button>
				)}
				{props.children}
			</div>
		</>
	);
}

export default Layout;

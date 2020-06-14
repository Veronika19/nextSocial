import Link from "next/link";
import { Nav, NavItem, NavLink } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { logout } from "../redux/actions/authActions";

const Navbar = () => {
	console.count("navbar");
	// const { isAuthenticated, user } = useSelector((state) => state.auth);
	const { push } = useRouter();
	const dispatch = useDispatch();

	function onLogOutClick() {
		dispatch(logout());
		push("/login");
	}

	const guestLink = (
		<Nav className="navbar-nav mr-auto my-2 my-md-0 mr-md-3">
			<NavItem>
				<Link href="/articles">
					<NavLink>Articles</NavLink>
				</Link>
			</NavItem>
			<NavItem>
				<Link href="/login">
					<NavLink>Login</NavLink>
				</Link>
			</NavItem>
			<NavItem>
				<Link href="/register">
					<NavLink>Register</NavLink>
				</Link>
			</NavItem>
		</Nav>
	);

	const authLink = (
		<Nav className="navbar-nav mr-auto my-2 my-md-0 mr-md-3">
			<NavItem>
				<Link href="/articles">
					<NavLink>Articles</NavLink>
				</Link>
			</NavItem>
			<NavItem>
				<Link href="/test">
					<NavLink>Test</NavLink>
				</Link>
			</NavItem>
			<NavItem>
				<Link href="/dashboard">
					<NavLink>Dashboard</NavLink>
				</Link>
			</NavItem>
			<NavItem>
				<NavLink onClick={() => onLogOutClick()}>Logout</NavLink>
			</NavItem>
		</Nav>
	);

	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
			<div className="container">
				<div className="collapse navbar-collapse">
					<Link href="/">
						<a className="navbar-brand my-0 mr-md-auto font-weight-normal text-white">
							Dev Zilla
						</a>
					</Link>
					{/*{isAuthenticated ? authLink : guestLink}*/}
					{authLink}
				</div>
			</div>
			<style global jsx>
				{`
					.nav-item a:hover.nav-link {
						cursor: pointer;
					}
				`}
			</style>
		</nav>
	);
};

export default Navbar;

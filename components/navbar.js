import Link from "next/link";
import { Nav, NavItem, NavLink } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { logout } from "../redux/actions/authActions";

const Navbar = () => {
	console.count("navbar");
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const { push } = useRouter();
	const dispatch = useDispatch();

	function onLogOutClick() {
		dispatch(logout());
		push("/login");
	}

	const guestLink = (
		<Nav className="my-2 my-md-0 mr-md-3">
			<NavItem>
				<Link href="/">
					<NavLink>Home</NavLink>
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
		<Nav className="my-2 my-md-0 mr-md-3">
			<NavItem>
				<Link href="/">
					<NavLink>Home</NavLink>
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
		<div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
			<h5 className="my-0 mr-md-auto font-weight-normal">
				NextJs Authrization
			</h5>
			{isAuthenticated ? authLink : guestLink}

			<style jsx>
				{`
					.box-shadow {
						box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
					}
				`}
			</style>

			<style global jsx>
				{`
					a:not([href]) {
						color: #007bff;
						text-decoration: none;
						background-color: transparent;
					}

					a:hover {
						color: #0056b3;
						text-decoration: none;
						cursor: pointer;
					}
				`}
			</style>
		</div>
	);
};

export default Navbar;

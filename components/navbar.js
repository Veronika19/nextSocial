import Link from "next/link";
// import { Nav, NavItem, NavLink } from "reactstrap";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { logout } from "../redux/actions/authActions";
// import MobileMenu from "./mobile-menu";

const Navmenu = () => {
	console.count("navbar");

	const [collapsed, setCollapsed] = React.useState(true);
	const toggleNavbar = () => setCollapsed(!collapsed);

	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const { push } = useRouter();
	const dispatch = useDispatch();

	function onLogOutClick() {
		dispatch(logout());
		push("/login");
	}

	const guestLink = (
		<>
			<NavbarToggler onClick={toggleNavbar} className="mr-2" />
			<Collapse isOpen={!collapsed} navbar>
				<Nav className="navbar-nav ml-auto" navbar>
					<NavItem>
						<Link href="/freelancers">
							<NavLink>Freelancers</NavLink>
						</Link>
					</NavItem>
					<NavItem>
						<Link href="/tutorials">
							<NavLink>Tutorials</NavLink>
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
			</Collapse>
		</>
	);

	const authLink = (
		<>
			<NavbarToggler onClick={toggleNavbar} className="mr-2" />
			<Collapse isOpen={!collapsed} navbar>
				<Nav className="navbar-nav ml-auto">
					<NavItem>
						<Link href="/freelancers">
							<NavLink>Freelancers</NavLink>
						</Link>
					</NavItem>
					<NavItem>
						<Link href="/tutorials">
							<NavLink>Tutorials</NavLink>
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
			</Collapse>
		</>
	);

	return (
		<Navbar className="navbar navbar-expand-sm navbar-dark bg-dark mb-4" light>
			<div className="container">
				<Link href="/">
					<a className="navbar-brand my-0 mr-md-auto font-weight-normal text-white">
						Dev Zilla
					</a>
				</Link>

				{isAuthenticated ? authLink : guestLink}
			</div>
			<style global jsx>
				{`
					.nav-item a:hover.nav-link {
						cursor: pointer;
					}
				`}
			</style>
		</Navbar>
	);
};

export default Navmenu;

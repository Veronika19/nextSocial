import { useForm, ErrorMessage } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
// import Cookie from "js-cookie";

import Flash from "../utils/flash/";
import { loginUser } from "../redux/actions/authActions";

import Layout from "../components/layout";

const Login = () => {
	console.count("login");
	const { errors, register, handleSubmit } = useForm();
	const loginErrors = useSelector((state) => state.errors);
	const { isAuthenticated } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const { push } = useRouter();

	React.useEffect(() => {
		console.log("das");
		if (isAuthenticated) {
			push("/dashboard");
		}
	}, []);

	// let acctConfirmMsg = Cookie.get("acct-confirm-msg");
	// Cookie.remove("acct-confirm-msg", { sameSite: "lax" });

	// console.log(acctConfirmMsg);

	React.useEffect(() => {
		console.log("loo");
		loginErrors && window.flash(loginErrors.connection);
	}, [loginErrors]);

	function getFormValues(e) {
		// console.log(e);
		dispatch(loginUser(e, push));
	}

	return (
		<Layout
			title="Login | Next Js Authorization"
			desc="Create a new user account"
		>
			<div className="row">
				<div className="col-md-8 m-auto">
					<h1 className="display-4 text-center">Log In</h1>
					<p className="lead text-center">Sign in to your Dev Zilla accounts</p>
					<div className="row">
						<div className="col text-center">
							<a href="/auth/google" className="btn btn-danger btn-sm">
								Login with google <i className="fab fa-google"></i>
							</a>
						</div>
					</div>
					<br />
					<Flash />
					<form noValidate onSubmit={handleSubmit(getFormValues)}>
						<div className="form-group">
							<input
								type="email"
								className="form-control form-control-lg"
								placeholder="Email Address"
								name="email"
								ref={register({ required: "Enter an email address" })}
							/>
							<ErrorMessage
								className="alert-danger"
								as="p"
								errors={errors}
								name="email"
							/>
							<i className="alert-danger">{loginErrors && loginErrors.email}</i>
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control form-control-lg"
								placeholder="Password"
								name="password"
								ref={register({ required: "Enter a password." })}
							/>
							<ErrorMessage
								errors={errors}
								name="password"
								as="p"
								className="alert-danger"
							/>
							<i className="alert-danger">
								{loginErrors && loginErrors.password}
							</i>
						</div>
						<input type="submit" className="btn btn-info btn-block mt-4" />
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default Login;

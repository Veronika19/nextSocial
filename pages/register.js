import Layout from "../components/layout";
import { useForm, ErrorMessage as ClienError } from "react-hook-form";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { submitRegister } from "../redux/actions/authActions";
import Flash from "../utils/flash";

const Register = () => {
	console.count("register");
	const { register, handleSubmit, errors } = useForm();
	const dispatch = useDispatch();
	const formErrors = useSelector((state) => state.errors); // access redux state
	const { push } = Router;

	React.useEffect(() => {
		formErrors && window.flash(formErrors.connection);
	}, [formErrors]);

	function getFormValues(e) {
		dispatch(submitRegister(e, push));
	}

	return (
		<Layout
			title="Register | Next Js Authorization"
			desc="A Next js application for regsiter new user"
		>
			<div className="row">
				<div className="col-md-8 m-auto">
					<h1 className="display-4 text-center">Sign Up</h1>
					<p className="lead text-center">Create your Dev Zilla account</p>
					<div className="row">
						<div className="col text-center">
							<a href="/auth/google" className="btn btn-danger btn-sm">
								Sign up with google <i className="fab fa-google"></i>
							</a>
						</div>
					</div>
					<br />
					<Flash />
					<form noValidate onSubmit={handleSubmit(getFormValues)}>
						<div className="form-group">
							<input
								type="text"
								className="form-control form-control-lg"
								placeholder="Name"
								name="name"
								ref={register({ required: "Name is required." })}
							/>
							<ClienError
								className="alert-danger"
								errors={errors}
								name="name"
								as="p"
							/>
							<i className="alert-danger">{formErrors && formErrors.name}</i>
						</div>
						<div className="form-group">
							<input
								type="email"
								className="form-control form-control-lg"
								placeholder="Email Address"
								name="email"
								ref={register({ required: "Email is required." })}
							/>
							<small className="form-text text-muted">
								This site uses Gravatar so if you want a profile image, use a
								Gravatar email
							</small>
							<ClienError
								className="alert-danger"
								errors={errors}
								name="email"
								as="p"
							/>
							<i className="alert-danger">{formErrors && formErrors.email}</i>
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control form-control-lg"
								placeholder="Password"
								name="password"
								ref={register({ required: "Password is required." })}
							/>
							<ClienError
								className="alert-danger"
								errors={errors}
								name="password"
								as="p"
							/>
							<i className="alert-danger">
								{formErrors && formErrors.password}
							</i>
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control form-control-lg"
								placeholder="Confirm Password"
								name="password2"
								ref={register({ required: "Password is required." })}
							/>
							<ClienError
								className="alert-danger"
								errors={errors}
								name="password2"
								as="p"
							/>
							<i className="alert-danger">
								{formErrors && formErrors.password2}
							</i>
						</div>
						<input
							type="submit"
							value="Submit"
							className="btn btn-info btn-block mt-4"
						/>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default Register;

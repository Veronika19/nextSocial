import { useRouter } from "next/router";
import { useForm, ErrorMessage } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import Layout from "../../components/layout";
import UpdatePassword from "./update-password";
import Flash from "../../utils/flash";
import {
	getCurrentUserPass,
	matchCurrentUserPass,
} from "../../redux/actions/authActions";
import isEmpty from "../../utils/is-empty";

function ChangePassword(props) {
	const { errors, register, handleSubmit } = useForm();

	const [passwordCheck, setPasswordCheck] = React.useState(true);
	// const fErrors = useSelector((state) => state.errors);
	const { currUserD, isAuthenticated } = useSelector((state) => state.auth);
	const { push } = useRouter();

	React.useEffect(() => {
		if (!isAuthenticated) {
			push("/login");
		}
	}, []);

	const dispatch = useDispatch();

	console.count("counter");

	React.useEffect(() => {
		dispatch(getCurrentUserPass());
	}, [dispatch]);

	// useEffect(() => {
	// 	isEmpty(currUserD.password)
	// 		? setPasswordCheck(false)
	// 		: setPasswordCheck(true);
	// }, [currUserD]);

	React.useEffect(() => {
		setPasswordCheck((preVal) => {
			if (
				typeof currUserD.password !== "undefined" &&
				isEmpty(currUserD.password)
			)
				return false;
			else if (!isEmpty(currUserD.password)) return true;
			else return null;
		});
	}, [currUserD, setPasswordCheck]);

	async function getFormValues(e) {
		const { match } = await matchCurrentUserPass(e);
		if (match) setPasswordCheck(false);
		else window.flash("Password incorrect", "danger");
	}

	let displayForm;
	if (passwordCheck === true) {
		displayForm = (
			<div className="col-md-8 m-auto">
				<h1 className="display-4 text-center">Provide Verification</h1>
				<p className="lead text-center">Enter your present password</p>
				<Flash />
				<br />
				<form noValidate onSubmit={handleSubmit(getFormValues)}>
					<div className="form-group">
						<input
							type="password"
							className="form-control form-control-lg"
							placeholder="Current Password"
							name="password"
							ref={register({ required: "Enter your current password" })}
						/>
						<ErrorMessage
							className="alert-danger"
							as="p"
							errors={errors}
							name="password"
						/>
					</div>
					<input
						type="submit"
						value="Submit"
						className="btn btn-info btn-block mt-4"
					/>
				</form>
			</div>
		);
	} else if (passwordCheck === false) {
		displayForm = <UpdatePassword />;
	} else {
		displayForm = "";
	}

	return (
		<Layout
			title="Change Password | Devzilla"
			desc="Change you password"
			backButton={true}
		>
			<div className="row">{displayForm}</div>
		</Layout>
	);
}

export default ChangePassword;

import { useRouter } from "next/router";
import { useForm, ErrorMessage } from "react-hook-form";

import { updateUserPass } from "../../redux/actions/authActions";
import Flash from "../../utils/flash";
// import { useSelector, useDispatch } from "react-redux";

function UpdatePassword(props) {
	const { errors, register, handleSubmit } = useForm();
	const { push } = useRouter();

	console.count("up-pass");

	async function getFormValues(e) {
		// console.log(e);
		const res = await updateUserPass(e);
		if (res.status === true) {
			window.flash(res.msg);
			setTimeout(() => push("/dashboard"), 2500);
		} else {
			window.flash(res.msg, "danger");
		}
	}

	return (
		<div className="col-md-8 m-auto">
			<h1 className="display-4 text-center">Update Password</h1>
			<p className="lead text-center">Update your password</p>
			<Flash />
			<br />
			<form noValidate onSubmit={handleSubmit(getFormValues)}>
				<div className="form-group">
					<input
						type="password"
						className="form-control form-control-lg"
						placeholder="New Password"
						name="password"
						ref={register({ required: "Enter your password" })}
					/>
					<ErrorMessage
						className="alert-danger"
						as="p"
						errors={errors}
						name="password"
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						className="form-control form-control-lg"
						placeholder="Re-Enter Password"
						name="password2"
						ref={register({ required: "Re-Enter password" })}
					/>
					<ErrorMessage
						className="alert-danger"
						as="p"
						errors={errors}
						name="password2"
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
}

export default UpdatePassword;

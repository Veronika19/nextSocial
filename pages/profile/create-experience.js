import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useForm, ErrorMessage } from "react-hook-form";

import Layout from "../../components/layout";
import { createExperience } from "../../redux/actions/profileActions";

function CreateExperience() {
	const [checkbox, setCheckbox] = React.useState(false);
	const [relieveDisable, setRelieveDisable] = React.useState(false);

	const { handleSubmit, errors, register } = useForm();
	const formErrors = useSelector((state) => state.errors);
	const { isAuthenticated } = useSelector((state) => state.auth);
	const { push } = useRouter();
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (!isAuthenticated) {
			push("/login");
		}
	}, []);

	function getFormValues(e) {
		dispatch(createExperience(e, push));
	}

	function onCheck(e) {
		setCheckbox((prevState) => !prevState);
		setRelieveDisable((prevState) => !prevState);
	}

	return (
		<Layout
			backButton={true}
			className="section add-experience"
			title="Experience | DevZilla"
			desc="Create edit experience section"
		>
			<div className="row">
				<div className="col-md-8 m-auto">
					<h1 className="display-4 text-center">Add Your Experience</h1>
					<p className="lead text-center">
						Add any developer/programming positions that you have had in the
						past
					</p>
					<small className="d-block pb-3">* = required field</small>
					<form noValidate onSubmit={handleSubmit(getFormValues)}>
						<div className="form-group">
							<input
								ref={register({ required: "Enter a title" })}
								type="text"
								className="form-control form-control-lg"
								placeholder="* Job Title"
								name="title"
							/>
							<ErrorMessage
								errors={errors}
								name="title"
								as="p"
								className="alert-danger"
							/>
						</div>
						<div className="form-group">
							<input
								ref={register({ required: "Enter a company name" })}
								type="text"
								className="form-control form-control-lg"
								placeholder="* Company"
								name="company"
							/>
							<ErrorMessage
								className="alert-danger"
								errors={errors}
								name="company"
								as="p"
							/>
						</div>
						<div className="form-group">
							<input
								ref={register({ required: "Enter company location" })}
								type="text"
								className="form-control form-control-lg"
								placeholder="Location"
								name="location"
							/>
							<ErrorMessage
								className="alert-danger"
								errors={errors}
								name="location"
								as="p"
							/>
						</div>
						<div className="form-check mb-4">
							<input
								ref={register({ required: false })}
								checked={checkbox}
								onChange={onCheck}
								className="form-check-input"
								type="checkbox"
								name="current"
								value=""
								id="current"
							/>
							<label className="form-check-label">Current Job</label>
						</div>
						<h6>From Date</h6>
						<div className="form-group">
							<input
								ref={register({ required: "Enter job start date" })}
								type="date"
								className="form-control form-control-lg"
								name="joinDate"
							/>
							<ErrorMessage
								errors={errors}
								className="alert-danger"
								name="joinDate"
								as="p"
							/>
							<i className="alert-danger">
								{formErrors && formErrors.joinDate}
							</i>
						</div>
						<h6>To Date</h6>
						<div className="form-group">
							<input
								ref={register({ required: false })}
								disabled={relieveDisable}
								type="date"
								className="form-control form-control-lg"
								name="relieveDate"
							/>
							<i className="alert-danger">
								{formErrors && formErrors.relieveDate}
							</i>
						</div>
						<div className="form-group">
							<textarea
								ref={register({ required: "Enter your job description" })}
								className="form-control form-control-lg"
								placeholder="Job Description"
								name="description"
							></textarea>
							<small className="form-text text-muted">
								Some of your responsabilities, etc
							</small>
							<ErrorMessage
								errors={errors}
								name="description"
								className="alert-danger"
								as="p"
							/>
						</div>
						<input type="submit" className="btn btn-info btn-block mt-4" />
					</form>
				</div>
			</div>
		</Layout>
	);
}

export default CreateExperience;

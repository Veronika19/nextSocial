import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useForm, ErrorMessage } from "react-hook-form";

import Layout from "../../components/layout";
import { createEducation } from "../../redux/actions/profileActions";

function CreateEducation() {
	const [current, setCurrent] = React.useState(false);
	const [relieve, setRelieve] = React.useState(false);
	const { isAuthenticated } = useSelector((state) => state.auth);
	const { handleSubmit, errors, register } = useForm();
	const dispatch = useDispatch();
	const { push } = useRouter();

	React.useEffect(() => {
		if (!isAuthenticated) {
			push("/login");
		}
	});

	function onCheck(e) {
		setCurrent((prevVal) => !prevVal);
		setRelieve((prevVal) => !prevVal);
	}

	function getFormValues(e) {
		dispatch(createEducation(e, push));
	}

	return (
		<Layout
			title="Education | DevZilla"
			desc="Create edit education section"
			backButton={true}
		>
			<div className="row">
				<div className="col-md-8 m-auto">
					<h1 className="display-4 text-center">Add Your Education</h1>
					<p className="lead text-center">
						Add any school, bootcamp, etc that you have attended
					</p>
					<small className="d-block pb-3">* = required field</small>
					<form onSubmit={handleSubmit(getFormValues)}>
						<div className="form-group">
							<input
								type="text"
								className="form-control form-control-lg"
								placeholder="* School Or Bootcamp"
								name="school"
								ref={register({ required: "Please enter a value" })}
							/>
							<ErrorMessage
								className="alert-danger"
								errors={errors}
								name="school"
								as="p"
							/>
						</div>
						<div className="form-group">
							<input
								type="text"
								className="form-control form-control-lg"
								placeholder="* Degree Or Certificate"
								name="degree"
								ref={register({ required: "Please enter your field Of Study" })}
							/>
							<ErrorMessage
								className="alert-danger"
								errors={errors}
								name="degree"
								as="p"
							/>
						</div>
						<div className="form-group">
							<input
								type="text"
								className="form-control form-control-lg"
								placeholder="Field Of Study"
								name="fieldOfStudy"
								ref={register({ required: "Please enter a value" })}
							/>
							<ErrorMessage
								className="alert-danger"
								errors={errors}
								name="fieldOfStudy"
								as="p"
							/>
						</div>
						<div className="form-check mb-4">
							<input
								checked={current}
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
								type="date"
								className="form-control form-control-lg"
								name="joinDate"
								ref={register({ required: "Please enter a value" })}
							/>
							<ErrorMessage
								className="alert-danger"
								errors={errors}
								name="joinDate"
								as="p"
							/>
						</div>
						<h6>To Date</h6>
						<div className="form-group">
							<input
								disabled={relieve}
								type="date"
								ref={register({ required: false })}
								className="form-control form-control-lg"
								name="relieveDate"
							/>
						</div>
						<div className="form-group">
							<textarea
								className="form-control form-control-lg"
								placeholder="Program Description"
								name="description"
								ref={register({ required: "Please enter a value" })}
							></textarea>
							<ErrorMessage
								className="alert-danger"
								errors={errors}
								name="description"
								as="p"
							/>
							<small className="form-text text-muted">
								Tell us about your experience and what you learned
							</small>
						</div>
						<input type="submit" className="btn btn-info btn-block mt-4" />
					</form>
				</div>
			</div>
		</Layout>
	);
}

export default CreateEducation;

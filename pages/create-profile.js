import { useSelector, useDispatch } from "react-redux";
import { useForm, ErrorMessage as ClienError } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
// import {saveProfile} from '../../actions/profileActions';
import {
	saveProfile,
	getCurrentProfile,
} from "../redux/actions/profileActions";
import Layout from "../components/layout";

function CreateProfile(props) {
	const { register, errors, handleSubmit } = useForm();
	const { isAuthenticated } = useSelector((state) => state.auth);
	// const {profile} = useSelector((state) => state.profile);
	const formErrors = useSelector((state) => state.errors);
	const { push } = useRouter();
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (!isAuthenticated) {
			push("/dashboard");
		}
		async function fetchData() {
			const res = await dispatch(getCurrentProfile("create"));
			console.log(res);
			if (typeof res !== "undefined" && res !== null) {
				push("/dashboard");
			}
		}
		fetchData();
	}, [dispatch, isAuthenticated, push]);

	function getFormValues(e) {
		console.log(e);
		debugger;
		dispatch(saveProfile(e, push));
	}
	// console.log(formErrors);
	return (
		<Layout
			title="Create Profile | Next Js Authorization"
			desc="Create your own profile"
			backButton="true"
		>
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<h1 className="display-4 text-center">Create Your Profile</h1>
						<p className="lead text-center">
							Let's get some information to make your profile stand out
						</p>
						<small className="d-block pb-3">* = required input</small>
						<i className="alert-danger">{formErrors && formErrors.saveError}</i>
						<form noValidate onSubmit={handleSubmit(getFormValues)}>
							<div className="form-group">
								<input
									type="text"
									className="form-control form-control-lg"
									placeholder="* Profile handle"
									name="handle"
									required
									ref={register({ required: "This is required" })}
								/>
								<ClienError
									className="alert-danger"
									errors={errors}
									name="handle"
									as="p"
								/>
								<i className="alert-danger">
									{formErrors && formErrors.handle}
								</i>
								<small className="form-text text-muted">
									A unique handle for your profile URL. Your full name, company
									name, nickname, etc (This CAN'T be changed later)
								</small>
							</div>
							<div className="form-group">
								<select
									className="form-control form-control-lg"
									name="status"
									ref={register({ required: "This is required" })}
								>
									<option value="">* Select Professional Status</option>
									<option value="Developer">Developer</option>
									<option value="Junior Developer">Junior Developer</option>
									<option value="Senior Developer">Senior Developer</option>
									<option value="Manager">Manager</option>
									<option value="Student or Learning">
										Student or Learning
									</option>
									<option value="Instructor">Instructor or Teacher</option>
									<option value="Intern">Intern</option>
									<option value="Other">Other</option>
								</select>
								<small className="form-text text-muted">
									Give us an idea of where you are at in your career
								</small>
								<ClienError
									className="alert-danger"
									errors={errors}
									name="status"
									as="p"
								/>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control form-control-lg"
									placeholder="Company"
									name="company"
									ref={register({ required: "This is required" })}
								/>
								<ClienError
									className="alert-danger"
									errors={errors}
									name="company"
									as="p"
								/>
								<i className="alert-danger">
									{formErrors && formErrors.company}
								</i>
								<small className="form-text text-muted">
									Could be your own company or one you work for
								</small>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control form-control-lg"
									placeholder="Website"
									name="website"
									ref={register({ required: "This is required" })}
								/>
								<ClienError
									className="alert-danger"
									errors={errors}
									name="website"
									as="p"
								/>
								<i className="alert-danger">
									{formErrors && formErrors.website}
								</i>
								<small className="form-text text-muted">
									Could be your own or a company website
								</small>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control form-control-lg"
									placeholder="Location"
									name="location"
									ref={register({ required: "This is required" })}
								/>
								<ClienError
									className="alert-danger"
									errors={errors}
									name="location"
									as="p"
								/>
								<i className="alert-danger">
									{formErrors && formErrors.location}
								</i>
								<small className="form-text text-muted">
									City & state suggested (eg. Boston, MA)
								</small>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control form-control-lg"
									placeholder="Skills"
									name="skills"
									ref={register({ required: "This is required" })}
								/>
								<ClienError
									className="alert-danger"
									errors={errors}
									name="skills"
									as="p"
								/>
								<i className="alert-danger">
									{formErrors && formErrors.skills}
								</i>
								<small className="form-text text-muted">
									Please use comma separated values (eg.
									HTML,CSS,JavaScript,PHP)
								</small>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control form-control-lg"
									placeholder="Github Username"
									name="githubusername"
									ref={register({ required: false })}
								/>
								<small className="form-text text-muted">
									If you want your latest repos and a Github link, include your
									username
								</small>
							</div>
							<div className="form-group">
								<textarea
									className="form-control form-control-lg"
									placeholder="A short bio of yourself"
									name="bio"
									ref={register({ required: "This is required" })}
								></textarea>
								<ClienError
									className="alert-danger"
									errors={errors}
									name="bio"
									as="p"
								/>
								<small className="form-text text-muted">
									Tell us a little about yourself
								</small>
							</div>

							<div className="mb-3">
								<button type="button" className="btn btn-light">
									Add Social Network Links
								</button>
								<span className="text-muted">Optional</span>
							</div>

							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fab fa-twitter"></i>
									</span>
								</div>
								<input
									ref={register({ required: false })}
									type="text"
									className="form-control form-control-lg"
									placeholder="Twitter - https://twitter.com/name"
									name="twitter"
								/>
								<i className="alert-danger">
									{formErrors && formErrors.twitter}
								</i>
							</div>

							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fab fa-facebook"></i>
									</span>
								</div>
								<input
									ref={register({ required: false })}
									type="text"
									className="form-control form-control-lg"
									placeholder="Facebook - https://facebook.com/name"
									name="facebook"
								/>
								<i className="alert-danger">
									{formErrors && formErrors.facebook}
								</i>
							</div>

							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fab fa-linkedin"></i>
									</span>
								</div>
								<input
									ref={register({ required: false })}
									type="text"
									className="form-control form-control-lg"
									placeholder="Linkedin - https://in.linkedin.com/name"
									name="linkedin"
								/>
								<i className="alert-danger">
									{formErrors && formErrors.linkedin}
								</i>
							</div>
							<input type="submit" className="btn btn-info btn-block mt-4" />
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default CreateProfile;

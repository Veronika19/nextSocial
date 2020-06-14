import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useForm, ErrorMessage as ClientError } from "react-hook-form";

import Layout from "../../components/layout";
import {
	saveProfile,
	editCurrentProfile,
} from "../../redux/actions/profileActions";

function EditProfile(props) {
	console.count("edi-pro");
	const [initalVal, setInitialVal] = React.useState({});
	const [skills, setSkills] = React.useState("");
	const [social, setSocials] = React.useState({});

	const { handleSubmit, errors, register } = useForm();
	const { isAuthenticated } = useSelector((state) => state.auth);
	const formErrors = useSelector((state) => state.errors);
	// console.count();
	const { push } = useRouter();
	const dispatch = useDispatch();
	React.useEffect(() => {
		if (!isAuthenticated) {
			push("/login");
		} else {
			async function fetchData() {
				const profile = await dispatch(editCurrentProfile());
				// console.log(profile);
				setInitialVal(profile);
				const skillsJson = profile.skills.slice(1, -1);
				const socialArr = profile.social.slice(1, -1).split(",");
				setSocials({
					twitter: socialArr[0],
					facebook: socialArr[1],
					linkedin: socialArr[2],
				});
				setSkills(skillsJson);
			}
			fetchData();
		}
	}, [isAuthenticated, push, dispatch]);

	function handleChange(e) {
		setInitialVal({ ...initalVal, status: e.target.value });
	}

	function getFormValues(e) {
		// console.log(e);
		dispatch(saveProfile(e, push));
	}
	// console.log(formErrors);
	return (
		<Layout
			backButton={true}
			title="Experience | DevZilla"
			desc="Create edit experience section"
		>
			<div className="row">
				<div className="col-md-8 m-auto">
					<h1 className="display-4 text-center">Update Your Profile</h1>
					<p className="lead text-center">Make your profile stand out</p>
					<small className="d-block pb-3">* = required input</small>
					<form noValidate onSubmit={handleSubmit(getFormValues)}>
						<div className="form-group">
							<input
								type="text"
								defaultValue={initalVal.handle}
								className="form-control form-control-lg"
								placeholder="* Profile handle"
								name="handle"
								required
								ref={register({ required: "This is required" })}
							/>
							<ClientError
								className="alert-danger"
								errors={errors}
								name="handle"
								as="p"
							/>
							<i className="alert-danger">{formErrors && formErrors.handle}</i>
							<small className="form-text text-muted">
								A unique handle for your profile URL. Your full name, company
								name, nickname, etc (This CAN'T be changed later)
							</small>
						</div>
						<div className="form-group">
							<select
								value={initalVal.status}
								onChange={handleChange}
								className="form-control form-control-lg"
								name="status"
								ref={register({ required: "This is required" })}
							>
								<option value="">* Select Professional Status</option>
								<option value="Developer">Developer</option>
								<option value="Junior Developer">Junior Developer</option>
								<option value="Senior Developer">Senior Developer</option>
								<option value="Manager">Manager</option>
								<option value="Student or Learning">Student or Learning</option>
								<option value="Instructor">Instructor or Teacher</option>
								<option value="Intern">Intern</option>
								<option value="Other">Other</option>
							</select>
							<small className="form-text text-muted">
								Give us an idea of where you are at in your career
							</small>
							<ClientError
								className="alert-danger"
								errors={errors}
								name="status"
								as="p"
							/>
						</div>
						<div className="form-group">
							<input
								type="text"
								defaultValue={initalVal.company}
								className="form-control form-control-lg"
								placeholder="Company"
								name="company"
								ref={register({ required: "This is required" })}
							/>
							<ClientError
								className="alert-danger"
								errors={errors}
								name="company"
								as="p"
							/>
							<i className="alert-danger">{formErrors && formErrors.company}</i>
							<small className="form-text text-muted">
								Could be your own company or one you work for
							</small>
						</div>
						<div className="form-group">
							<input
								type="text"
								defaultValue={initalVal.website}
								className="form-control form-control-lg"
								placeholder="Website"
								name="website"
								ref={register({ required: "This is required" })}
							/>
							<ClientError
								className="alert-danger"
								errors={errors}
								name="website"
								as="p"
							/>
							<i className="alert-danger">{formErrors && formErrors.website}</i>
							<small className="form-text text-muted">
								Could be your own or a company website
							</small>
						</div>
						<div className="form-group">
							<input
								type="text"
								defaultValue={initalVal.location}
								className="form-control form-control-lg"
								placeholder="Location"
								name="location"
								ref={register({ required: "This is required" })}
							/>
							<ClientError
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
								defaultValue={skills}
								type="text"
								className="form-control form-control-lg"
								placeholder="Skills"
								name="skills"
								ref={register({ required: "This is required" })}
							/>
							<ClientError
								className="alert-danger"
								errors={errors}
								name="skills"
								as="p"
							/>
							<i className="alert-danger">{formErrors && formErrors.skills}</i>
							<small className="form-text text-muted">
								Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
							</small>
						</div>
						<div className="form-group">
							<input
								ref={register({ required: false })}
								defaultValue={initalVal.githubusername}
								type="text"
								className="form-control form-control-lg"
								placeholder="Github Username"
								name="githubusername"
							/>
							<small className="form-text text-muted">
								If you want your latest repos and a Github link, include your
								username
							</small>
						</div>
						<div className="form-group">
							<textarea
								defaultValue={initalVal.bio}
								className="form-control form-control-lg"
								placeholder="A short bio of yourself"
								name="bio"
								ref={register({ required: "This is required" })}
							></textarea>
							<ClientError
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
								defaultValue={social.twitter}
								type="text"
								className="form-control form-control-lg"
								placeholder="Twitter - https://twitter.com/name"
								name="twitter"
							/>
							<i className="alert-danger">{formErrors && formErrors.twitter}</i>
						</div>

						<div className="input-group mb-3">
							<div className="input-group-prepend">
								<span className="input-group-text">
									<i className="fab fa-facebook"></i>
								</span>
							</div>
							<input
								ref={register({ required: false })}
								defaultValue={social.facebook}
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
								defaultValue={social.linkedin}
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
		</Layout>
	);
}

export default EditProfile;

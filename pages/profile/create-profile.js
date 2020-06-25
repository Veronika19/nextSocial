import { useSelector, useDispatch } from "react-redux";
import { useForm, ErrorMessage } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

// import {saveProfile} from '../../actions/profileActions';
import ssrAuth from "../../utils/ssrAuth";
import {
	saveProfile,
	getCurrentProfile,
} from "../../redux/actions/profileActions";
import Layout from "../../components/layout";

let expNumbers = [];
for (let i = 1; i <= 20; i++) {
	expNumbers.push(i);
}

function CreateProfile(props) {
	const { register, errors, handleSubmit } = useForm();
	// const {profile} = useSelector((state) => state.profile);
	const formErrors = useSelector((state) => state.errors);
	const { push } = useRouter();
	const dispatch = useDispatch();

	React.useEffect(() => {
		async function fetchData() {
			// in case if user try to access create-profile page even after creating it
			const res = await dispatch(getCurrentProfile("create"));
			if (typeof res !== "undefined" && res !== null) {
				push("/profile/edit-profile");
			}
		}
		fetchData();
	}, [dispatch, push]);

	function getFormValues(e) {
		// console.log(e);
		// debugger;
		dispatch(saveProfile(e, push));
	}
	// console.log(formErrors);
	return (
		<Layout
			title="Create Profile | Devzilla"
			desc="Create your own profile to stand out"
			backButton="true"
		>
			<div className="row">
				<div className="col-md-12 m-auto">
					<h1 className="display-4 text-center">Create Your Profile</h1>
					<p className="lead text-center">
						Let's get some information to make your profile stand out
					</p>
					<small className="d-block pb-3">* = required input</small>
					<i className="alert-danger">{formErrors && formErrors.saveError}</i>
					<form noValidate onSubmit={handleSubmit(getFormValues)}>
						<div className="row">
							<div
								className="col-md-6 col-xs-12"
								style={{ borderRight: "1px solid #c6c6c6" }}
							>
								<div className="form-group">
									<input
										type="text"
										className="form-control "
										placeholder="* Profile handle"
										name="handle"
										required
										ref={register({ required: "This is required" })}
									/>
									<ErrorMessage
										className="alert-danger"
										errors={errors}
										name="handle"
										as="p"
									/>
									<i className="alert-danger">
										{formErrors && formErrors.handle}
									</i>
									<small className="form-text text-muted">
										A unique handle for your profile URL. Your full name,
										company name, nickname, etc (This CAN'T be changed later)
									</small>
								</div>
								<div className="form-group">
									<select
										className="form-control "
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
									<ErrorMessage
										className="alert-danger"
										errors={errors}
										name="status"
										as="p"
									/>
								</div>
								<div className="form-group">
									<select
										className="form-control "
										name="totalExp"
										ref={register({ required: "This is required" })}
									>
										<option value="">* Total Experience</option>

										{expNumbers.map((exp) => {
											const year = exp === 1 ? "Year" : "Years";
											return (
												<option key={exp} value={exp}>
													{exp + " " + year}
												</option>
											);
										})}
									</select>
									<small className="form-text text-muted">
										Total experience in selected profession
									</small>
									<ErrorMessage
										className="alert-danger"
										errors={errors}
										name="totalExp"
										as="p"
									/>
								</div>
								<div className="form-group">
									<input
										type="text"
										className="form-control "
										placeholder="Current Company"
										name="company"
										ref={register({ required: "This is required" })}
									/>
									<ErrorMessage
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
										className="form-control "
										placeholder="Website"
										name="website"
										ref={register({ required: "This is required" })}
									/>
									<ErrorMessage
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
										className="form-control "
										placeholder="Location"
										name="location"
										ref={register({ required: "This is required" })}
									/>
									<ErrorMessage
										className="alert-danger"
										errors={errors}
										name="location"
										as="p"
									/>
									<i className="alert-danger">
										{formErrors && formErrors.location}
									</i>
									<small className="form-text text-muted">
										City & state suggested (eg. Gurgaon, Ashok Nagar, Delhi)
									</small>
								</div>
							</div>
							<div className="col-md-6 col-xs-12">
								<div className="form-group">
									{props.skills.map(({ slug, name, id }) => {
										return (
											<div
												key={slug}
												className="custom-control custom-checkbox mb-3 custom-control-inline"
											>
												<input
													type="checkbox"
													className="custom-control-input"
													id={slug}
													name="users_skills"
													value={id}
													ref={register({
														required: "Please select a skill",
													})}
												/>
												<label className="custom-control-label" htmlFor={slug}>
													{name}
												</label>
											</div>
										);
									})}
									<ErrorMessage
										className="alert-danger"
										errors={errors}
										name="users_skills"
										as="p"
									/>
									<i className="alert-danger">
										{formErrors && formErrors.fruit}
									</i>
									<small className="form-text text-muted">
										Check the skills that you have mastered
									</small>
								</div>

								<div className="form-group">
									<input
										type="text"
										className="form-control "
										placeholder="Github Username"
										name="githubusername"
										ref={register({ required: false })}
									/>
									<small className="form-text text-muted">
										If you want your latest repos and a Github link, include
										your username
									</small>
								</div>
								<div className="form-group">
									<textarea
										className="form-control "
										placeholder="A short bio of yourself"
										name="bio"
										ref={register({ required: "This is required" })}
									></textarea>
									<ErrorMessage
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
										className="form-control "
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
										className="form-control "
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
										className="form-control "
										placeholder="Linkedin - https://in.linkedin.com/name"
										name="linkedin"
									/>
									<i className="alert-danger">
										{formErrors && formErrors.linkedin}
									</i>
								</div>
							</div>
						</div>
						<input
							value="Create"
							type="submit"
							className="btn btn-info btn-block mt-4"
							style={{ width: "50%", margin: "0 auto" }}
						/>
					</form>
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	const axioscfg = ssrAuth(ctx, axios);
	const { data } = await axios.get("/api/profile/skills", axioscfg);
	// console.log(data);
	return { props: { skills: data } };
}

export default React.memo(CreateProfile);

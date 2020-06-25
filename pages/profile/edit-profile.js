import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useForm, ErrorMessage } from "react-hook-form";
import axios from "axios";

import ssrAuth from "../../utils/ssrAuth";
import Layout from "../../components/layout";
import {
	saveProfile,
	editCurrentProfile,
} from "../../redux/actions/profileActions";

function EditProfile(props) {
	// console.count("edi-pro");
	const [initalVal, setInitialVal] = React.useState(props.profile);
	const { handleSubmit, errors, register } = useForm();
	const formErrors = useSelector((state) => state.errors);
	const { push } = useRouter();
	const dispatch = useDispatch();

	// console.log(initalVal);

	const socialArr = props.profile.social.slice(1, -1).split(",");

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
			desc="Edit profile section"
		>
			<div className="row">
				<div className="col-md-12 m-auto">
					<h1 className="display-4 text-center">Update Your Profile</h1>
					<p className="lead text-center">Make your profile stand out</p>
					<small className="d-block pb-3">* = required input</small>
					<form noValidate onSubmit={handleSubmit(getFormValues)}>
						<div className="row">
							<div
								className="col-md-6 col-xs-12"
								style={{ borderRight: "1px solid #c6c6c6" }}
							>
								<div className="form-group">
									<input
										type="text"
										defaultValue={initalVal.handle}
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
										value={initalVal.status}
										onChange={handleChange}
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
									<input
										type="text"
										defaultValue={initalVal.company}
										className="form-control "
										placeholder="Company"
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
										defaultValue={initalVal.website}
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
										defaultValue={initalVal.location}
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
										City & state suggested (eg. Boston, MA)
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
													defaultChecked={props.checkedSkills.includes(id)}
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
										ref={register({ required: false })}
										defaultValue={initalVal.githubusername}
										type="text"
										className="form-control "
										placeholder="Github Username"
										name="githubusername"
									/>
									<small className="form-text text-muted">
										If you want your latest repos and a Github link, include
										your username
									</small>
								</div>
								<div className="form-group">
									<textarea
										defaultValue={initalVal.bio}
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
										defaultValue={socialArr[0]}
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
										defaultValue={socialArr[1]}
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
										defaultValue={socialArr[2]}
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
						<input type="submit" className="btn btn-info btn-block mt-4" />
					</form>
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	const axioscfg = ssrAuth(ctx, axios);
	const { data } = await axios.get("/api/profile/skills", axioscfg);
	const profile = await axios.get("/api/edit-profile", axioscfg);
	// console.log(profile);
	const checkedSkills = profile.data.users_skills.map(({ skillId }) => skillId);
	// console.log(checkedSkills);
	// console.log(data);
	return { props: { skills: data, profile: profile.data, checkedSkills } };
}

export default React.memo(EditProfile);

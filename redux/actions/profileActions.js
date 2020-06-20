import axios from "axios";
import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	FETCH_ERRORS,
} from "./types";

// GET CURRENT PROFILE

export const getProfileList = () => async (dispatch) => {
	// request to get logged in user profile
	try {
		const res = await axios.get("/api/profile/all");
		dispatch({ type: GET_PROFILES, payload: res.data });
	} catch (err) {
		// console.log(err.response.data);
		dispatch(clearCurrentProfile());
		dispatch({ type: GET_PROFILES, payload: null });
		dispatch({ type: FETCH_ERRORS, payload: err.response.data });
	}
};

export const getCurrentProfile = (para) => async (dispatch) => {
	// request to get logged in user profile
	try {
		//starts: setting Authorization forceFully as after logging from google
		// there was a dealy in setting authorization in header
		// only in case of google oauth
		const token = localStorage.getItem("jwtToken");
		axios.defaults.headers.common["Authorization"] = token;
		// ends:
		const res = await axios.get("/api/profile");
		if (para === "create") {
			return res.data;
		}
		dispatch({ type: GET_PROFILE, payload: res.data });
	} catch (err) {
		dispatch({ type: GET_PROFILE, payload: {} });
	}
};

export const getProfileByHandle = (handle) => async (dispatch) => {
	// request to get logged in user profile
	try {
		const res = await axios.get(`/api/profile/handle/${handle}`);
		dispatch({ type: GET_PROFILE, payload: res.data });
	} catch (err) {
		dispatch({ type: GET_PROFILE, payload: {} });
	}
};

export const editCurrentProfile = () => async (dispatch) => {
	// request to get logged in user profile
	dispatch(setProfileLoading());
	try {
		const res = await axios.get("/api/edit-profile");
		return res.data;
	} catch (err) {
		return err.response.data;
	}
};

export const saveProfile = (values, push) => async (dispatch) => {
	dispatch(setProfileLoading());
	try {
		await axios.post("/api/profile", values);
		dispatch({ type: FETCH_ERRORS, payload: null });
		push("/dashboard");
	} catch (err) {
		dispatch({ type: FETCH_ERRORS, payload: err.response.data });
	}
};

export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING,
	};
};

export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE,
	};
};

export const createExperience = (values, push) => async (dispatch) => {
	try {
		await axios.post("/api/profile/experience/add", values);
		dispatch({ type: FETCH_ERRORS, payload: null });
		push("/dashboard");
	} catch (err) {
		// console.log(err);
		dispatch({ type: FETCH_ERRORS, payload: err.response.data });
	}
};

export const removeExpData = (expId) => async (dispatch) => {
	try {
		await axios.delete(`/api/profile/experience/${expId}`);
		dispatch(getCurrentProfile());
	} catch (err) {
		dispatch({ type: FETCH_ERRORS, payload: err.response.data });
	}
};

export const createEducation = (values, push) => async (dispatch) => {
	try {
		await axios.post("/api/profile/education/add", values);
		push("/dashboard");
	} catch (err) {
		// console.log(err);
		dispatch({ type: FETCH_ERRORS, payload: err.response.data });
	}
};

export const removeEduData = (expId) => async (dispatch) => {
	try {
		await axios.delete(`/api/profile/education/${expId}`);
		dispatch(getCurrentProfile());
	} catch (err) {
		dispatch({ type: FETCH_ERRORS, payload: err.response.data });
	}
};

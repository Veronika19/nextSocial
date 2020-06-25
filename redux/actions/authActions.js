import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";

import setAuthToken from "../../utils/setAuthToken";
import {
	FETCH_CURR_USER,
	FETCH_ERRORS,
	CLEAR_CURRENT_PROFILE,
	FETCH_CURR_PASS,
} from "./types";

// export const fetchUser = () => {
// 	return function(dispatch){
// 		axios.get('/api/current-user')
// 			.then(res => {
// 				dispatch({
// 					type: FETCH_USER,
// 					payload: res
// 				})
// 			})
// 	}
// };

// commented code is same as below with async await

export const submitRegister = (values, push) => async (dispatch) => {
	try {
		const { data } = await axios.post("/api/users/register", values);
		console.log(data);
		let succMsg =
			"Your account has been created, please confirm your email address to active it.";
		Cookie.set("acct-confirm-msg", succMsg, {
			expires: 1,
			sameSite: "lax",
		});
		push("/login");
	} catch (err) {
		dispatch({ type: FETCH_ERRORS, payload: err.response.data });
	}
};

export const oauthLogin = (token, history) => (dispatch) => {
	try {
		// set token to localStorage only store data in string
		localStorage.setItem("jwtToken", token);
		// Set token to header
		// from util directory setAuthToken.js
		setAuthToken(token);
		// decode token to get user data
		const decoded = jwt_decode(token);
		dispatch(setCurrentUser(decoded));
		history.push("/dashboard");
	} catch (err) {
		dispatch({ type: FETCH_ERRORS, payload: err.response.data });
	}
};

export const loginUser = (values, push) => async (dispatch) => {
	try {
		const res = await axios.post("/api/users/login", values);
		// save to localStorage
		const { token } = res.data;
		// set token to localStorage only store data in string
		Cookie.set("jwtToken", token, {
			expires: 1,
			sameSite: "lax",
			secure: true,
		});
		// localStorage.setItem("jwtToken", token);
		// Set token to header
		// from util directory setAuthToken.js
		setAuthToken(token);
		// decode token to get user data
		const decoded = jwt_decode(token);
		dispatch(setCurrentUser(decoded));
		push("/dashboard");
	} catch (err) {
		console.log(err);
		dispatch({ type: FETCH_ERRORS, payload: err.response.data });
	}
};

export const getCurrentUserPass = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/users/current");
		dispatch({ type: FETCH_CURR_PASS, payload: res.data });
	} catch (err) {
		dispatch({ type: FETCH_ERRORS, payload: err.response.data });
	}
};

export const matchCurrentUserPass = async (values) => {
	try {
		const res = await axios.post("/api/users/match-password", values);
		return res.data;
	} catch (err) {
		return err.response.data;
	}
};

export const updateUserPass = async (values) => {
	try {
		const res = await axios.post("/api/users/update-password", values);
		return res.data;
	} catch (err) {
		return err.response.data;
	}
};

export const setCurrentUser = (decoded) => (dispatch) => {
	// console.log(decoded);
	dispatch({ type: FETCH_CURR_USER, payload: decoded });
};

// removing erros from component when its mount
export const removeErrors = () => {
	return {
		type: FETCH_ERRORS,
		payload: null,
	};
};

export const deleteAccount = () => async (dispatch) => {
	try {
		await axios.delete("/api/user");
		dispatch({ type: CLEAR_CURRENT_PROFILE });
		dispatch(logout());
		// history.push('/login')
	} catch (err) {
		dispatch({ type: FETCH_ERRORS, payload: err.response.data });
	}
};

export const logout = () => (dispatch) => {
	// remove token from jwt token
	Cookie.remove("jwtToken");
	// localStorage.removeItem("jwtToken");
	// Remove Auth token from axios request
	setAuthToken(false);
	// reset auth state
	dispatch(setCurrentUser({}));
};

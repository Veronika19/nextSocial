import axios from "axios";
import { GET_POST, GET_POSTS, FETCH_ERRORS, POST_LOADING } from "./types";

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

export const addPost = (values, reset) => async (dispatch) => {
	// dispatch(loadingPost());
	try {
		await axios.post("/api/post/add", values);
		reset();
		dispatch(getAllPost());
	} catch (err) {
		dispatch({ type: FETCH_ERRORS, payload: err.response.data });
	}
};

export const deletePost = (postId) => async (dispatch) => {
	try {
		await axios.delete(`/api/post/${postId}`);
		dispatch(getAllPost());
	} catch (err) {
		dispatch({ type: FETCH_ERRORS, payload: err.response.data });
	}
};

export const commentDelete = (commentId, postId) => async (dispatch) => {
	try {
		await axios.delete(`/api/post/delete/comment/${commentId}`);
		dispatch(getPostById(postId));
	} catch (err) {
		dispatch({ type: FETCH_ERRORS, payload: err.response.data });
	}
};

export const getAllPost = (values) => async (dispatch) => {
	// dispatch(loadingPost());
	try {
		const res = await axios.get("/api/posts");
		dispatch({ type: FETCH_ERRORS, payload: null });
		dispatch({ type: GET_POSTS, payload: res.data });
	} catch (err) {
		dispatch({ type: FETCH_ERRORS, payload: err.response.data });
	}
};

export const getPostBySlug = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/post-slug/${id}`);
		// console.log(res);
		dispatch({ type: GET_POST, payload: res.data });
	} catch (err) {
		dispatch({ type: FETCH_ERRORS, payload: err.response.data });
	}
};

export const postComment = (id, comment) => async (dispatch) => {
	try {
		await axios.post(`/api/post/comment/${id}`, comment);
		// console.log(res.data);
		dispatch(getPostById(id));
	} catch (err) {
		dispatch({ type: FETCH_ERRORS, payload: err.response.data });
	}
};

export const loadingPost = () => (dispatch) => {
	dispatch({ type: POST_LOADING });
};

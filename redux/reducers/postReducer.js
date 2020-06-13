import { GET_POST, GET_POSTS, POST_LOADING } from "../actions/types";

const initialState = {
	posts: null,
	post: null,
	loading: false,
};

function postReducer(state = initialState, actions) {
	switch (actions.type) {
		case GET_POSTS:
			return {
				...state,
				posts: actions.payload,
				loading: false,
			};
		case GET_POST:
			return {
				...state,
				posts: null,
				post: actions.payload,
				loading: false,
			};
		case POST_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}

export default postReducer;

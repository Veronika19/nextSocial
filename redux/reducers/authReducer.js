import { FETCH_CURR_USER, FETCH_CURR_PASS } from "../actions/types";
import isEmpty from "../../utils/is-empty";

const initialState = {
	isAuthenticated: false,
	currUserD: {},
	user: {},
};

function authReducer(state = initialState, action) {
	// console.log(action)
	switch (action.type) {
		case FETCH_CURR_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			};
		case FETCH_CURR_PASS:
			return {
				...state,
				isAuthenticated: true,
				currUserD: action.payload,
			};
		default:
			return state;
	}
}

export default authReducer;

import { FETCH_ERRORS } from "../actions/types";

function errorReducer(state = null, action) {
	switch (action.type) {
		case FETCH_ERRORS:
			return action.payload || null;
		default:
			return state;
	}
}

export default errorReducer;

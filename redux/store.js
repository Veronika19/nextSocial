import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import rootReducer from "./reducers";

// create a makeStore function
const composeEnhancers =
	(typeof window != "undefined" &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const reducer = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
		};
		if (state.auth) nextState.auth = state.auth; // preserve auth value on client side navigation
		return nextState;
	} else {
		return rootReducer(state, action);
	}
};

export const initStore = () =>
	createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk)));

export const wrapper = createWrapper(initStore, { debug: false });

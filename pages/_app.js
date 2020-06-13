import React from "react";
import { wrapper, initStore } from "../redux/store";
import Bus from "../utils/bus";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";

import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser } from "../redux/actions/authActions";

const MyApp = ({ Component, pageProps }) => {
	if (typeof window !== "undefined") {
		if (localStorage.jwtToken) {
			const dispatch = useDispatch();
			// Set Auth token header auth
			setAuthToken(localStorage.jwtToken);
			// decode token and get user info and expire time
			const decoded = jwt_decode(localStorage.jwtToken);
			dispatch(setCurrentUser(decoded));
		}

		window.flash = (message, type = "success") =>
			Bus.emit("flash", { message, type });
	}

	return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);

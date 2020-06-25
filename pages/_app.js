import React from "react";
import { wrapper, initStore } from "../redux/store";
import { useDispatch } from "react-redux";
import Router from "next/router";

import Loader from "../components/loader";
import Bus from "../utils/bus";
import Layout from "../components/layout";

import { removeErrors } from "../redux/actions/authActions";

const visibleStyle = {
	display: "",
	transition: "display 3s",
};
const inVisibleStyle = {
	display: "none",
	transition: "display 3s",
};

const MyApp = ({ Component, pageProps }) => {
	const [loaded, setLoaded] = React.useState(false);
	const dispatch = useDispatch();

	React.useEffect(() => {
		setLoaded(true);
		Router.events.on("routeChangeStart", () => {
			dispatch(removeErrors());
			setLoaded(false);
		});
		Router.events.on("routeChangeComplete", () => setLoaded(true));
	}, []);

	if (typeof window !== "undefined") {
		window.flash = (message, type = "success") =>
			Bus.emit("flash", { message, type });
	}

	return (
		<>
			<span style={loaded ? inVisibleStyle : visibleStyle}>
				<Loader />
			</span>
			<span style={loaded ? visibleStyle : inVisibleStyle}>
				<Component {...pageProps} />
			</span>
		</>
	);
};

export default wrapper.withRedux(MyApp);

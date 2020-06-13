import React, { useState, useEffect } from "react";
// import spinner from "./Preloader_3.gif";

export default (props) => {
	const [di, setDi] = useState("200px");

	useEffect(() => {
		setDi((prevVal) => {
			return props.swidth !== undefined ? props.swidth : di;
		});
	}, [setDi, props, di]);

	return (
		<div>
			<h1 style={{ width: di, margin: "auto", display: "block" }}>
				LOADING........
			</h1>
			{/*<img
				src={spinner}
				style={{ width: di, margin: "auto", display: "block" }}
				alt="Loading.."
			/>*/}
		</div>
	);
};

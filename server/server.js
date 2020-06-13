const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const db = require("./config");
const passport = require("passport");

app.prepare().then(() => {
	const server = express();
	server.use(express.json());
	server.use(passport.initialize());

	// passport configuration
	require("./config/passport")(passport, db);
	require("./routes/user")(server, db);
	require("./routes/profile")(server, db);

	// setting a wildcard route,
	// to handle each request made to server

	// server.post("/api/users/register", (req, res) => {
	// 	const reqData = req.body;
	// 	res.status(200).json(reqData);
	// });

	server.get("*", (req, res) => handle(req, res));

	server.listen(port, (err) => {
		if (err) throw err;
		console.log(`Running on port ${port}`);
	});
});

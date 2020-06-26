module.exports = {
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	secretOrKey: process.env.DB_SecretOrKey,
	googleClientID: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_SECRET,
	sendGridKey: process.env.SENDGRID_KEY,
	redirectDomain: process.env.CURR_DOMAIN,
};

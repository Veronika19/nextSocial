export default (ctx, axios) => {
	if (ctx.req.headers.cookie === undefined) {
		ctx.res.setHeader("location", "/login");
		ctx.res.statusCode = 302; // temporary redirect
		ctx.res.end();
		return false;
	}
	const token = unescape(ctx.req.headers.cookie.split("=")[1]);
	const axioscfg = ctx.req ? { baseURL: `http://${ctx.req.headers.host}` } : {};
	axios.defaults.headers.common["Authorization"] = token;
	return axioscfg;
};

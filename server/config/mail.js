const sgMail = require("@sendgrid/mail");

const keys = require("../config/keys");
const registerTemplate = require("./emailTemplates/register");

module.exports = async (params) => {
	const { to, from, subject, emailData, template } = params;
	let htmlTemplate;
	switch (template) {
		case "register":
			htmlTemplate = registerTemplate(emailData);
			break;
		default:
			htmlTemplate = defaultTemplate();
	}
	sgMail.setApiKey(keys.sendGridKey);
	const msg = {
		to,
		from,
		subject,
		html: htmlTemplate,
	};
	await sgMail.send(msg);
};

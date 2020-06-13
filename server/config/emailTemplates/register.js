module.exports = ({ userCreate, confirmUrl }) => {
	return `
	<html>
		<body>
			<div style="text-align: center;">
				<h3>Welcome to Dev Zilla</h3>
				<p>${userCreate.name}, we need you to verify your account in order to activate it.</p>
				<div>
					<a href="${confirmUrl}">Click the link to verify your account</a>
				</div>
			</div>
		</body>
	</html>
	`;
};

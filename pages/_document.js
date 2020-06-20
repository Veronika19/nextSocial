import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		// console.log(initialProps);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no"
					/>
					<link rel="stylesheet" href="/css/bootstrap.min.css" />
				</Head>
				<body style={{ overflowX: "hidden" }}>
					<Main />
					<NextScript />
					<script
						src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
						integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
						crossOrigin="anonymous"
					></script>
				</body>
			</Html>
		);
	}
}

export default MyDocument;

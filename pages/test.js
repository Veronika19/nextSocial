import { useDispatch, useSelector } from "react-redux";

import Layout from "../components/layout";

const Test = () => {
	// const { isAuthenticated, user } = useSelector((state) => state.auth);

	// React.useEffect(() => {
	// 	if (!isAuthenticated) {
	// 		push("/login");
	// 	}
	// }, []);

	return (
		<Layout title="test" desc="dsdsd">
			<h1>Hello test</h1>
		</Layout>
	);
};

export default Test;

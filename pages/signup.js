import NavBar from "../components/NavBar";
import { Layout } from "antd";
import Categories from "../components/signupComponents/Categories";

export default function Signup() {
	return (
		<Layout>
			<NavBar />
			<Categories />
		</Layout>
	);
}

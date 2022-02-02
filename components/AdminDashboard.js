import { useState } from "react";
import AdminSidebar from "./AdminDashComponents/AdminSidebar";
import styles from "../styles/AdminDB.module.css";
import { Layout } from "antd";
import Donors from "./AdminDashComponents/Donors";
import Projects from "./AdminDashComponents/Projects";

import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";

const { Content } = Layout;

const AdminDashboard = () => {
	const [selectedMenu, setSelectedMenu] = useState("1");

	const returnPage = (selectedMenu) => {
		switch (selectedMenu) {
			case "1":
				return <Donors />;
			case "2":
				return <Projects />;
			default:
				return;
		}
	};

	return (
		<Layout>
			<Content className={styles.dashboardContent}>
				<AdminSidebar setSelectedMenu={setSelectedMenu} />
				{returnPage(selectedMenu)}
			</Content>
		</Layout>
	);
};

const MyLoader = () => <div>Loading...</div>;
export default withAuthUser({
	whenAuthed: AuthAction.RENDER,
	whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
	LoaderComponent: MyLoader,
})(AdminDashboard);

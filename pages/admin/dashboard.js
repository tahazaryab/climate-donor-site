import React, { useEffect, useState } from "react";
//import DBNavBar from '/components/DBNavBar'
import AdminSidebar from "../../components/AdminDashComponents/AdminSidebar";
import styles from "../../styles/AdminDB.module.css";
import { Dropdown, Layout, Row } from "antd";
import ProjectsDisplay from "../../components/ProjectsDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Donors from "../../components/AdminDashComponents/Donors";
import Projects from "../../components/AdminDashComponents/Projects";

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
export default AdminDashboard;
// withAuthUser({
// 	whenAuthed: AuthAction.RENDER,
// 	whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
// 	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
// 	LoaderComponent: MyLoader,
// })(AdminDashboard);

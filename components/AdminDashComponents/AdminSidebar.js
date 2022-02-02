import React from "react";
import "antd/dist/antd.css";
import { Menu } from "antd";
import styles from "../../styles/Sidebar.module.css";

const { SubMenu } = Menu;
const AdminSidebar = ({ setSelectedMenu }) => {
	const handleMenuSelect = (e) => {
		setSelectedMenu(e.key);
	};
	return (
		<>
			<Menu
				style={{ width: 256 }}
				defaultSelectedKeys={["1"]}
				defaultOpenKeys={["sub1"]}
				mode="inline"
				className={styles.customSidebar}
				onClick={handleMenuSelect}
			>
				<SubMenu key="sub1" title="Admin" className={styles.customSubmenu}>
					<Menu.Item key="1">Donors</Menu.Item>
					<Menu.Item key="2">Projects</Menu.Item>
				</SubMenu>
			</Menu>
		</>
	);
};

export default AdminSidebar;

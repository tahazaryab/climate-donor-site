import React from "react";
import "antd/dist/antd.css";
import { Menu } from "antd";
import styles from "../styles/Sidebar.module.css";

const { SubMenu } = Menu;
const Sidebar = (props) => {
  const handleMenuSelect = (e) => {
    props.setSelectedMenu(e.key);
  };
  return (
    <>
      <Menu
        style={{ width: 230 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        className={styles.customSidebar}
        onClick={handleMenuSelect}
      >
        <SubMenu key="sub1" title="Donor" className={styles.customSubmenu}>
          <Menu.Item key="1">Projects</Menu.Item>
          <Menu.Item key="2">Search</Menu.Item>
          <Menu.Item key="3">Donation History</Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
};

export default Sidebar;

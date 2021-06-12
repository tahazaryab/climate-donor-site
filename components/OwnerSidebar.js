import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import styles from '../styles/Sidebar.module.css'

const { SubMenu } = Menu;
const OwnerSidebar = () => {
    return (
        <>
            <Menu
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                className={styles.customSidebar}
            >
                <SubMenu key="sub1" title="Project Owner" className={styles.customSubmenu}>
                    <Menu.Item key="1">Dashboard</Menu.Item>
                    <Menu.Item key="2">Settings</Menu.Item>
                </SubMenu>
            </Menu>
        </>
    );

}

export default OwnerSidebar;
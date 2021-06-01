import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import styles from '../styles/Sidebar.module.css'
import Link from 'next/link'
const { SubMenu } = Menu;
const Sidebar = () => {
    return (
        <>
            <Menu
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                className={styles.customSidebar}
            >
                <SubMenu key="sub1" title="Donor" className={styles.customSubmenu}>
                    <Menu.Item key="1">My Projects</Menu.Item>
                    <Menu.Item key="2">Saved Projects</Menu.Item>
                    <Menu.Item key="3"><Link href="/recommended"><a>Recommended</a></Link></Menu.Item>
                    <Menu.Item key="4">Donation Histroy</Menu.Item>
                </SubMenu>
            </Menu>
        </>
    );

}

export default Sidebar;
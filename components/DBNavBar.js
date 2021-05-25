import React from 'react'
import { Layout, Menu, Dropdown } from 'antd';
import styles from '../styles/Navbar.module.css';
import { faBell, faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = Layout.Header;


const DBNavBar = ({ userId, signOut, userName }) => {
    const menu = (<Menu>
        <Menu.Item key="1">My Account</Menu.Item>
        <Menu.Item key="2" onClick={() => signOut()}>Sign Out</Menu.Item>
    </Menu>)

    return (
        <Header className={styles.appHeader}>
            <div className={styles.siteLogo}>
                <img src="logo2.png" alt="logo of Climate Donor" />
                <p>Climate Donor</p>
            </div>
            <div className={styles.iconsList}>
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <div className={styles.nameIcon}>{userName?.charAt(0)}</div>
                        <p>{userName}</p>
                        <span><FontAwesomeIcon icon={faChevronDown} /></span>
                    </a>
                </Dropdown>
                <div><FontAwesomeIcon icon={faBell} /></div>
                <div><FontAwesomeIcon icon={faPlus} /></div>
            </div>
        </Header>
    );
}

export default DBNavBar;
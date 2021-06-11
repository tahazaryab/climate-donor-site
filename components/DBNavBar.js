import React from 'react'
import { Layout, Menu, Dropdown } from 'antd';
import styles from '../styles/Navbar.module.css';
import { faBell, faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    useAuthUser,
    withAuthUser,
    AuthAction
} from 'next-firebase-auth'

const Header = Layout.Header;


const DBNavBar = () => {
    const menu = (<Menu>
        <Menu.Item key="1">My Account</Menu.Item>
        <Menu.Item key="2" onClick={() => AuthUser.signOut()}>Sign Out</Menu.Item>
    </Menu>)
    const AuthUser = useAuthUser()
    const displayName = useAuthUser().firebaseUser.displayName
    const userName = displayName != null ? displayName : 'Name'

    return (
        <Header className={styles.appHeader}>
            <div className={styles.siteLogo}>
                <img src="/logo2.png" alt="logo of Climate Donor" />
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

export default withAuthUser({
    whenAuthed: AuthAction.RENDER,
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  })(DBNavBar);
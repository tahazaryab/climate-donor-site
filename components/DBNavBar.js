import { useEffect, useState } from "react";
import { Layout, Menu, Dropdown } from "antd";
import styles from "../styles/DBNavbar.module.css";
import {
  faBell,
  faPlus,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";
import { getDoc } from "../lib/firebase";
import Link from "next/link";

const Header = Layout.Header;

const DBNavBar = () => {
  const AuthUser = useAuthUser();
  const [name, setName] = useState("Name");

  useEffect(async () => {
    try {
      const user = await getDoc("users", AuthUser.id);
      setName(user.fullName);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="1">My Account</Menu.Item>
      <Menu.Item key="2" onClick={() => AuthUser.signOut()}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className={styles.appHeader}>
      <div className={styles.siteLogo}>
        <Link href="/">
          <img src="/logo2.png" alt="logo of Climate Donor" />
        </Link>
        <Link href="/">
          <p>Climate Donor</p>
        </Link>
      </div>
      <div className={styles.iconsList}>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <div className={styles.nameIcon}>{name[0]}</div>
            <p>{name}</p>
            <span>
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </a>
        </Dropdown>
        <div>
          <FontAwesomeIcon icon={faBell} />
        </div>
        <div>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
    </Header>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(DBNavBar);

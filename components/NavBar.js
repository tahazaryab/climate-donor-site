import React from "react";
import { Layout, Menu, Button } from "antd";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";

const Header = Layout.Header;

const NavBar = ({ userId, signOut }) => {
	let authenticationItem = userId ? (
		<Menu.Item key="/logout">
			<Button
				onClick={() => {
					signOut();
				}}
			>
				Logout
			</Button>
		</Menu.Item>
	) : (
		<Menu.Item key="/signin">
			<Button type="primary" href="/signin">
				Sign In
			</Button>
		</Menu.Item>
	);

	let menuItems;
	menuItems = [
		<Menu.Item key="/">
			<Link href="/">Home</Link>
		</Menu.Item>,
		<Menu.Item key="/about">
			<Link href="/about">About</Link>
		</Menu.Item>,
		<Menu.Item key="/contact">
			<Link href="/contact">Contact</Link>
		</Menu.Item>,
		<Menu.Item key="/getInvolved">
			<Link href="/getInvolved">Get Involved</Link>
		</Menu.Item>,
		authenticationItem,
		<Menu.Item key="/donate">
			<Button href="/signin"type="primary">Donate</Button>
		</Menu.Item>,
	];

	return (
		<Header className={styles.appHeader}>
			<div className={styles.siteLogo}>
				<img src="/logo2.png" alt="logo of Climate Donor" />
				<p>Climate Donor</p>
			</div>
			<Menu className={styles.siteMenu} mode="horizontal">
				{menuItems}
			</Menu>
		</Header>
	);
};

export default NavBar;

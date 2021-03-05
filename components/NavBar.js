import React from 'react'
import {Component} from 'react'
import {Layout, Menu, Dropdown, Button} from 'antd';
import './Navbar.module.css';
import Link from 'next/link'

const Header = Layout.Header;

class NavBar extends Component {

    render() {
        let menuItems;
        menuItems = [
            <Menu.Item key="/home">
                <Link href="/home">Home</Link>
            </Menu.Item>,
            <Menu.Item key="/about">
                <Link href="/about">About</Link>
            </Menu.Item>,
            <Menu.Item key="/contact">
                <Link href="/contact">Contact</Link>
            </Menu.Item>,
            <Menu.Item key="/takeaction">
                <Link href="/takeaction">Take Action</Link>
            </Menu.Item>,
            <Menu.Item key="/login">
                <Button href="/signin">Log In</Button>
            </Menu.Item>,
            <Menu.Item key="/donate">
                <Button type="primary">Donate</Button>
            </Menu.Item>
        ];

        return (
            <Header className="app-header">
                <Menu
                    className="site-menu"
                    mode="horizontal"
                    >
                    {menuItems}
                </Menu>
            </Header>
        );
    }
}

export default NavBar;
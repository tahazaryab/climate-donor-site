import React from 'react'
import {Component} from 'react'
import {Layout, Menu, Dropdown} from 'antd';
import Link from 'next/link'


const Header = Layout.Header;

class NavBar extends Component {

    render() {
        let menuItems;
        menuItems = [
            <Menu.Item key="logo">
                <img className="logo" src={'vercel.svg'}></img>
            </Menu.Item>,
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
                <Link href="/signin">Log In</Link>
            </Menu.Item>
        ];

        return (
            <Header className="app-header">
                <Menu
                    className="site-menu"
                    mode="horizontal"
                    style={{lineHeight: '64px'}}>
                    {menuItems}
                </Menu>
            </Header>
        );
    }
}

export default NavBar;
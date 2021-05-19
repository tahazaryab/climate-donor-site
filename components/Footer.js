import React from 'react'
import {Component} from 'react'
import {Layout, Menu, Dropdown} from 'antd';
import styles from "../styles/Home.module.css";


const Footer = Layout.Footer;

class AppFooter extends Component {
    render() {
        return (
            <Footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Follow us on Social Media {' '}
                </a>
            </Footer>
        );
    }
}
export default AppFooter;
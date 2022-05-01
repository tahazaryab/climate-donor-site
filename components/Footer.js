import React from "react";
import { Component } from "react";
import { Layout, Menu, Dropdown } from "antd";
import styles from "../styles/Footer.module.css";
import Link from "next/link";

class AppFooter extends Component {
  render() {
    return (
      <>
        <hr />
        <div className={styles.footer}>
          <div class={styles.first}>
            <div className={styles.siteLogo}>
              <img src="/logo2.png" alt="logo of Climate Donor" />
              <p>Climate Donor</p>
            </div>
            <h2 className="subtitle" style={{fontSize: "1.5em"}}>
                ClimateDonor.org is a 501(c)(3) nonprofit organization that is
                focused on mitigation and reversal of global climate change and
                species extinction.
              </h2>
          </div>
          <div class={styles.second}>
          <Link href="/about">
            <h2 className={styles.link}>About Climate Donor</h2>
            </Link>
          </div>
          <div class={styles.third}>
          <Link href="/getInvolved">
            <h2 className={styles.link}>Get Involved</h2>
            </Link>
          </div>
          <div class={styles.fourth}>
            <h2 className={styles.title}>Connect</h2>
            <div className={styles.media}>
              <a
                href="https://twitter.com/ClimateDonor/"
                target="_blank"
                style={{ display: "flex" }}
              >
                <img src="./img/icons/twitter.svg" alt="twitter"></img>
                <span
                  style={{ color: "black", margin: "auto", marginLeft: "1vw" }}
                >
                  Twitter
                </span>
              </a>
              <a
                href="https://www.instagram.com/climatedonor/"
                target="_blank"
                style={{ display: "flex" }}
              >
                <img src="./img/icons/instagram.svg" alt="instagram"></img>
                <span
                  style={{ color: "black", margin: "auto", marginLeft: "1vw" }}
                >
                  Instagram
                </span>
              </a>
              <a
                href="https://www.linkedin.com/company/climatedonor-org/"
                target="_blank"
                style={{ display: "flex" }}
              >
                <img src="./img/icons/linkedin.svg" alt="linkedin"></img>
                <span
                  style={{ color: "black", margin: "auto", marginLeft: "1vw" }}
                >
                  LinkedIn
                </span>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default AppFooter;

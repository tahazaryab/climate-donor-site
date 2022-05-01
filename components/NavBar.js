import React from "react";
import { Layout, Menu, Button } from "antd";
import styles from "../styles/Navbar.module.css";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";


const NavBar = ({ userId, signOut }) => {
  let listener = null;
  const [scrollState, setScrollState] = useState("top");
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const pathName = router.pathname;
  console.log(pathName);

  useEffect(() => {
    listener = document.addEventListener("scroll", (e) => {
      var scrolled = document.scrollingElement.scrollTop;
      if (scrolled > 0) {
        if (scrollState !== "scrolling") {
          setScrollState("scrolling");
        }
      } else {
        if (scrollState !== "top") {
          setScrollState("top");
        }
      }
    });
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [scrollState]);

  let authenticationItem = userId ? (
    <Button
      onClick={() => {
        signOut();
      }}>
      Logout
    </Button>
  ) : (
    <Button type="primary" href="/signin">
      Sign In
    </Button>
  );

  return (
    <nav
      className={`w-100 navbar navbar-expand-lg top-0 start-0 p-3 ${
        scrollState !== "scrolling" && pathName != "/signin" && pathName != "/signup"
          ? !expanded
            ? styles.transpnav + ` position-absolute navbar-dark bg-transparent`
            : styles.lightnav + " position-absolute navbar-light bg-light"
          : styles.lightnav + " position-sticky navbar-light bg-light"
      }`}>
      <div className={"container-fluid"}>
        <a className="navbar-brand" href="/">
          <img
            className="inline"
            src="/logo2.png"
            alt="logo of Climate Donor"
            width="40"
            height="40"
          />
          <h6 className="float-end">Climate Donor</h6>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={(e) => {
            setExpanded(e.currentTarget.getAttribute("aria-expanded"));
          }}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/getInvolved">
                Get Involved
              </a>
            </li>
          </ul>
          {authenticationItem}
          <Button href="/signin" type="primary">
            Donate
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

{
  /* <Header classNameName={styles.appHeader}>
      <div classNameName={styles.siteLogo}>
        <a href="/">
          <img src="/logo2.png" alt="logo of Climate Donor" />
        </a>
        <a href="/">
          <p>Climate Donor</p>
        </a>
      </div>
      <Menu classNameName={styles.siteMenu} disabledOverflow="true" mode="horizontal">
        {menuItems}
      </Menu>
    </Header> */
}

import Link from "next/link";
import NavBar from "../components/NavBar";
import React from "react";
import Hero from "../components/Hero";
import AppFooter from "../components/Footer";
import styles from "../styles/About.module.css";
import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";
import { Footer } from "antd/lib/layout/layout";

export default function About() {
  const AuthUser = useAuthUser();
  return (
    <>
      <NavBar userId={AuthUser.id} signOut={AuthUser.signOut}></NavBar>
      <Hero
        h1="About Us"
        h2="ClimateDonor.org is a 501(c)(3) nonprofit organization that is focused on mitigation and reversal of global climate change and species extinction."
        type="about"></Hero>
      <section className={"centerContainer " + styles.grey}>
        <h1 className="global-h1">Our Vision</h1>
        <p className="global-p m-50">
          Empower broad-based citizen engagement to address climate change and
          species extinction through individual empowerment and local, regional,
          and international projects and programs.
        </p>
      </section>
      <section className={styles.plain + " " + styles.peopleSpacing}>
        <h1 className="global-h1">Our Team</h1>
        <div className={styles.plainIcons}>
          <div className={styles.people}>
            <img src="./about_img/Luis_Mejia.png" alt="active"></img>
            <p style={{ fontSize: "24px" }} className={styles.name}>
              Luis Mejia
            </p>
            <p className={styles.nameTitle}>Co-Founder</p>
          </div>
          <div className={styles.people}>
            <img src="./about_img/grecia_ro.png" alt="fund"></img>
            <p style={{ fontSize: "24px" }} className={styles.name}>
              Grecia Ro
            </p>
            <p className={styles.nameTitle}>Director of Engineering</p>
          </div>
          <div className={styles.people}>
            <img src="./about_img/JS+CD+Headshot.png" alt="donors"></img>
            <p style={{ fontSize: "24px" }} className={styles.name}>
              Jules Skelton
            </p>
            <p className={styles.nameTitle}>Director of Development & Giving</p>
          </div>
        </div>
        <p className="global-p"></p>
      </section>

      <section
        className={
          styles.plain + " " + styles.peopleSpacing + " " + styles.grey
        }>
        <h1 className="global-h1">Board</h1>
        <div className={styles.plainIcons}>
          <div className={styles.people}>
            <img src="./about_img/Luis_Mejia.png" alt="active"></img>
            <p style={{ fontSize: "24px" }} className={styles.name}>
              Luis Mejia
            </p>
            <p className={styles.nameTitle}>Co-Founder</p>
          </div>
          <div className={styles.people}>
            <img src="./about_img/BK.png" alt="fund"></img>
            <p style={{ fontSize: "24px" }} className={styles.name}>
              Brian Kissel
            </p>
            <p className={styles.nameTitle}>Secretary</p>
          </div>
          <div className={styles.people}>
            <img src="./about_img/90-Doug 1.png" alt="donors"></img>
            <p style={{ fontSize: "24px" }} className={styles.name}>
              Doug Aguilera
            </p>
            <p className={styles.nameTitle}>Treasurer</p>
          </div>
        </div>
        <p className="global-p"></p>
      </section>

      <section className={styles.plain + " " + styles.peopleSpacing}>
        <h1 className="global-h1">Volunteers</h1>
        <div className={styles.plainIcons} styles={{ marginBottom: "0px" }}>
          <div className={styles.volunteer}>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
          </div>
          <div className={styles.volunteer}>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
          </div>
          <div className={styles.volunteer}>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
          </div>
          <div className={styles.volunteer}>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
            <p className={styles.nameTitle}>FirstName Last Name</p>
          </div>
        </div>
      </section>
      <AppFooter></AppFooter>
    </>
  );
}

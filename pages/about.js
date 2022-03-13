import React from "react";
import styles from "../styles/About.module.css";
import NavBar from "../components/NavBar";
import AppFooter from "../components/Footer";
import Link from "next/link";
import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";
import { Footer } from "antd/lib/layout/layout";

export default function About() {
  const AuthUser = useAuthUser();
  return (
  	<>
      <NavBar userId={AuthUser.id} signOut={AuthUser.signOut}></NavBar>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.title}>
            <h1 className="global-h1">
              About Us
            </h1>
            <h2 className="subtitle">
            ClimateDonor.org is a 501(c)(3) nonprofit organization that is focused on mitigation and reversal of global climate change and species extinction.
            </h2>
          </div>
        </div>
      </section>

      <section className={styles.plain + " flex-column"}>
        <h1 className="global-h1">Our Vision</h1>
        <p className="p-text">
        Empower broad-based citizen engagement to address climate change and species extinction through individual empowerment and local, regional, and international projects and programs.
        </p>
      </section>

      <section style={{background: "#F5F5F5"}} className={styles.plain + " flex-column"}>
        <h1 className="global-h1">Our Mission</h1>
        <p className="space">
        Our mission to provide: <br></br>
          1) a globally accessible platform infrastructure (people, process, and technology) that supports other nonprofits, academic institutions, government agencies, and foundations working to address climate change and species extinction; and 
          <br></br>
          2) individual empowerment  apps aimed and providing climate change and species extinction resources and tools to the general public.
        </p>
        <div style={{marginTop: "60px"}}className="btn ant-btn-primary">Get Involved</div>
      </section>

      <section className={styles.plain + " " + styles.peopleSpacing}>
        <h1 className="global-h1">Our Team</h1>
        <div className={styles.plainIcons}>
          <div className={styles.people}>
            <img src="./about_img/Luis_Mejia.png" alt="active"></img>
            <p style={{fontSize: "24px"}} className={styles.name}>Luis Mejia</p>
            <p className={styles.nameTitle}>Co-Founder</p>
          </div>
          <div className={styles.people}>
            <img src="./about_img/grecia_ro.png" alt="fund"></img>
            <p style={{fontSize: "24px"}} className={styles.name}>Grecia Ro</p>
            <p className={styles.nameTitle}>Director of Engineering</p>
          </div>
          <div className={styles.people}>
            <img src="./about_img/JS+CD+Headshot.png" alt="donors"></img>
            <p style={{fontSize: "24px"}} className={styles.name}>Jules Skelton</p>
            <p className={styles.nameTitle}>Director of Development & Giving</p>
          </div>
        </div>
        <p className="global-p">
        </p>
      </section>

      <section style={{background: "#F5F5F5"}}className={styles.plain + " " + styles.peopleSpacing}>
        <h1 className="global-h1">Board</h1>
        <div className={styles.plainIcons}>
          <div className={styles.people}>
            <img src="./about_img/Luis_Mejia.png" alt="active"></img>
            <p style={{fontSize: "24px"}} className={styles.name}>Luis Mejia</p>
            <p className={styles.nameTitle}>Co-Founder</p>
          </div>
          <div className={styles.people}>
            <img src="./about_img/BK Photo 1.png" alt="fund"></img>
            <p style={{fontSize: "24px"}} className={styles.name}>Brian Kissel</p>
            <p className={styles.nameTitle}>Secretary</p>
          </div>
          <div className={styles.people}>
            <img src="./about_img/90-Doug 1.png" alt="donors"></img>
            <p style={{fontSize: "24px"}} className={styles.name}>Doug Aguilera</p>
            <p className={styles.nameTitle}>Treasurer</p>
          </div>
        </div>
        <p className="global-p">
        </p>
      </section>

      
      <section className={styles.plain + " " + styles.peopleSpacing}>
      
        <h1 className="global-h1">Volunteers</h1>
        <div className={styles.plainIcons} styles={{marginBottom: "0px"}}>
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
    )
}

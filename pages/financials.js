import React from "react";
import styles from "../styles/Financials.module.css";
import NavBar from "../components/NavBar";
import AppFooter from "../components/Footer";
import Link from "next/link";
import Hero from "../components/Hero";


import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";

export default function Financials() {
  return (
    <>
      <NavBar></NavBar>
      <Hero
        h1="Financials"
        h2="  Climate Donor is grateful for the support of our donors and wishes
              to express our appreciation for their generosity and support
              during these unprecedented times. We are proud of our
              accomplishments and are confident that together with our donors'
              activism we will make a meaningful impact in this moment of great
              need. As our donors' expect of us, we are committed to providing
              them with accurate, accessible records of where their donations
              are being used. In fulfillment of that obligation, we are pleased
              to provide the following financial disclosures."
        type="financials"></Hero>

      <section className={styles.plain + " centerContainer"}>
        <h1 className="global-h1">Trust & Transparency</h1>
        <h2 className="subtitle">
          Climate Donor was founded on the belief that people would donate to
          climate change projects if they could see where their money was going.
          From vetting every project request to monitoring how project owners
          are fulfilling project objectives, financial transparency and
          accountability are our core values. We know you expect nothing less
          from us. Because of your trust, we together will make an impact in
          fighting climate change and species extinction.y
        </h2>
      </section>
      <hr className={styles.break} />
      <section className={styles.portal + " centerContainer"}>
        <h2 className="subtitle">
          <b className={styles.emphasis}>
            100% of funding directly supports our climate change and species
            extinction mitigation mission.
          </b>
          On Climate Donor, you can choose the climate change projects you want
          to support. Your donation enables us to directly fund those projects
          as well as helps keep our pipeline filled with climate change and
          species extinction mitigation projects.
        </h2>
        <div className={styles.portalCard}>
          <div >
            <h2 className="subtitle">
              <b className={styles.emphasis}>Project costs: 85%</b>
            </h2>
            <h2 className="subtitle">
              The best way to have an impact is to fund as many climate change
              and species conservation projects.
            </h2>
          </div>
          <img src="./piechart.png" className="img" ></img>
          <div>
            <h2 className="subtitle" style={{"textAlign":"left"}}>
              <b className={styles.emphasis} >
                G&A, fundraising, and project acquisition: 15%
              </b>
            </h2>
            <h2 className="subtitle" style={{"textAlign":"left"}}>
              We’re driven to be as efficient as we can with donated funds,
              which is why we keep administration costs under constant scrutiny.
              That discipline extends to the extra efforts we need to make to
              source and vet projects that will have an impact.
            </h2>
          </div>
        </div>
      </section>
      <hr className={styles.break} />

      <section className={styles.plain + " centerContainer"}>
       
        <div className={styles.plainIcons}>
          <div>
            <h1 className="global-h1">Regulatory Filings</h1>
            <p>501(c)3 Designation</p>
            <p>501(c)3 Designation</p>

          </div>
          <div>
            <h1 className="global-h1">Corporate Governance</h1>
            <p>501(c)3 Designation</p>
            <p>501(c)3 Designation</p>
          </div>
          
        </div>
        <br/>
        
        
      </section>
     
      <AppFooter></AppFooter>
    </>
  );
}

const MyLoader = () => <div>Loading...</div>;

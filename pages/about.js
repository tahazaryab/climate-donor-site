import Link from "next/link";
import NavBar from "../components/NavBar";
import React from "react";
import Hero from "../components/Hero";
import AppFooter from "../components/Footer";

export default function About() {
  return (
    <>
      <NavBar />
      <Hero
        h1="About Us"
        h2="ClimateDonor.org is a 501(c)(3) nonprofit organization that is focused on mitigation and reversal of global climate change and species extinction."
        type="about"></Hero>
      <section className="centerContainer">
        <h1 className="global-h1">Our Vision</h1>
        <p className="global-p m-50">
          Empower broad-based citizen engagement to address climate change and
          species extinction through individual empowerment and local, regional,
          and international projects and programs.
        </p>
      </section>
      <section className="centerContainer grey-bg">
        <h1 className="global-h1">Citizen Scientists</h1>
        <p className="m-50">
          <p className="global-p">{`Our mission to provide:`}</p>
          <p className="global-p">
            1) a globally accessible platform infrastructure (people, process,
            and technology that supports other nonprofits, academic
            institutions, government agencies, and foundations working to
            address climate change and species extinction
          </p>
          <p className="global-p">
            2) individual empowerment apps aimed and providing climate change
            and species extinction resources and tools to the general public.
          </p>
        </p>
        <Link href="/getInvolved">
          <div className="btn">Get Involved</div>
        </Link>
      </section>
      <section className="team centerContainer container">
        <h1 className="global-h1">Our Team</h1>
        <div className="cardContainer"></div>
      </section>
      <section className="board centerContainer container grey-bg">
        <h1 className="global-h1">Board</h1>
        <div className="cardContainer"></div>
      </section>
      <section className="board centerContainer container">
        <h1 className="global-h1">Volunteers</h1>
        <div className="cardContainer"></div>
      </section>
      <AppFooter></AppFooter>
    </>
  );
}

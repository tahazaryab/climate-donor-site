import Link from "next/link";
import NavBar from "../components/NavBar";
import React from "react";
import Hero from "../components/Hero";
import HorizonCard from "../components/HorizonCard";
import DonateCard from "../components/getInvolvedComponents/donateCard/DonateCard";

export default function GetInvolved() {
  return (
    <>
      <NavBar />
      <Hero
        h1="Get Involved"
        h2="Engage in the fight against climate change and species extinction through projects of your choosing.  Your contribution to current projects in need of funding will make a difference."
        type="getInvolved"></Hero>
      <section className="donate centerContainer container">
        <h1 className="global-h1">Donate</h1>
        <div className="cardContainer">
          <DonateCard img="individual" title="Individuals" content="For an individual who would like to donate to our operating budget."/>
          <DonateCard img="foundation" title="Foundations" content="For a foundation, family office, or individual philanthropist looking to address climate change, clean energy access, and energy equity."/>
          <DonateCard img="corporation" title="Corporations" content="For a corporation that wants to donate funds, in-kind products or services, and/or employee volunteers."/>
        </div>
        <Link href="/projects">
          <div className="btn">See available projects</div>
        </Link>
      </section>
      <section className="centerContainer grey-bg">
        <h1 className="global-h1">Citizen Scientists</h1>
        <p className="global-p m-50">
          Grassroots citizen involvement in helping to find and implement
          solutions to climate change and species extinction will be critical to
          avoid catastrophic consequences. Help us to build a critical mass of
          Citizen Scientists by signing up now for a future study or experiment.
        </p>
        <Link href="/about">
          <div className="btn">Learn more</div>
        </Link>
      </section>
      <section className="container">
        <h1 className="global-h1">Contribute</h1>
        <HorizonCard
          title="Post a project"
          type="contribute"
          img="post.png"
          content={`For a nonprofit, academic institution, national lab or local government with projects that would like to obtain funding.`}></HorizonCard>
        <HorizonCard
          title="Upload an app"
          type="contribute"
          img="app.png"
          content={`Have an app that will fight against climate change or species extinction?  We’ll provide a curated library to help people find and download your app.`}></HorizonCard>
        <HorizonCard
          title="Advise us"
          type="contribute"
          img="advice.png"
          content={`If you have served as an adviser or board member to other nonprofits and would like to share your experiences with us.`}></HorizonCard>
        <HorizonCard
          title="Volunteer"
          type="contribute"
          img="volunteer.png"
          content={`For an individual volunteer who wants to contribute their time and talents to support.`}></HorizonCard>
      </section>
    </>
  );
}

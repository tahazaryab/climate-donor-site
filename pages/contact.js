import Link from 'next/link'
import NavBar from "../components/NavBar";
import React from "react";
import Hero from "../components/Hero";
import AppFooter from "../components/Footer";

export default function Contact() {
  return (
    <>
      <NavBar />
      <Hero
        h1="Contact Us"
        h2="Have questions about how to get involved? We are looking forward to hearing from you."
        type="contact"></Hero>
      <section className="centerContainer">
        <h1 className="global-h1">We are here to help</h1>
        <h3 className="global-h3">Emails:</h3>
        <p className="global-p m-50">
          <div>General Inquiries: info@climatedonor.org</div>
          <div>Project Owners: projectowners@climatedonor.org</div>
          <div>Individual Donors: donors@climatedonor.org</div>
          <div>Volunteers: volunteers@climatedonor.org</div>
          <div>Foundations: foundations@climatedonor.org</div>
          <div>Corporations: corporations@climatedonor.org</div>
          <div>Corporations: corporations@climatedonor.org</div>
          <div>Advisers: advisers@climatedonor.org</div>
        </p>
      </section>
      <AppFooter></AppFooter>
    </>
  );
}

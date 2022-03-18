import Link from 'next/link'
import NavBar from "../components/NavBar";
import React from "react";
import Hero from "../components/Hero"

export default function Contact() {
  return (
    <>
      <NavBar />
      <Hero
        h1="Contact Us"
        h2="Have questions about how to get involved? We are looking forward to hearing from you."
        type="contact"></Hero>
    </>
  );
}

import Link from 'next/link'
import NavBar from "../components/NavBar";
import React from "react";

export default function Contact() {
  return (
  	<>
        <NavBar>
        </NavBar>
  	<h1>Contact</h1>
  	<h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
     </>
    )
}

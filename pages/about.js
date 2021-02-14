import Link from 'next/link'
import NavBar from "../components/NavBar";
import React from "react";

export default function About() {
  return (
  	<>
        <NavBar>
        </NavBar>
  	<h1>About</h1>
  	<h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
     </>
    )
}

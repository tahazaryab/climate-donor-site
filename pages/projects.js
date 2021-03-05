import Link from 'next/link'
import NavBar from "../components/NavBar";
import React from "react";

export default function Projects() {
  return (
  	<>
        <NavBar>
        </NavBar>
  	<h1>Projects</h1>
  	<h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      <h3>test</h3>
     </>
    )
}

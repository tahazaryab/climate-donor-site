import Link from 'next/link'
import NavBar from "../components/NavBar";
import AppFooter from "../components/Footer";

import React from "react";

export default function Home() {
  return (
  	<>
        <NavBar>
        </NavBar>
  	<h1>Home Page</h1>
  	<h2>
        <Link href="/">
          <a>Home</a>
        </Link>
      </h2>
        <AppFooter></AppFooter>
     </>
    )
} 
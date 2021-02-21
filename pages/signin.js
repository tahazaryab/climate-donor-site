import Link from 'next/link'
import NavBar from "../components/NavBar";
import React from "react";

export default function Signin() {
  return (
  	<>
      <NavBar>
      </NavBar>
  	<h1>Sign In</h1>
    

  	<h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
     

    <form>
    <div>
    <label htmlFor="name">Email</label>
    <input id="email" name="email" type="email" required />
    </div>
    <div>
    <label htmlFor="password">Password</label>
    <input id="password" name="password" type="password" required />
    </div>
    <button type="submit">Sign In</button>
    </form>
    </>
    )
}

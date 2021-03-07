import Head from 'next/head'
import Link from 'next/link'
import React, { Component } from 'react';
import Button from 'antd/lib/button';
import styles from '../styles/Home.module.css'
import NavBar from "../components/NavBar";
import AppFooter from "../components/Footer";
// import '~antd/dist/antd.css';


import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'


const Home = () => {
  const AuthUser = useAuthUser()
  return (
    <>
        <NavBar userId={AuthUser.id} signOut={AuthUser.signOut}>
        </NavBar>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          CALL TO ACTION!
        </h1>
        <div> </div>
        <h2 className={styles.subtitle}>
          This is YOUR platform to enable you and other’s like you to engage in the fight against
          #ClimateChange and #SpeciesExtinction. Your tax deductible donation will be targeted at climate
          change and species extinction projects of your choosing. Your contribution to current projects in
          need of funding will make a difference. Act and Donate now.
        </h2>

      </main>

        <AppFooter></AppFooter>

    </>
  )
}

export default withAuthUser()(Home)

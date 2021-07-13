import Head from 'next/head'
import React from 'react';
import styles from '../styles/Home.module.css'
import NavBar from "../components/NavBar";
import AppFooter from "../components/Footer";


import {
  useAuthUser,
  withAuthUser,
  AuthAction,
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
        <h2 className={styles.title}>
          CALL TO ACTION!
        </h2>
        <div> </div>
        <h3 className={styles.subtitle}>
          This is YOUR platform to enable you and other’s like you to engage in the fight against
          #ClimateChange and #SpeciesExtinction. Your tax deductible donation will be targeted at climate
          change and species extinction projects of your choosing. Your contribution to current projects in
          need of funding will make a difference. Act and Donate now.
        </h3>

      </main>

        <AppFooter></AppFooter>

    </>
  )
}

const MyLoader = () => <div>Loading...</div>
export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: MyLoader,
})(Home)
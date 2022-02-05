import React from "react";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar";
import AppFooter from "../components/Footer";

import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";

const Home = () => {
	const AuthUser = useAuthUser();
	return (
    <>
      <NavBar userId={AuthUser.id} signOut={AuthUser.signOut}></NavBar>

      <main className={styles.main}>
        <h1 className={styles.title}>
          The Planet And All Living Things Need Your Help.
        </h1>
        <h2 className={styles.subtitle}>
          Join in the fight against #climatechange and #speciesextinction. Act
          and donate now.
        </h2>
      </main>

      <AppFooter></AppFooter>
    </>
  );
};

const MyLoader = () => <div>Loading...</div>;
export default withAuthUser({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
	whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
	whenUnauthedAfterInit: AuthAction.RENDER,
	LoaderComponent: MyLoader,
})(Home);

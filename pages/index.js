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

      <div className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.title}>
            <h1 className="global-h1">
              The Planet And All Living Things Need Your Help.
            </h1>
            <h2 className="subtitle">
              Join in the fight against #climatechange and #speciesextinction.
              Act and donate now.
            </h2>
            <div>
              <p className="global-p">
                Check out our current
                <span className={styles.heroButton + " btn"}>Projects</span>
              </p>
            </div>
          </div>
          <div className={styles.media}>
            <a href="" target="_blank">
              <img src="./home_img/icons/twitter.svg" alt="twitter"></img>
            </a>
            <a href="" target="_blank">
              <img src="./home_img/icons/instagram.svg" alt="instagram"></img>
            </a>
            <a href="" target="_blank">
              <img src="./home_img/icons/linkedin.svg" alt="linkedin"></img>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.involve + " flex-column"}>
        <h1 className="global-h1">Get Involved</h1>
        <h2 className="subtitle">
          Explore different ways to take action with us
        </h2>
        <div className={styles.involveIcons}>
          <div>
            <img src="./home_img/icons/donate.svg" alt="donate"></img>
            <h3 className="global-h3">Donate</h3>
          </div>
          <div>
            <img src="./home_img/icons/project.svg" alt="project"></img>
            <h3 className="global-h3">Post a project</h3>
          </div>
          <div>
            <img src="./home_img/icons/volunteer.svg" alt="volunteer"></img>
            <h3 className="global-h3">Volunteer</h3>
          </div>
          <div>
            <img src="./home_img/icons/upload.svg" alt="upload"></img>
            <h3 className="global-h3">Upload an app</h3>
          </div>
          <div>
            <img src="./home_img/icons/advise.svg" alt="advise"></img>
            <h3 className="global-h3">Advise us</h3>
          </div>
        </div>
        <div className="btn">Learn More</div>
      </div>
      <div className={styles.about + "  flex-column"}>
        <h1 className="global-h1">About Climate Donor</h1>
        <p className="global-p">
          ClimateDonor.org is a 501(c)(3) nonprofit organization that is focused
          on mitigation and reversal of global climate change and species
          extinction.
        </p>
        <div className="btn">About Us</div>
      </div>

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

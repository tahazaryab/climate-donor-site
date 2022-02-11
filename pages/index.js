import React from "react";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar";
import AppFooter from "../components/Footer";
import Link from "next/link";

import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";

const Home = () => {
  const AuthUser = useAuthUser();
  return (
    <>
      <NavBar userId={AuthUser.id} signOut={AuthUser.signOut}></NavBar>

      <section className={styles.hero}>
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
      </section>
      <section className={styles.plain + " flex-column"}>
        <h1 className="global-h1">Get Involved</h1>
        <h2 className="subtitle">
          Explore different ways to take action with us
        </h2>
        <div className={styles.plainIcons}>
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
        <Link href="/">
          <div className="btn">Learn More</div>
        </Link>
      </section>
      <section className={styles.about + "  flex-column"}>
        <h1 className="global-h1">About Climate Donor</h1>
        <p className="global-p">
          ClimateDonor.org is a 501(c)(3) nonprofit organization that is focused
          on mitigation and reversal of global climate change and species
          extinction.
        </p>
        <div className="btn">About Us</div>
      </section>
      <section className={styles.emphasis}>
        <h1 className="global-h1">Our Areas of Emphasis</h1>
        <div className={styles.emphasisCard}>
          <img src="./home_img/emphasis_1.png" alt="pic1"></img>
          <div>
            <h2 className="global-h2">01</h2>
            <h3 className="global-h3">Citizen engagement and empowerment.</h3>
            <p className="global-p">
              There are many well funded programs addressing things like public
              policy, impact investing in large scale clean energy projects, and
              corporate initiatives. However, there are thousands of smaller
              "long tail" projects, that in aggregate represent major
              contributions to climate change and species extinction mitigation.
            </p>
          </div>
        </div>
        <div className={styles.emphasisCard}>
          <img src="./home_img/emphasis_2.png" alt="pic2"></img>
          <div>
            <h2 className="global-h2">02</h2>
            <h3 className="global-h3">Wide range of projects.</h3>
            <p className="global-p">
              There are many well funded programs addressing things like public
              policy, impact investing in large scale clean energy projects, and
              corporate initiatives. However, there are thousands of smaller
              "long tail" projects, that in aggregate represent major
              contributions to climate change and species extinction mitigation.
            </p>
          </div>
        </div>
        <div className={styles.emphasisCard}>
          <img src="./home_img/emphasis_3.png" alt="pic3"></img>
          <div>
            <h2 className="global-h2">03</h2>
            <h3 className="global-h3">Supporting the existing network.</h3>
            <p className="global-p">
              Our goal is to support the many organizations and initiatives
              already working to address climate change and species extinction.
              The ClimateDonor.org platform provides an effective, efficient way
              to match individuals with the organizations, programs, and
              projects of interest to them.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.portal + " flex-column"}>
        <h1 className="global-h1">The Climate Donor Portal</h1>
        <h2 className="subtitle">
          Our new portal aims to connect organizations engaged in climate change
          and/or species extinction mitigation initiatives with concerned
          citizens who want to make a difference.
        </h2>
        <div className={styles.portalCard}>
          <div>
            <p className="inner">ORGANIZATIONS</p>
            <h2 className="global-h2">
              A toolkit for all your project-related endeavors.
            </h2>
            <p className="global-p">
              Organizations looking for project funding can now access a
              dashboard where they can post about their newest initiatives,
              provide progress updates to their pool of donors, keep track of
              their fund usage, and more.
            </p>
          </div>
          <img src="./home_img/portal_1.png"></img>
        </div>
        <div className={styles.portalCard}>
          <img src="./home_img/portal_2.png"></img>
          <div>
            <p className="inner">ORGANIZATIONS</p>
            <h2 className="global-h2">
              A toolkit for all your project-related endeavors.
            </h2>
            <p className="global-p">
              Organizations looking for project funding can now access a
              dashboard where they can post about their newest initiatives,
              provide progress updates to their pool of donors, keep track of
              their fund usage, and more.
            </p>
          </div>
        </div>
        <></>
        <Link href="">
          <p className={styles.arrowBtn + " btn global-p"}>
            Explore our portal
            <span>
              <img src="./home_img/icons/arrow.svg" alt="arrow"></img>
            </span>
          </p>
        </Link>
      </section>
      <section className={styles.plain + " flex-column"}>
        <h1 className="global-h1">Our Values, Your Expectations</h1>
        <h1 className="global-h1">Trust & transparency</h1>
        <div className={styles.plainIcons}>
          <div>
            <img src="./home_img/icons/active.svg" alt="active"></img>
            <h1 className="global-h1">XX</h1>
            <h4 className="subtitle">Active Projects</h4>
          </div>
          <div>
            <img src="./home_img/icons/fund.svg" alt="fund"></img>
            <h1 className="global-h1">$XX</h1>
            <h4 className="subtitle">Fund Raised</h4>
          </div>
          <div>
            <img src="./home_img/icons/donors.svg" alt="donors"></img>
            <h1 className="global-h1">XX</h1>
            <h4 className="subtitle">Total Donors</h4>
          </div>
        </div>
        <p className="global-p">
          We put transparency at the top, because we know that our donors care
          about seeing where their money is going. Let's work together to make
          an effective, responsible impact.
        </p>
        <Link href="/">
          <div className="btn">Financials</div>
        </Link>
      </section>
      <section className={styles.podcast + " flex-column"}>
        <h1 className="global-h1">Sustainability Accelerator</h1>
        <h2 className="subtitle">A podcast presented by Climate Donor</h2>
        <div className={styles.podcastContainer}></div>
        <Link href="">
          <p className={styles.arrowBtn + " btn global-p"}>
            Listen now
            <span>
              <img src="./home_img/icons/arrow.svg" alt="arrow"></img>
            </span>
          </p>
        </Link>
      </section>
      <section className={styles.blog + " flex-column"}>
        <h1 className="global-h1">Blog Posts</h1>
        <div className={styles.blogCardContainer}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <Link href="">
          <p className={styles.arrowBtn + " btn global-p"}>
            See more
            <span>
              <img src="./home_img/icons/arrow.svg" alt="arrow"></img>
            </span>
          </p>
        </Link>
      </section>
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

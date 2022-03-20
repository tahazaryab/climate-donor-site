import Link from "next/link"
import { Layout, Menu, Button } from "antd";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import React from "react";

function EpisodeDescription() {
  return (
    <>
      <div className={styles.podcastEpisodeContainer}>
        <h5>July 6, 2021</h5>
        <h3>Climate Change Innovation</h3>
        <p>We welcome Dr. Brian Bartholomeusz, the Executive Director of Innovation Transfer at the TomKat Center for Sustainable Energy at Stanford University.</p>
        <Button type="primary">Listen now</Button>
      </div>
    </>
  )
}
function viewAllEpisodes() {
  let element = document.getElementById("episodeListContainer");
  element.scrollIntoView();
}
export default function Podcast() {
  return (
  	<>
      <NavBar />
      <div>
        <h1>Podcast</h1>
        <div className={styles.podcastHeader}>
          <div className={styles.podcastHeaderContainer}>
            <div className={styles.title}>
              <h1 className="global-h1">
                Sustainability Accelerator
              </h1>
              <h2 className="subtitle">
                A podcast by Climate Donor that aims to build a narrative for action in order to 
                accelerate solutions for climate change and species extinction.
              </h2>
            </div>
          </div>
        </div>
        <div className={styles.podcastBody}>
          <div className={styles.podcastBlurb}>
            <h1>A Podcast for Climate</h1>
            <p>
              This podcast will host thought leaders, scholars, and entrepreneurs in efforts to address
              climate change, species extinction, and sustainability. Each episode of the podcast will end
              with three takeaways. These takeaways will be actionable knowledge that grassroots citizens
              can use personally to help in the sustainability movement and in the fight against climate
              Change and species extinction.
            </p>
            <br />
            <p>Produced by Grecia Ro, Director of Engineering</p>
            <p>Hosted by Luis Mejia, Executive Director</p>
          </div>
          <div className={styles.podcastLatestEpisode}>
            <h1>Latest Episode</h1>
            <p>
              We welcome Dr. Brian Bartholomeusz, the Executive Director of Innovation Transfer at the
              TomKat Center for Sustainable Energy at Stanford University.
            </p>
            <Button 
              type="primary" 
              onClick={viewAllEpisodes}>
                See all episodes
            </Button>
          </div>
          <div className={styles.podcastHost}>
            <h1>About Your Host</h1>
            <p>
              Host Luis Mejia is a Senior Associate at Stanford University; his professional career at
              Stanford spans over 30 years during which he was responsible for commercializing Stanford
              innovations. A few of his notable deals include helping SunPower, Google, and QuantumScape
              get exclusive licenses to the technologies that launched their companies.
            </p>
            <br />
            <p>Luis' involvement in the environmental field goes back to the early 1980's. As an engineering
              student studying alternatives to fossil fuels, he worked on a Honeywell Rankine-engine Solar
              Cooling demonstration system in the Arizona desert. Following graduation, Luis worked with
              Pacific Gas &amp; Electric helping its large commercial and industrial customers find ways to
              reduce their energy consumption.
            </p>
            <br />
            <p>
              Luis is a life-long surfer who grew up in Southern California; he is passionate about preserving
              the ocean flora and fauna (sharks included!) and is acutely concerned about the health of our
              oceans. For this reason, Climate Donor's Sustainability Accelerator will also highlight projects aimed
              at addressing the impacts of climate change and species extinction in the oceans as well as on land.
            </p>
          </div>
          <div className={styles.podcastEpisodeList} id="episodeListContainer">
            <h1>All Episodes</h1>
            <EpisodeDescription />
            <EpisodeDescription />
            <EpisodeDescription />
          </div>
        </div>
      </div>
     </>
    )
}

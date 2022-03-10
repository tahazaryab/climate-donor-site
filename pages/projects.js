import NavBar from "../components/NavBar";
import React from "react";
import styles from "../styles/Home.module.css";
import Cardstyles from "../styles/ProjectCard.module.css";
import AppFooter from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import { Row } from "antd";
import { useEffect, useState } from "react";
import { getAllProjects } from "../lib/firebase";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    setProjects(await getAllProjects());
  };

  useEffect(() => {
    getProjects();
  }, []);

  const getProject = (value) => {
    let project = projects[value];
    project.published = project?.published?.toDate()?.toLocaleDateString() + "";
    project.updated = project?.updated?.toDate()?.toLocaleDateString() + "";
    return project;
  };

  return (
    <>
      <NavBar />
      <section className={styles.projectHero}>
        <div className={styles.heroContainer}>
          <div className={styles.title}>
            <h1 className="global-h1">Projects</h1>
            <h2 className="subtitle">
              Become a Climate Donor now. Your tax deductible dontation will be
              targeted at climate change and species extinction projects of your
              choosing.
            </h2>
          </div>
          <div className={styles.media}>
            <a href="https://twitter.com/ClimateDonor/" target="_blank">
              <img src="./home_img/icons/twitter.svg" alt="twitter"></img>
            </a>
            <a href="https://www.instagram.com/climatedonor/" target="_blank">
              <img src="./home_img/icons/instagram.svg" alt="instagram"></img>
            </a>
            <a
              href="https://www.linkedin.com/company/climatedonor-org/"
              target="_blank"
            >
              <img src="./home_img/icons/linkedin.svg" alt="linkedin"></img>
            </a>
          </div>
        </div>
      </section>
      <section className={Cardstyles.plain + " flex-column"}>
        <h1 className="global-h1" style={{ "margin-bottom": "102px" }}>
          Ongoing Projects
        </h1>

        {projects && projects.length ? (
          projects.map((_, value) => {
            const singleProject = getProject(value);

            return (
              <>
                <Row key={value}>
                  <ProjectCard key={value} project={singleProject} />
                </Row>
              </>
            );
          })
        ) : (
          <div className={styles.noProject}>
            {" "}
            <h2>No Project Available </h2>
          </div>
        )}
      </section>

      <AppFooter></AppFooter>
    </>
  );
}

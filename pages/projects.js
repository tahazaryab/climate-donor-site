import NavBar from "../components/NavBar";
import React from "react";
import styles from "../styles/Home.module.css";
import Cardstyles from "../styles/ProjectCard.module.css";
import AppFooter from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import { Row } from "antd";
import { useEffect, useState } from "react";
import { getAllProjects } from "../lib/firebase";
import ReactPaginate from "react-paginate";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const projectsPerPage = 3;
  const pagesVisited = pageNumber * projectsPerPage;

  const getProjects = async () => {
    setProjects(await getAllProjects());
  };

  useEffect(() => {
    getProjects();
  }, []);

  const getProject = (value) => {
    let project = projects[value];
    if (typeof project.published === "object") {
      project.published =
        project?.published?.toDate().toLocaleDateString() + "";
    }
    if (typeof project.updated === "object") {
      project.updated = project?.updated?.toDate().toLocaleDateString() + "";
    }
    return project;
  };

  const displayProjects = projects
    .slice(pagesVisited, pagesVisited + projectsPerPage)
    .map((_, value) => {
      const singleProject = getProject(value);

      return (
        <>
          <Row key={value}>
            <ProjectCard key={value} project={singleProject} />
          </Row>
        </>
      );
    });

  const pageCount = Math.ceil(projects.length / projectsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
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
        {displayProjects}
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </section>

      <AppFooter></AppFooter>
    </>
  );
}

import NavBar from "../components/NavBar";
import React from "react";
import Cardstyles from "../styles/ProjectCard.module.css";
import AppFooter from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import { Card, Row } from "antd";
import { useEffect, useState } from "react";
import { getAllProjects } from "../lib/firebase";
import ReactPaginate from "react-paginate";
import Hero from "../components/Hero";
import { PROJECTS_PER_PAGINATION } from "../constants";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const projectsPerPage = PROJECTS_PER_PAGINATION;
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

  const filterApproved = (projects) => {
    let approvedProjects = [];
    for (let i = 0; i < projects.length; i++) {
      if (getProject(i).status === "approved")
        approvedProjects.push(projects[i]);
    }
    return approvedProjects;
  }

  const displayProjects = filterApproved(projects)
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
      <Hero
        h1="Projects"
        h2="              Become a Climate Donor now. Your tax deductible dontation will be
              targeted at climate change and species extinction projects of your
              choosing."
        type="project"
      ></Hero>

      <section className={Cardstyles.plain + " centerContainer"}>
        <h1 className="global-h1" style={{ "margin-bottom": "102px" }}>
          Ongoing Projects
        </h1>
        {displayProjects}
        <ReactPaginate
          previousLabel={<img src="./img/icons/chevron-left.svg" />}
          nextLabel={<img src="./img/icons/chevron-right.svg" />}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={Cardstyles.pagination}
          disabledClassName={Cardstyles.paginationArrows}
          activeClassName={Cardstyles.paginationNumbers}
          pageClassName={Cardstyles.paginationNumbers}
        />
      </section>

      <AppFooter/>
    </>
  );
}

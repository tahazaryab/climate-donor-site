import { Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import ProjectTabs from "../../../components/ProjectTabs";
import SearchBar from "../../../components/SearchBar";
import FilterBar from "../../../components/FilterBar";
import ProjectCard from "../../../components/ProjectCard";
import styles from "../../../styles/Dashboard.module.css";

import { getUserProjects, getRecommendedProjects } from "../../../lib/firebase";
import { useAuthUser } from "next-firebase-auth";

const Search = () => {
  const AuthUser = useAuthUser();
  const [donorProjects, setDonorProjects] = useState();

  const [selectedMenu, setSelectedMenu] = useState("1");
  const [projects, setProjects] = useState([]);

  const fetchDonorProjects = async () => {
    let donation = await getUserProjects(AuthUser.id);
    let donationResult = await Promise.all(donation);
    setDonorProjects(donationResult);
    if (selectedMenu == "1") {
      setProjects(donationResult);
    }
  };

  const getProjects = async () => {
    if (selectedMenu === "1") {
    } else if (selectedMenu === "2") {
      setProjects([]);
    } else if (selectedMenu === "3") {
      let recommended = await getRecommendedProjects();
      setProjects(recommended);
    } else {
      // Donation History
      setProjects(donorProjects);
    }
  };

  useEffect(() => {
    fetchDonorProjects();
    getProjects();
  }, [selectedMenu]);

  const getProject = (value) => {
    let project = { ...projects[value] };
    project.published = project.published.toDate().toLocaleDateString() + "";
    project.updated = project.updated.toDate().toLocaleDateString() + "";
    return project;
  };

  return (
    <div className={styles.contentDisplay}>
      <div className={styles.titleBar}>
        <h2>Search</h2>
      </div>

      <SearchBar width={1092} defaultTerm={"projects"} marginLeft={26} />

      <div className={styles.resultsBox}>
        <div className={styles.resultsBoxTitle}>
          <Row>
            <h2 className={styles.filterTitle}> Filter By</h2>
            <h2 className={styles.numResultsTitle}>
              {" "}
              {projects.length} Result(s)
            </h2>
          </Row>
        </div>
        <Row>
          <FilterBar />
          {projects && projects.length ? (
            projects.map((project, value) => {
              const singleProject = getProject(value);

              return (
                <Row key={value}>
                  <ProjectCard key={value} project={singleProject} />
                </Row>
              );
            })
          ) : (
            <div className={styles.noProject}>No Projects Found</div>
          )}
        </Row>
      </div>
    </div>
  );
};

export default Search;

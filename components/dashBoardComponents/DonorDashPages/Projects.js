import { Row } from "antd";
import React, { useState, useEffect } from "react";
import ProjectTabs from "../../../components/ProjectTabs";

import ProjectCard from "../../../components/ProjectCard";
import styles from "../../../styles/Dashboard.module.css";

import { getUserProjects, getRecommendedProjects } from "../../../lib/firebase";
import { useAuthUser } from "next-firebase-auth";

const Projects = () => {
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
        <h2>Projects</h2>
      </div>
      <Row>
        <ProjectTabs
          links={["MINE", "SAVED", "RECOMMENDED"]}
          onClick={(index) => {
            //Had to typecast it since index was numerical but the switch is string
            setSelectedMenu(index + "");
            console.log(index);
          }}
        />
      </Row>
      <div className={styles.resultsBox}>
        <div className={styles.resultsBoxTitle}>
          <h2> {projects.length} Project(s)</h2>
        </div>
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
          <div className={styles.noProject}>No Project Available</div>
        )}
      </div>
    </div>
  );
};

export default Projects;

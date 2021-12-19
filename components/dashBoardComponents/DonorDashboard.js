import { Layout, Row } from "antd";
import React, { useState, useEffect } from "react";
import ProjectTabs from "../../components/ProjectTabs";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import ProjectCard from "../../components/ProjectCard";
import styles from "../../styles/Dashboard.module.css";
import Search from "./DonorDashPages/Search";
import History from "./DonorDashPages/History";
import Projects from "./DonorDashPages/Projects";
import { getUserProjects, getRecommendedProjects } from "../../lib/firebase";

import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";

const { Content } = Layout;

const DonorDashboard = () => {
  const AuthUser = useAuthUser();
  const [donorProjects, setDonorProjects] = useState();
  const [isLoading, setIsLoading] = useState(true);
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
      //let projects = await getSavedProjects()
      //setProjects(projects);
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
    setIsLoading(false);
  }, [selectedMenu]);

  const getProject = (value) => {
    let project = { ...projects[value] };
    project.published = project.published.toDate().toLocaleDateString() + "";
    project.updated = project.updated.toDate().toLocaleDateString() + "";
    return project;
  };

  const returnPage = (selectedMenu) => {
    console.log(selectedMenu);
    switch (selectedMenu) {
      case "1":
        return <Projects />;
      case "2":
        return <Search />;
      case "3":
        return <History />;
      default:
        return; // return <DonorSignUpInfoPage {...props} />;
    }
  };

  return (
    <Layout>
      {!isLoading && (
        <Content className={styles.dashboardContent}>
          <Sidebar setSelectedMenu={setSelectedMenu} />

          <div className={styles.contentDisplay}>
            {returnPage(selectedMenu)}
            {/* <Content>{returnPage(id)}</Content>
            <div className={styles.titleBar}>
              <h2>My Projects</h2>
              <SearchBar />
            </div>
            <Row>
              <ProjectTabs
                links={["ALL", "ACTIVE", "COMPLETED"]}
                onClick={() => {}}
              />
            </Row>
            {/* Testing projectCard Component */}
            {/* {projects && projects.length ? (
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
            )} */}
          </div>
        </Content>
      )}
    </Layout>
  );
};

const MyLoader = () => <div>Loading...</div>;
export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: MyLoader,
})(DonorDashboard);

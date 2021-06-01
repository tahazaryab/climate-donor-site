import { Button, Layout, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import NavBar from "../components/NavBar";
import ProjectTabs from "../components/ProjectTabs";
import Sidebar from "../components/Sidebar";
import SearchBar from '../components/SearchBar';
import ProjectCard from '../components/ProjectCard';
import styles from '../styles/Dashboard.module.css';
import {
  useAuthUser,
  withAuthUser,
  AuthAction
} from 'next-firebase-auth'
import { getAllProjects } from '../lib/firebase';

const { Content } = Layout;

const Recommended = () => {
  const AuthUser = useAuthUser()
  const displayName = AuthUser.firebaseUser.displayName

  const [projects, setProjects]=useState([]);
  const getProjects = async () => {
      let projects = await getAllProjects()
      console.log("PROJECTTS", projects)
      setProjects(projects);
  }
  useEffect(()=> {
      getProjects()
  },[])
  return (
    <Layout>
      <NavBar userId={AuthUser.id}
        userName={displayName != null ? displayName : 'Name'}
        signOut={AuthUser.signOut} />
      <Content className="siteContent">
        <Sidebar />
        <div className={styles.contentDisplay}>
          <div className={styles.titleBar}>
            <h2>My Projects</h2>
            <SearchBar />
          </div>
          <Row>
            <ProjectTabs
              link1='ALL'
              link2='ACTIVE'
              link3='COMPLETED'
              onClick={() => {
                console.log("Option Clicked")
              }}
            />
          </Row>
          {/* Testing projectCard Component */}
          <Row>
            <ProjectCard
              tagName='Clean Energy'
              src="https://via.placeholder.com/150"
              projectTitle="Repurposing Oil Platforms"
              projectDescription="Imagine if all offshore oil platforms were converted to clearn energy producing wind turbine platforms..."
              author="Climate Donor"
              location="Stanford, CA"
              published={new Date().toLocaleDateString() + ''}
              updated={new Date().toLocaleDateString() + ''}
              curAmt="75,890"
              totalAmt="89,000"
            />
          </Row>
          
          {
              projects && projects.map((project, index)=>{
                  return(
                      <Row key={index}>
                          <ProjectCard 
                          key={project.id}
                          tagName={project.tagName}
                          src={project.src}
                          projectTitle={project.projectTitle}
                          projectDescription={project.projectDescription}
                          author={project.author}
                          location={project.location}
                          published={project.published.toDate().toLocaleDateString()+ ""}
                          updated={project.updated.toDate().toLocaleDateString()+ ""}
                          curAmt={project.curAmt}
                          totalAmt={project.totalAmt}
                          />
                      </Row>
                  )
              })
          }
        </div>
      </Content>
    </Layout>
  )
}

const MyLoader = () => <div>Loading...</div>
export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: MyLoader,
})(Recommended)

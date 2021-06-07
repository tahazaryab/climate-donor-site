import { Layout, Row } from 'antd';
import DBNavBar from "../components/DBNavBar";
import React, { useState, useEffect } from 'react';
import ProjectTabs from "../components/ProjectTabs";
import Sidebar from "../components/Sidebar";
import SearchBar from '../components/SearchBar';
import ProjectCard from '../components/ProjectCard';
import styles from '../styles/Dashboard.module.css';
import { getUserDonatedProjects } from '../lib/firebase';

import {
  useAuthUser,
  withAuthUser,
  AuthAction
} from 'next-firebase-auth'


const { Content } = Layout;

const DonorDashboard = () => {
  const AuthUser = useAuthUser()
  const displayName = AuthUser.firebaseUser.displayName
  const [donorProjects,setDonorProjects]=useState()
  const [isLoading, setIsLoading] = useState(true)
  
  const fetchDonorProjects= async()=>{
    let donation = await getUserDonatedProjects(AuthUser.id)
    console.log(donation)
    var projects = await Promise.all(donation)
    setDonorProjects(projects)
    setIsLoading(false)
  }

  const getProject = (value) =>{
    var project = {...donorProjects[value]}
    project.published = project.published.toDate().toLocaleDateString() + ''
    project.updated=project.updated.toDate().toLocaleDateString() + ''
    return project
  }
  
  useEffect(() => {
    fetchDonorProjects();
  }, [])

  return (
    <React.Fragment>
    <Layout>
      <DBNavBar userId={AuthUser.id}
        userName={displayName != null ? displayName : 'Name'}
        signOut={AuthUser.signOut} />
      {!isLoading && 
      <Content className={styles.dashboardContent}>
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
          
                  { donorProjects &&  
                
                    donorProjects.map((project, value) => {
                        const singleProject = getProject(value)
                        return (
                          <Row key={value}>
                            <ProjectCard
                              key={value}
                              project = {singleProject}
                            />
                          </Row>
                        )

                      })
                    } 
        </div>
      </Content> 
      }
    </Layout>
    </React.Fragment>
  )
}

const MyLoader = () => <div>Loading...</div>
export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: MyLoader,
})(DonorDashboard)

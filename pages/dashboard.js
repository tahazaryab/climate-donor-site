import { Button, Layout, Row } from 'antd';
import React, {useState,useEffect} from 'react';
import NavBar from "../components/NavBar";
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
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchDonorProjects= async()=>{
    let donation = await getUserDonatedProjects(AuthUser.id)
    var projects = await Promise.all(donation);
    setDonorProjects(projects)
    setIsLoading(false)
  }
  
  useEffect(() => {

    fetchDonorProjects();
  }, [])

  return (
    <React.Fragment>
    <Layout>
      <NavBar userId={AuthUser.id}
        userName={displayName != null ? displayName : 'Name'}
        signOut={AuthUser.signOut} />
      {!isLoading && 
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
          
                  { donorProjects &&  
                
                    donorProjects.map((project, value) => {
                        return (
                          <Row key={value}>
                            <ProjectCard
                              key={project?.id}
                              tagName={project?.tagName}
                              src={project?.src}
                              projectTitle={project?.title}
                              projectDescription={project?.description}
                              author={project?.author}
                              location={project?.location}
                              published={project?.published.toDate().toLocaleDateString() + ''}
                              updated={project?.updated.toDate().toLocaleDateString() + ''}
                              curAmt={project?.curAmt}
                              totalAmt = {project?.totalAmt}
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

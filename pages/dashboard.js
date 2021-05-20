import { Button, Layout, Row } from 'antd';
import React from 'react';
import NavBar from "../components/NavBar";
<<<<<<< HEAD
import ProjectTabs from "../components/ProjectTabs";


=======
import Sidebar from "../components/Sidebar";
>>>>>>> 47f0b1c63cfdd526c2ead9163103e3403b03dbfd
import {
  useAuthUser,
  withAuthUser,
  AuthAction
} from 'next-firebase-auth'
import ProjectCard from '../components/ProjectCard';
import SearchBar from "../components/SearchBar";
import styles from '../styles/Dashboard.module.css';

const { Content } = Layout;

const DonorDashboard = () => {
  const AuthUser = useAuthUser()
  const displayName = AuthUser.firebaseUser.displayName
  return (
    <>
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
            {/* 
          <Row>
                    Donor Dashboard for {AuthUser.firebaseUser.email}
<<<<<<< HEAD
                </Row>

                <Row>
                  <ProjectTabs
                    title='My Projects'
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
                    updated={new Date().toLocaleDateString() +''}
                    curAmt="75,890"
                    totalAmt = "89,000"
                    
                  />
                </Row>
=======
          </Row> 
          */}
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
>>>>>>> 47f0b1c63cfdd526c2ead9163103e3403b03dbfd

            <Row>
              <ProjectCard
                tagName='Transportation'
                src="https://via.placeholder.com/150"
                projectTitle="Saving the Melting Polar Caps"
                projectDescription="Dedicated researchers and biologist, focused on saving and salvaging the melting polar caps..."
                author="Climate Donor"
                location="Stanford, CA"
                published={new Date().toLocaleDateString() + ''}
                updated={new Date().toLocaleDateString() + ''}
                curAmt="26,000"
                totalAmt="89,000"
              />
            </Row>
          </div>
        </Content>
      </Layout>

    </>
  )
}

const MyLoader = () => <div>Loading...</div>
export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: MyLoader,
})(DonorDashboard)

import {Button, Layout, Row} from 'antd';
import React from 'react';
import NavBar from "../components/NavBar";


import {
  useAuthUser,
  withAuthUser,
  AuthAction
} from 'next-firebase-auth'
import ProjectCard from '../components/ProjectCard';
import SearchBar from "../components/SearchBar";

const {Content} = Layout;

const DonorDashboard = () => {
  const AuthUser = useAuthUser()

  return (
    <>
  <Layout>
          <NavBar userId={AuthUser.id} signOut={AuthUser.signOut}/>
            

            <Content className="siteContent">

                <div className="search" style={{float: 'right'}} >
                  <SearchBar/>
                </div>

                <Row>
                    Donor Dashboard for {AuthUser.firebaseUser.email}
                </Row>
                
                


                <br/>
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

                <Row>
                  <ProjectCard
                    tagName='Transportation'
                    src="https://via.placeholder.com/150"
                    projectTitle="Saving the Melting Polar Caps"
                    projectDescription="Dedicated researchers and biologist, focused on saving and salvaging the melting polar caps..."
                    author="Climate Donor"
                    location="Stanford, CA"
                    published={new Date().toLocaleDateString() + ''}
                    updated={new Date().toLocaleDateString() +''}
                    curAmt="26,000"
                    totalAmt = "89,000"
                    
                  />
                </Row>

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

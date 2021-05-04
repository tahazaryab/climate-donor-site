import {Layout, Row} from 'antd';
import React from 'react';
import NavBar from "../components/NavBar";


import {
  useAuthUser,
  withAuthUser,
  AuthAction
} from 'next-firebase-auth'

const {Content} = Layout;

const DonorDashboard = () => {
  const AuthUser = useAuthUser()

  return (
  <Layout>
            <NavBar userId={AuthUser.id} signOut={AuthUser.signOut}>
        </NavBar>

            <Content className="siteContent">
                <Row>
                    Donor Dashboard for {AuthUser.firebaseUser.email}
                </Row>

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
})(DonorDashboard)

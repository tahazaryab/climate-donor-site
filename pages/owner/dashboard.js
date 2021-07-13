import React, { useEffect, useState } from 'react'
import DBNavBar from '../../components/DBNavBar'
import OwnerSidebar from '../../components/OwnerSidebar'
import styles from '../../styles/OwnerDB.module.css'
import { Layout, Row } from 'antd'
import SearchBar from '../../components/SearchBar'
import ProjectTabs from "../../components/ProjectTabs";
import ProjectsDisplay from "../../components/ProjectsDisplay";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

import {
    useAuthUser,
    withAuthUser,
    AuthAction
} from 'next-firebase-auth'

const { Content } = Layout;

const OwnerDashboard = () => {
  
    return (
        <>
            <Layout>
                <DBNavBar />
                <Content className={styles.dashboardContent}>
                    <OwnerSidebar />
                    <div className={styles.contentDisplay}>
                        <div className={styles.titleBar}>
                            <div className={styles.titleContainer}>
                                <h2>Projects</h2>
                                <Link href='/owner/submission'><button><FontAwesomeIcon icon={faPlus} /></button></Link>
                            </div>
                            <SearchBar />
                        </div>
                        <p className={styles.description}>Edit your projects or provide progress updates to your donors. </p>
                        <Row>
                            <ProjectTabs
                                links={['ALL', 'LIVE', 'PENDING', 'DRAFTS', 'ARCHIVED']}
                                onClick={() => {
                                    
                                }}
                            />
                        </Row>
                        <ProjectsDisplay isOwner={true}/>
                    </div>
                </Content>
            </Layout>
        </>
    );
}

const MyLoader = () => <div>Loading...</div>
export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: MyLoader,
})(OwnerDashboard)
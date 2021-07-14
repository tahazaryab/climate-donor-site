import React, { useEffect, useState } from 'react'
import styles from '../styles/OwnerDB.module.css'
import {  Row } from 'antd'
import { getOwnerProjects } from '../lib/firebase'
import ProjectCard from './ProjectCard'
import {
    useAuthUser,
    withAuthUser,
    AuthAction
} from 'next-firebase-auth'

const ProjectsDisplay = ({ isOwner }) => {

    const [Projects, setProjects] = useState([])
    const AuthUser = useAuthUser()

    useEffect(()=>{
        const fetchProjects = async () => {
            let donation = await getOwnerProjects(AuthUser.id)
            let donationResult = await Promise.all(donation)
            setProjects(donationResult)
        }

        fetchProjects()
    }, [])

    

    const getProject = (value) => {
        let project = { ...Projects[value] }
        project.published = project?.published?.toDate()?.toLocaleDateString() + '' 
        project.updated = project?.updated?.toDate()?.toLocaleDateString() + ''
        return project
    }

    return (
        <>
        {
            Projects && Projects.length
            ? Projects.map((project, value) => {
                const singleProject = getProject(value)
                
                return (
                <Row key={value}>
                    <ProjectCard
                        key={value}
                        project={singleProject}
                        isOwner={isOwner}
                    />
                </Row>
                )
            })
            : <div className={styles.noProject}> <h2>No Project Available </h2></div>
        }
        </>
    );
}

const MyLoader = () => <div>Loading...</div>
export default withAuthUser({
    whenAuthed: AuthAction.RENDER,
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    LoaderComponent: MyLoader,
})(ProjectsDisplay)
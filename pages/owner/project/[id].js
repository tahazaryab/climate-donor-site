import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import DBNavBar from '../../../components/DBNavBar'
import OwnerSidebar from '../../../components/OwnerSidebar'
import styles from '../../../styles/OwnerDB.module.css'
import { Layout, Row, Col } from 'antd'
import { Button } from 'antd'
import { Typography } from 'antd'
import { Image } from 'antd';
import PictureUploader from '../../../components/PictureUploader'
import { getDoc } from '../../../lib/firebase'


const { Content } = Layout;
const { Paragraph } = Typography;

const dummyProjectInfo = {
    tagName: "Transportation",
    title: "Saving the Melting Polar Caps",
    publishDate: "05/29/2021",
    startDate: "02/15/201",
    endDate: "09/28/2021",
    isLive: true,
    description: "Dedicated researchers and biologist, focused on saving and salvaging the melting polar caps..."
}

var Title = ""
const tag_text1 = "Clean Energy"
const tag_text2 = "Transportation"
const tag_text3 = "Environment"

const ProjectInfoCard = () => {
    const router = useRouter()
    const { title, publishDate, isLive, startDate, endDate, tagName, description } = dummyProjectInfo
    const [editableTitle, setEditableTitle] = useState()
    const [project, setProject] = useState()
    const { id } = router.query

    useEffect(() => {
        const getProject = async () => {
            var proj = (await getDoc("projects", id))
            proj = await Promise.resolve(proj)
            proj.published = proj?.published.toDate().toLocaleDateString() + ''
            proj.updated = proj?.updated.toDate().toLocaleDateString() + ''
            Title = proj.title
            setEditableTitle(proj.title)
            setProject(proj)
        }

        getProject()
    })

    return (
        <div className={styles.infoContainer}>
            <Paragraph className={styles.infoTitle} editable={{ onChange: setEditableTitle }}>{editableTitle}</Paragraph>
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui, imperdiet augue risus suscipit sollicitudin.</p> */}
            <Row>
                <Col span={3} className={styles.infoTag}>Time Frame</Col>
                <Col span={21}>{project?.published} — {project?.updated}</Col>
            </Row>
            <Row>
                <Col span={3} className={styles.infoTag}>Status</Col>
                <Col span={21} className={styles.infoStatus}>
                    {
                        isLive
                            ? <div className={styles.statusTag}>
                                <div className={styles.greenLight}></div>
                                <div className={styles.statusText}>Live</div>
                            </div>
                            : "Not Live"
                    }
                    <span className={styles.infoPublish}>Published on {project?.published}</span>
                </Col>
            </Row>
            <Row>
                <Col span={3} className={styles.infoTag}>Tags</Col>
                <Col span={21}>
                    {project?.tagName == tag_text1 && <div className="tag_red">{project?.tagName}</div>}
                    {project?.tagName == tag_text2 && <div className="tag_blue">{project?.tagName}</div>}
                    {project?.tagName == tag_text3 && <div className="tag_red">{project?.tagName}</div>}
                </Col>
            </Row>
            <Row>
                <Col span={3} className={styles.infoTag}>Images</Col>
                {project?.imageURLS.map((image, key) => (
                    <Col span={3}><img key={key} width="100px" src={image} alt={image} /></Col>
                ))}
                {/* <Col span={21}><PictureUploader /></Col> */}
            </Row>
            <Row>
                <Col span={3} className={styles.infoTag}>Details</Col>
                <Col span={21}>
                    <p>{project?.description}</p>
                </Col>
            </Row>
        </div>
    )
}

const ProjectPage = () => {
    return (
        <>
            <Layout>
                <DBNavBar />
                <Content className={styles.dashboardContent}>
                    <OwnerSidebar />
                    <div className={styles.contentDisplay}>
                        <div className={styles.titleBar}>
                            <div className={styles.titleContainer}>
                                <Link href="/dashboard"> Dashboard </Link> / Project
                            </div>
                            <div>
                                <Button type="primary">Publish Changes</Button>
                                <Button type="text">View Public Page</Button>
                            </div>
                        </div>
                        <ProjectInfoCard />


                    </div>
                </Content>
            </Layout>
        </>
    );
}

export default ProjectPage;
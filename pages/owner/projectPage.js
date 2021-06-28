import React, { useState } from 'react';
import DBNavBar from '../../components/DBNavBar';
import OwnerSidebar from '../../components/OwnerSidebar';
import styles from '../../styles/OwnerDB.module.css';
import { Layout, Row, Col } from 'antd';
import { Button } from 'antd';
import { Typography } from 'antd';
import PictureUploader from '../../components/PictureUploader';

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

const tag_text1 = "Clean Energy"
const tag_text2 = "Transportation"

const ProjectInfoCard = () => {
    const { title, publishDate, isLive, startDate, endDate, tagName, description } = dummyProjectInfo
    const [editableTitle, setEditableTitle] = useState(title);
    return (
        <div className={styles.infoContainer}>
            <Paragraph className={styles.infoTitle} editable={{ onChange: setEditableTitle }}>{editableTitle}</Paragraph>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui, imperdiet augue risus suscipit sollicitudin.</p>
            <Row>
                <Col span={3} className={styles.infoTag}>Time Frame</Col>
                <Col span={21}>{startDate} — {endDate}</Col>
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
                    <span className={styles.infoPublish}>Published on {publishDate}</span>
                </Col>
            </Row>
            <Row>
                <Col span={3} className={styles.infoTag}>Tags</Col>
                <Col span={21}>
                    {tagName == tag_text1 && <div className="tag_red">{tagName}</div>}
                    {tagName == tag_text2 && <div className="tag_blue">{tagName}</div>}
                </Col>
            </Row>
            <Row>
                <Col span={3} className={styles.infoTag}>Images</Col>
                <Col span={21}><PictureUploader /></Col>
            </Row>
            <Row>
                <Col span={3} className={styles.infoTag}>Details</Col>
                <Col span={21}>
                    <p>{description}</p>
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
                                Dashboard / {dummyProjectInfo.title}
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
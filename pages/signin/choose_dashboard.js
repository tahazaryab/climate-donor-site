import Link from 'next/link'
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer"
import React from "react";
import {Layout, Card, Col, Row, Button} from 'antd';
import styles from "../../styles/Home.module.css";

const {Content} = Layout;
const {Meta} = Card;


export default function Signup() {
    return (
        <>
            <NavBar>
            </NavBar>

            <Content>
                <Button type="link">Back</Button>
                <div className="container">
                    <Col>
                        <div>
                            .
                        </div>
                        <h1 className={styles.subtitle}>
                            Choose your Dashboard
                        </h1>
                        <h4 className={styles.body}>
                            You can be involved with Climate Donor in different ways!
                            Access an existing account or create a new account type.
                        </h4>
                    </Col>
                </div>
                <div className="container">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card
                                hoverable
                                style={{width: 300}}
                                cover={<img alt="example" src={'../1.png'}/>}
                            >
                                <Meta title="Donor"/>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{width: 300}}
                                cover={<img alt="example" src={'../4.png'}/>}
                            >
                                <Meta title="Project Owner">
                                </Meta>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div className="container">
                    <Col>
                        <Button type="primary">Continue</Button>
                    </Col>
                </div>

            </Content>

            <Footer>
            </Footer>


        </>
    )
}

import Link from 'next/link'
import NavBar from "../components/NavBar";
import Footer from "../components/Footer"
import React from "react";
import {Layout, Card, Col, Row, Button} from 'antd';
import styles from "../styles/Home.module.css";

const {Content} = Layout;
const {Meta} = Card;


export default function Signup() {
    return (
        <>
            <NavBar>
            </NavBar>

            <Content>
                <div className="container">
                    <Col>
                        <div>
                            .
                        </div>
                        <h1 className={styles.subtitle}>
                            Welcome! How would you like to help in the fight against climate change?
                        </h1>
                        <h4 className={styles.body}>
                            If you fall under more than one category, please pick your primary type for now and you can
                            switch later.
                        </h4>
                    </Col>
                </div>
                <div className="container">
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{width: 300}}
                                cover={<img alt="example" src={'1.png'}/>}
                            >
                                <Meta title="Donor"
                                      description="For foundations, corporations, or individuals who would like to donate to ClimateDonor.org and the projects we support."/>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{width: 300}}
                                cover={<img alt="example" src={'2.png'}/>}
                            >
                                <Meta title="Project Owner"
                                      description="For a nonprofit, academic institution, national lab or local government with projects focused on addressing climate change, that would like to obtain funding through ClimateDonor.org."/>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{width: 300}}
                                cover={<img alt="example" src="3.png"/>}
                            >
                                <Meta title="Corporate Partner"
                                      description="For corporations who want to donate funds, sponsor programs, provide in-kind products or services, sponsor employee volunteer programs, or promote climate change projects."/>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div className="container">
                    <Col>
                        <Button type="primary">Continue</Button>
                        <h6>Already have an account? Sign In</h6>
                    </Col>
                </div>

            </Content>

            <Footer>
            </Footer>


        </>
    )
}

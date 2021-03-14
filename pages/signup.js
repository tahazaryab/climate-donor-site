import Link from 'next/link'
import NavBar from "../components/NavBar";
import Footer from "../components/Footer"
import React from "react";
import { useState } from 'react';
import {Layout, Card, Col, Row, Button, Space} from 'antd';
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router'

const {Content} = Layout;
const {Meta} = Card;

export default function Signup() {
    const router = useRouter()
    const [userType, setUserType] = useState(null);
    function selectUserType(userType){ 
        setUserType(userType);
    }; 
    const [errorMessage, setErrorMessage] = useState("");


    const handleContinue = () => {
        if(userType === "donor") {
            router.push("/donor_signup")
        } else if (userType === "projectOwner") {
            console.log("not implemented");
        } else if (userType === "corporatePartner") {
            console.log("not implemented");
        } else {
            setErrorMessage("Please choose a category.")
        }
      }

    return (
        <Layout>
            <NavBar>
            </NavBar>

            <Content className="siteContent">
                <Row span={10} type="flex" align="middle">
                    <Col span={24} align="middle">
                        <h1 className={styles.subtitle}>
                            Welcome! How would you like to help in the fight against climate change?
                        </h1>
                        <h4 className={styles.body}>
                            If you fall under more than one category, please pick your primary type for now and you can
                            switch later.
                        </h4>

                        <p style={{color: "red"}}>{errorMessage}</p>
                    </Col>
                </Row>
                <div className="container">
                    <Row gutter={16} span={10}>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{width: 300, border: (userType === "donor" ? "1px solid #048A81" : "none"), padding: 5, borderRadius: 6}}
                                cover={<img alt="example" src={'1.png'}/>}
                                onClick={() => selectUserType("donor")}
                            >
                                <Meta title="Donor"
                                      description="For foundations, corporations, or individuals who would like to donate to ClimateDonor.org and the projects we support."/>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{width: 300, border: (userType === "projectOwner" ? "1px solid #048A81" : "none"), padding: 5 , borderRadius: 6}}
                                cover={<img alt="example" src={'2.png'}/>}
                                onClick={() => selectUserType("projectOwner")}
                                // className={(userType === "projectOwner" ? 'styles.selected-button' : 'styles.unstyled-button')}
                            >
                                <Meta title="Project Owner"
                                      description="For a nonprofit, academic institution, national lab or local government with projects focused on addressing climate change, that would like to obtain funding through ClimateDonor.org."/>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{width: 300, border: (userType === "corporatePartner" ? "1px solid #048A81" : "none"), padding: 5, borderRadius: 6}}
                                cover={<img alt="example" src="3.png"/>}
                                onClick={() => selectUserType("corporatePartner")}
                                // className={(userType === "corporatePartner" ? 'styles.selected-button' : 'styles.unstyled-button')}
                            >
                                <Meta title="Corporate Partner"
                                      description="For corporations who want to donate funds, sponsor programs, provide in-kind products or services, sponsor employee volunteer programs, or promote climate change projects."/>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Row span={4} type="flex" align="middle">
                    <Col span={24} align="middle">
                        <Space></Space>
                        <Button type="primary" onClick={() => handleContinue()}>Continue</Button>
                        <h6>Already have an account? <span> <Button href="/signin" type="link">Sign In</Button> </span></h6>
                    </Col>
                </Row>

            </Content>
        </Layout>
)
}

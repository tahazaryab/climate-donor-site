import {Col, Row, Button, Form, Space} from 'antd';
import { useState, useEffect } from 'react';
import { signUp } from '../lib/firebase';
import update from 'immutability-helper';

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const DonorSignUpInterestsPage = ({ formData, interests, setInterests, errorMessage, setErrorMessage, navigation }) =>  {

    const { previous } = navigation;

    const [formSubmitted, setFormSubmitted] = useState(false);

      
    const onFinish = () => { 

        setFormSubmitted(true);
    };  

    const onFinishFailed = (errorInfo) => {
        setErrorMessage("There was an error signing up");
        console.log('Failed:', errorInfo);
        previous();
    };

    

    useEffect(() => {
        if(formSubmitted) {
            let missingValues = [];    
            Object.entries(formData).forEach(([key, value]) => {      
                if (!value) {        
                    missingValues.push(key);      
                }    
            });     
            if (missingValues.length > 1) {    
                setErrorMessage(`You're missing these fields: ${missingValues.join(', ')}`);
                previous();      
                return;    
            }


            signUp('donor', formData.email, formData.password, formData.fullName, formData.interests)
            .then((error) => {
                if(error != null) { 
                    if(error.code === "auth/email-already-in-use") {
                        setErrorMessage("There already exists an account with the given email address.")
                    } else if (error.code === "auth/invalid-email") {
                        setErrorMessage("Email address not valid.")
                    } else if (error.code === "auth/weak-password") {
                        setErrorMessage("Password must be at least 6 characters.")
                    } else {
                        setErrorMessage("There was an error signing up.")
                    }
                    previous();
                }
                
            })
            .catch((err) => {  
                setErrorMessage("There was an error signing up.");     
                console.log(error);
                previous();
            });
        }
          
    }, [formData, formSubmitted]);


    const onClick = (e) => {
        let interestName = String(e.currentTarget.id)
        if(interestName in interests) {
            setInterests(update(interests, {$unset: [interestName] }))
        } else {
            setInterests(update(interests, {[interestName]: {$set: true}}))
        }
    }

    const goBack =() => {
        // TODO: change back button to be arrow?
        previous()
    }

    return (
        <>

                <Row span={8} type="flex" align="middle" justify="space-around">
                    <Col span={6}>

                        <Button type="default" onClick={() => goBack()}> Back </Button>
                    </Col>
                <Col span={10}>
                <div className="container">

                <h1>What climate change causes are you most interested in?</h1>
                <h4>Please select all that apply.</h4>
                </div>
                </Col>
                <Col span={6}></Col>
                </Row>

                <Row type="flex" align="middle" justify="space-around">
                <Col span={24}>
                    
                    <Form
                        layout="vertical"
                        name="basic"
                        initialValues={{interests: interests}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >

                        <Form.Item
                        >
                    
                            <Row type="flex" align="middle" justify="space-around">
                                <Space>
                            <Button type="default" id="closeToMe" onClick={(e) => onClick(e)} style={{border: (interests["closeToMe"] ? "1px solid #048A81" : "1px solid #d9d9d9")}}>
                                Close to me
                            </Button>

                            <Button type="default" id="agriculturalInnovation" onClick={(e) => onClick(e)} style={{border: (interests["agriculturalInnovation"] ? "1px solid #048A81" : "1px solid #d9d9d9")}}>
                                Agricultural innovation
                            </Button>

                            <Button type="default" id="marketResearch" onClick={(e) => onClick(e)} style={{border: (interests["marketResearch"] ? "1px solid #048A81" : "1px solid #d9d9d9")}}>
                                Market research
                            </Button>

                            <Button type="default" id="energyEfficiency" onClick={(e) => onClick(e)} style={{border: (interests["energyEfficiency"] ? "1px solid #048A81" : "1px solid #d9d9d9")}}>
                                Energy efficiency
                            </Button>
                            </Space>
                            </Row>

                            <Row type="flex" align="middle" justify="space-around">
                                <Space>
                            <Button type="default" id="academicResearch" onClick={(e) => onClick(e)} style={{border: (interests["academicResearch"] ? "1px solid #048A81" : "1px solid #d9d9d9")}}>
                                Academic Research
                            </Button>

                            <Button type="default" id="nationalLaboratoryResearch" onClick={(e) => onClick(e)} style={{border: (interests["nationalLaboratoryResearch"] ? "1px solid #048A81" : "1px solid #d9d9d9")}}>
                                National Laboratory resarch
                            </Button>

                            <Button type="default" id="grantProposalFunding" onClick={(e) => onClick(e)} style={{border: (interests["grantProposalFunding"] ? "1px solid #048A81" : "1px solid #d9d9d9")}}>
                                Grant proposal funding
                            </Button>

                            <Button type="default" id="transportation" onClick={(e) => onClick(e)} style={{border: (interests["transportation"] ? "1px solid #048A81" : "1px solid #d9d9d9")}}>
                                Transportation
                            </Button>
                            </Space>

                            </Row>

                            <Row type="flex" align="middle" justify="space-around">
                                <Space>
                            <Button type="default" id="limitingDeforestation" onClick={(e) => onClick(e)} style={{border: (interests["limitingDeforestation"] ? "1px solid #048A81" : "1px solid #d9d9d9")}}>
                                Limiting deforestation
                            </Button>

                            <Button type="default" id="cleanEnergy" onClick={(e) => onClick(e)} style={{border: (interests["cleanEnergy"] ? "1px solid #048A81" : "1px solid #d9d9d9")}}>
                                Clean energy
                            </Button>

                            <Button type="default" id="coastalInhabitants" onClick={(e) => onClick(e)} style={{border: (interests["coastalInhabitatns"] ? "1px solid #048A81" : "1px solid #d9d9d9")}}>
                                Coastal inhabitants
                            </Button>

                            <Button type="default" id="homeAndOfficeEnergyUsage" onClick={(e) => onClick(e)} style={{border: (interests["homeAndOfficeEnergyUsage"] ? "1px solid #048A81" : "1px solid #d9d9d9")}}>
                                Home and office energy usage
                            </Button>
                            </Space>
                            </Row>
                            
                        </Form.Item>

                        

                        
                        <Row type="flex" align="middle" justify="center">
                        <Form.Item {...tailLayout}>
                            {/* //TODO: do something different here */}
                            <Button type="default" htmlType="submit">
                                Do It Later
                            </Button>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Complete Profile
                            </Button>
                        </Form.Item>

                        </Row>
                    </Form>

                    </Col>
                </Row>

                <Row type="flex" align="middle" justify="center">
                    <div className="container">
                            <h5>Already have an account? <span> <Button href = "/signin"type="link">Sign In</Button> </span> </h5>
                    </div>
                    </Row>
                </>
    )

}

export default DonorSignUpInterestsPage;

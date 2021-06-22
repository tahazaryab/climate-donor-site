import {Col, Row, Button, Form, Space, Input} from 'antd';
import { useState, useEffect } from 'react';
import { signUp } from '../lib/firebase';
import update from 'immutability-helper';

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const projectowner_organizationInfo = ({formData, organizationInfo, setOrganizationInfo, errorMessage, setErrorMessage, navigation}) => {
    const { previous } = navigation;
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [organizationName, setOrganizationName] = useState();
    const [organizationWebsite, setOrganizationWebsite] = useState();
    const [chapterType, setChapterType] = useState();
    const [other, setOther] = useState();

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
            Object.entries(organizationInfo).forEach(([key, value]) => {
                if (value) {
                    if (organizationInfo in formData) {
                        formData.organizationInfo.push(key)
                    }
                    else {
                        formData.organizationInfo = [key]
                    }
                }
            });
            if (missingValues.length > 1) {    
                setErrorMessage(`You're missing these fields: ${missingValues.join(', ')}`);
                previous();      
                return;    
            }

            signUp('project_owner', formData.email, formData.password, formData.fullName, formData.organizationInfo)
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
        // let organizationName = String(e.currentTarget.id)
        
        if(organizationName in organizationInfo) {
            // setInterests(update(organizationInfo, {$unset: [interestName] }))
            console.log("Already exist in the database")
        } else {
            // setInterests(update(interests, {[interestName] : {$set: true}}))
            setOrganizationInfo(update(organizationInfo, {[organizationName]: {$set: true}}, {[organizationWebsite] : {$set: true}}, {[chapterType] : {$set: true}},  {[chapterType] : {$set: true}}, {[other]: {$set: true}} ));
        }
    }
  


    const goBack =() => {
        // TODO: change back button to be arrow?
        previous()
    }
 
    return (
       <>
        <Row type="flex" align="top">
            <Col span={8}>
                <Button type="default" onClick={() => goBack()}> Back </Button>
            </Col>
            <Col span={8}>
                <div className="container">
                    <h1 className= "global_h1">Welcome, {formData.fullName}!</h1>
                    <h4 className="global_h4">Please tell us more about your organization.</h4>
                </div>

                <Form
                    layout="vertical"
                    name="basic"
                    initialValues={{organizationInfo: organizationInfo}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Organization name"
                        name="organizationName"
                        colon="true"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your organization name!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Your response"
                            onChange = {(e) => setOrganizationName(e.target.value)}
                        />
                        <p>E.g. Sierra Club, Nature Conservancy, Clean Energy Trust, etc.</p>
                    </Form.Item>

                    <Form.Item
                        label="Organization website"
                        name="organizationWebsite"
                        colon="true"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your organization website!',
                            },
                        ]}
                    >
                        <Input 
                            placeholder="Your response"
                            onChange = {(e) => setOrganizationWebsite(e.target.value)}
                        />
                        <p>Please enter the URL for your organization website.</p>
                    </Form.Item>

                    <Form.Item
                        label="Local or regional chapter"
                        name="chapterType"
                        colon="true"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your organization chapter type!',
                            },
                        ]}
                    >
                        <Input 
                            placeholder = "Your response"
                        />
                        <p>If you are the local or regional chapter of a national or international organization, describe it here. </p>
                    </Form.Item>

                    <Form.Item
                        label="Primary contact name"
                        name={formData.name}
                        colon="true"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your fullname',
                            },
                        ]}
                    >
                        <Input 
                            value= { formData.fullName}
                            onChange = {(e) => setChapterType(e.target.value)}
                        />
                        <p>Name of the person to follow up with at your organization. </p>
                    </Form.Item>

                    <Form.Item
                        label="Primary contact email address"
                        name="email"
                        colon="true"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email address',
                            },
                        ]}
                    >
                        <Input 
                            value = {formData.email}
                            // This isn't working yet
                        />
                    </Form.Item>

                    <Form.Item
                        label="Primary contact phone number"
                        name="phoneNumber"
                        colon="true"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number',
                            },
                        ]}
                    >
                        <Input 
                            placeholder = "Your response"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Type of organization"
                        name="organizationType"
                        colon="true"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your oraganization type',
                            },
                        ]}
                    >
                        <Input 
                            placeholder = "Please select"
                        />
                    </Form.Item>

                    <Form.Item
                        label="If 'other' please describe your organization"
                        name="otherInfo"
                        colon="true"
                        rules={[
                            {
                                required: true,
                                message: 'Please input other organization info',
                            },
                        ]}
                    >
                        <Input 
                            placeholder = "Your response"
                            onChange={(e) => setOther(e.target.value)}
                        />
                    </Form.Item>
                    
                    <Form.Item {...tailLayout}>
                        <Button className="projectowner_btn" type="primary" htmlType="submit" onClick={onclick}>
                            Finish
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
       </>
    )
}

export default projectowner_organizationInfo

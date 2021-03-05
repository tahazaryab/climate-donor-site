import Link from 'next/link'
import NavBar from "../../components/NavBar";
import React from "react";
import {Layout, Col, Row, Button, Form, Input, Checkbox} from 'antd';

const {Content} = Layout;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export default function Index() {
    return (
        <>
            <NavBar>
            </NavBar>
            <Content>
                <Col>
                    <div className="container">

                        <h1>Sign In</h1>
                    </div>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="container">
                        <Col>
                            <Button type="link">Forgot password?</Button>
                            <h5>Don't have an account? <span> <Button href = "/signup"type="link">Sign Up</Button> </span> </h5>
                        </Col>
                    </div>
                </Col>


            </Content>

        </>
    )
}

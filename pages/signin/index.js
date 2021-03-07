import Link from 'next/link'
import NavBar from "../../components/NavBar";
import {Layout, Col, Row, Button, Form, Input, Checkbox} from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from '../../lib/firebase';
import { withAuthUser, AuthAction } from 'next-firebase-auth'

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

const SignInPage = () => {

    const router = useRouter();  
    // const [user, userLoading] = useAuth();  
    // const [values, setValues] = useState({ email: '', password: '' });   
    // if (userLoading) {    
    //     return <h1>Loading...</h1>;  
    // }   
    // if (user && typeof window !== 'undefined') {
    //     router.push('/');    
    //     return null;  
    // }   
    // const handleChange = (e) => {    
    //     const id = e.target.id;    
    //     const newValue = e.target.value;     
    //     setValues({ ...values, [id]: newValue });  
    // };   
    const onFinish = (values) => { 
        
        let missingValues = [];    
        Object.entries(values).forEach(([key, value]) => {      
            if (!value) {        
                missingValues.push(key);      
            }    
        });     
        if (missingValues.length > 1) {      
            alert(`You're missing these fields: ${missingValues.join(', ')}`);      
            return;    
        }     
        signIn(values.email, values.password).catch((err) => {      
            alert(err);    
        });  
    };  

    const onFinishFailed = (errorInfo) => {
        // TODO: show error on UI. 
        console.log('Failed:', errorInfo);
    };
    // TODO: Remember me, validation of fields, forgot password

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
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
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
                            type="password"          
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

const MyLoader = () => <div>Loading...</div>

export default withAuthUser({
    whenAuthed: AuthAction.REDIRECT_TO_APP,
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.RENDER,
    LoaderComponent: MyLoader,
  })(SignInPage)

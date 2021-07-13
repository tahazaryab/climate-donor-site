import {Col, Row, Button, Form, Input} from 'antd'
import { useRouter } from 'next/router'

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const DonorSignUpInfoPage = ({formData,setForm, errorMessage, setErrorMessage, navigation }) =>  {

    const { fullName, email, password } = formData;

    const { next } = navigation;
    const router = useRouter()
      
    const onFinish = (values) => {    
        let missingValues = [];    
        Object.entries(values).forEach(([key, value]) => {      
            if (!value) {        
                missingValues.push(key);      
            }    
        });     
        if (missingValues.length > 1) {      
            setErrorMessage(`You're missing these fields: ${missingValues.join(', ')}`);      
            return;    
        } 
        setForm(values);
        next();
    };  

    const onFinishFailed = (errorInfo) => {
        setErrorMessage("You're missing these fields.");
        console.log('Failed:', errorInfo);
    };

    const goBack =() => {
        // TODO: change back button to be arrow?
        router.push("/signup")
    }


    return (
        <Row type="flex" align="top">
            <Col span={8}>
                <Button type="default" onClick={() => goBack()}>Back</Button>
            </Col>
            <Col span={8}>
                <div className="container">
                    <h1>Sign Up</h1>
                </div>
                <div>
                    <p style={{color: "red"}}>{errorMessage}</p>
                </div>
                <Form
                    layout="vertical"
                    name="basic"
                    initialValues={{fullName: fullName, email: email, password: password}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="fullName"
                        colon="true"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first and last name!',
                            },
                        ]}
                        
                    >
                        <Input
                        placeholder="Your First and Last Name"
                         />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        colon="true"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input 
                        placeholder="Your Email"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        colon="true"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        type="password"
                           
                    >
                        <Input.Password 
                        placeholder="Your Password"
                        />
                    </Form.Item>
                    
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Continue
                        </Button>
                    </Form.Item>
                </Form>
                <div className="container">
                    <Col>
                        <h5>Already have an account? <span> <Button href = "/signin"type="link">Sign In</Button> </span> </h5>
                    </Col>
                </div>
            </Col>
            <Col span={8}></Col>
        </Row>
    )
}

export default DonorSignUpInfoPage;

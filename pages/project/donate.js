import styles from '../../styles/ProjectPage.module.css'
import { Button, Image, Progress, Row, Layout,Form, Input, Select,Checkbox, InputNumber } from 'antd'
import { faUser, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getDoc } from '../../lib/firebase'
import {
    useAuthUser,
    withAuthUser,
    AuthAction
} from 'next-firebase-auth'
import { addDonation } from '../../lib/firebase'
import DBNavBar from "../../components/DBNavBar";
import Link from 'next/link'
import axios from 'axios'


import { loadStripe } from '@stripe/stripe-js'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
const DonorDonate = () => {
  const AuthUser = useAuthUser()
    const displayName = AuthUser.firebaseUser.displayName
    const router = useRouter()
    const [amount] = useState(10)
    const [project, setProject] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const { project_id } = router.query;
    const { Content } = Layout;

    const [form] = Form.useForm();
    const [checkNick, setCheckNick] = useState(false);

    const getProject = async () => {
        var proj = (await getDoc("projects", project_id))
        proj = await Promise.resolve(proj)
        proj.published = proj?.published.toDate().toLocaleDateString() + ''
        proj.updated = proj?.updated.toDate().toLocaleDateString() + ''
        setProject(proj)
        setIsLoading(false)
    }
    
    const onFinish = async(values) => {
      const stripe = await stripePromise;
      getProject();

      values["project_id"] = project_id;
      values["project_title"] = project?.title;
      fetch('/api/checkout_sessions', {
        method: 'POST',
        body: JSON.stringify(values),
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(session) {
        return stripe.redirectToCheckout({ sessionId: session.id });
      })
      .then(function(result) {
        if (result.error) {
          alert(result.error.message);
        }
      });
    }


    const onCheckboxChange = (e) => {
        setCheckNick(e.target.checked);
      };


    return (
        
        <Layout>
            <DBNavBar userId={AuthUser.id}
                userName={displayName != null ? displayName : 'Name'}
                signOut={AuthUser.signOut} />
            <Content className="siteContent projectPageContent">
                <Row>
                    <div style={{ marginLeft: '30px' }}>
                        <Link href="/dashboard">
                            <span className={styles.breadcrumb}>Projects / </span>
                        </Link>
                        <span>Donate</span>
                    </div>
                </Row>
                <div  style={{ padding: '60px', margin:'3em', textAlign: 'left'}}>
                    <div style={{ padding: '10px'}}>
                        <h2>Thank you for choosing to Donate!</h2>

                        <h3>Please fill out the name of the donator and the name of the project you're donating to.</h3>
                    </div>

                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        style={{ marginRight: '100px !important', textAlign:'left !important' }}
                        autoComplete="off"
                        >
                        <Form.Item
                            label="Name of Donator"
                            name="donator"
                            hidden={checkNick}
                            rules={[
                            {
                                required: !checkNick,
                                message: 'Please input your name!',
                            },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="anonymous"
                            valuePropName="checked"
                            wrapperCol={{
                            offset: 0,
                            span: 16,
                            }}
                        >
                            <Checkbox onChange={onCheckboxChange}>Remain Anonymous</Checkbox>
                        </Form.Item>

                        <Form.Item
                            name="project"
                            preserve={true}
                            hidden={true}
                            
                            rules={[
                                {
                                    required: false,
                                },
                                ]}
                        >
                            <Input value="akshay"></Input>
                        </Form.Item>


                        <Form.Item
                            label="Donation amount"
                            name="donation"
                            
                            rules={[
                            {
                                required: false,
                                message: 'Please input your donation amount!',
                            },
                            ]}
                        >
                            <InputNumber/>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                            offset: 8,
                            span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                        </Form>

                </div>
            </Content>
        </Layout>
    )
}

const MyLoader = () => <div>Loading...</div>
export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: MyLoader,
})(DonorDonate) 
import styles from '../../styles/ProjectPage.module.css'
import donationStyles from "../../styles/DonationForm.module.css";
import { Button, Image, Progress, Row, Layout,Form, Input, Select, Checkbox, InputNumber } from 'antd'
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
import "@fontsource/inter";


import { loadStripe } from '@stripe/stripe-js'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);


function ProjectInfo(props) {
  return (
    <>
      <div className={donationStyles.projectInfo}>
        <p>
          <img className={donationStyles.thumbnail}
            src="https://www.w3schools.com/css/pineapple.jpg" alt="Project thumbnail"
          />
          <br />
          <span className={donationStyles.small}>
            You're supporting {props.projectOwner}&lsquo;s Project
          </span>
          <br />
          <span className={donationStyles.big}>
          {props.projectName}
          </span>
        </p>
      </div>
      
    </>    
    );
}

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
		<>
			<DBNavBar userId={AuthUser.id}
				userName={displayName != null ? displayName : 'Name'}
				signOut={AuthUser.signOut} />
			<br />
			<div>
				<a className={donationStyles.back}>← Back to Project</a>
				<ProjectInfo 
					projectOwner="Climate Donor"
					projectName="Repurposing Oil Platforms"
				/>
			</div>
			<div className={donationStyles.formContainer}>
				<Form
					layout="vertical"
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					autoComplete="off"
				>
				<h3>Enter your donation</h3>
				<div className={donationStyles.amountFormContainer}>
					<Form.Item
						name="donation"
						rules={[
							{
								required: true,
								hidden: true,
								message: "Please input an amount to donate!",
							},
						]}
					>
						
						<Input />
						<p>$</p>
					</Form.Item>
					
					</div>
					<hr />
					<h3 className={donationStyles.personalInfoHeader}>Personal Information</h3>
					<div className={donationStyles.personalInfoContainer}>
						<div>
							<Form.Item
								label="Email"
								name="email"
								colon={false}
								rules={[
									{
										required: true,
										type: "email",
										message: "Please input your email!",
									},
								]}
							>
								<Input placeholder="Your Email" />
							</Form.Item>
							<Form.Item
								name="anonymous"
								valuePropName="checked"
							>
								<Checkbox onChange={onCheckboxChange}>Make my donation anonymous</Checkbox>
							</Form.Item>
						</div>
						<div>
							<Form.Item
								label="Name"
								name="donator"
								colon={false}
								hidden={checkNick}
								rules={[
								{
									required: !checkNick,
									type: 'name',
									message: 'Please input your name!',
								},
								]}
							>
								<Input placeholder="Your First and Last Name" />
							</Form.Item>
						</div>
					</div>
				
					<Form.Item>
						<Button type="primary" htmlType="submit" className={donationStyles.checkoutButton}>
							Checkout
						</Button>
					</Form.Item>
					<p className={donationStyles.checkoutCaption}>(You will be able to review your information before we place your donation)</p>
				</Form>
			</div>
		</>
	)
}

const MyLoader = () => <div>Loading...</div>
export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: MyLoader,
})(DonorDonate) 
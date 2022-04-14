import { Button, Form, Input, Select } from "antd";
import styles from "../styles/DonationSignIn.module.css";
import React from "react";
import DBNavBar from "../components/DBNavBar";
import NavBar from "../components/NavBar";
import "@fontsource/inter";

export default function donateSignIn() {
  return (
		<>
    	<NavBar />
			<br />
			<div className={styles.mainContainer}>
      	<h1>How would you like to donate today?</h1>
				<div className={styles.gridContainer}>
					<div>
						<h3>Returning User</h3>
						<p>Signing in with Climate Donor allows you to keep a record of your contributions!</p>
						<Form>
							<Form.Item
                label="Email"
                name="email"
                colon="true"
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
                label="Password"
                name="password"
                colon="true"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                type="password"
              >
                <Input.Password placeholder="Your Password" />
              </Form.Item>
							<Button type="primary" className={styles.signIn}>
								Sign in
							</Button>
							
						</Form>
						<p className={styles.signUp}>
							Don't have an account? 
							<a> Sign Up</a>
						</p>
					</div>
					<div>
						<h3>Guest</h3>
						<p>No account? Continue as a guest and you will have an opportunity at the end if you would like to create an account to track your contributions!</p>
						<Button type="primary">
							Continue as Guest
						</Button>
					</div>
				</div>
			</div>
		</>
  );
}
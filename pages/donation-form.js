import { Button, Checkbox, Form, Image, Input } from "antd";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import donationStyles from "../styles/DonationForm.module.css";
import React from "react";
import DBNavBar from "../components/DBNavBar";
import "@fontsource/inter";

function ProjectInfo(props) {
  return (
    <>
      <div className={donationStyles.projectInfo}>
        <p>
        <img className={donationStyles.thumbnail}
          src="https://www.w3schools.com/css/pineapple.jpg" alt="Pineapple" />
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

function GuestForm() {
  return (
    <>
    <Form>
      <h3>Enter your donation</h3>
      <Form.Item
      >
        <Input></Input>
      </Form.Item>
      <hr />
      <h3>Personal Information</h3>
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
        label="Name"
        name="name"
        colon="true"
        rules={[
          {
            required: true,
            type: "name",
            message: "Please input your name!",
          },
        ]}
      >
        <Input placeholder="Your First and Last Name" />
      </Form.Item>
      <Form.Item
        name="anonymous"
        valuePropName="checked"
      >
        <Checkbox>Make my donation anonymous</Checkbox>
      </Form.Item>
      
      <hr />

      <h3>Payment Method</h3>
    </Form>
    </>
  );
}

function FullForm() {
  return (
    <>
    </>
  );
}

function PersonalInfoForm() {
  return (
    <>
    </>
  );
}

function PaymentMethodForm() {
  return (
    <>
    </>
  );
}

export default function DonationForm() {
  return (
    <>
      <NavBar />
      <br />
      <div>
      <a className={donationStyles.back}>← Back to Project</a>
      <ProjectInfo 
        projectOwner="Climate Donor"
        projectName="Repurposing Oil Platforms"
      />
      
      </div>
    </>
  );
}
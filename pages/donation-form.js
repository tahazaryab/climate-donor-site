import { Button, Checkbox, Form, Input, Select } from "antd";
import styles from "../styles/Home.module.css";
import donationStyles from "../styles/DonationForm.module.css";
import React from "react";
import DBNavBar from "../components/DBNavBar";
import "@fontsource/inter";


// TODO: Add all possible states/country options
// TODO: Get list of states/countries from data instead of hardcoded
function DropdownForm(props) {
  if (props.type == "country")
    return (
      <>
        <Form.Item
          name="country-select"
          label="Country"
          hasFeedback
          rules={[{ required: true, message: 'Please select your country!' }]}
        >
          <Select>
            <Select value="china">China</Select>
            <Select value="usa">United States of America</Select>
          </Select>
        </Form.Item>
      </>
    );
  
  return (
    <>
      <Form.Item
        name="state-select"
        label="State"
        hasFeedback
        rules={[{ required: true, message: 'Please select your state!' }]}
      >
        <Select>
          <Select value="az">AZ</Select>
          <Select value="ca">CA</Select>
          <Select value="ny">NY</Select>
        </Select>
      </Form.Item>
    </>
  );
}

function ProjectInfo(props) {
  return (
    <>
      <div className={donationStyles.projectInfo}>
        <p>
          <img className={donationStyles.thumbnail}
            src="https://www.w3schools.com/css/pineapple.jpg" alt="Pineapple"
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
        label="Name"
        name="name"
        colon={false}
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
      <Form.Item
        label="Card Number"
        name="card-number"
        colon={false}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Card Number" />
      </Form.Item>
      <Form.Item
        label="Expiration"
        name="expiration"
        colon={false}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="MM/YY" />
      </Form.Item>
      <Form.Item
        label="CVV"
        name="cvv"
        colon={false}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="CVV" />
      </Form.Item>
      <Form.Item
        label="Name on Card"
        name="name-on-card"
        colon={false}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Name on Card" />
      </Form.Item>
      <h3>Billing Information</h3>
      <Form.Item
        label="First Name"
        name="billing-first-name"
        colon={false}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="billing-last-name"
        colon={false}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item
        label="Street Address"
        name="street-address"
        colon={false}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Street Address" />
      </Form.Item>
      <Form.Item
        label="Street Address Line 2"
        name="street-address-2"
        colon={false}
      >
        <Input placeholder="Street Address Line 2" />
      </Form.Item>
      <DropdownForm type="state"/>
      <Form.Item
        label="Postal Code"
        name="postal-code"
        colon={false}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Postal Code" />
      </Form.Item>
      <DropdownForm type="country"/>

      <Form.Item
        name="remember-card"
        valuePropName="checked"
      >
        <Checkbox>Remember my card for future donations</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Checkout
        </Button>
      </Form.Item>
    </Form>
    </>
  );
}

export default function DonationForm() {
  return (
    <>
      <DBNavBar />
      <br />
      <div>
      <a className={donationStyles.back}>← Back to Project</a>
      <ProjectInfo 
        projectOwner="Climate Donor"
        projectName="Repurposing Oil Platforms"
      />
      </div>
      <div className={donationStyles.formContainer}>
        <GuestForm />
      </div>
    </>
  );
}
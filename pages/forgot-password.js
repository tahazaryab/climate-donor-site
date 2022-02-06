import React from "react";
import NavBar from "../components/NavBar";
import { message, Layout, Col, Row, Button, Form, Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import { resetPassword } from "../lib/firebase";
import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";
const { Content } = Layout;

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const ForgotPassword = () => {
  const AuthUser = useAuthUser();

  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = async (values) => {
    try {
      await resetPassword(values.email);
      message.success(
        "Email sent to " +
          values.email +
          "! Check your inbox for instructions to reset your password."
      );
    } catch (error) {
      if (error != null) {
        if (error.code === "auth/user-not-found") {
          message.error("User not found, account may have been deleted");
        } else if (error.code === "auth/invalid-email") {
          message.error("Invalid Email");
        } else {
          setErrorMessage(
            "There was an error sending the email. Please try again."
          );
        }
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Invalid email");
  };

  return (
    <>
      <NavBar userId={AuthUser.id} signOut={AuthUser.signOut}></NavBar>
      <Layout>
        <NavBar></NavBar>
        <Content className="siteContent">
          <Row type="flex" align="middle">
            <Col span={8}></Col>
            <Col span={8}>
              <div className="container">
                <h1>Forgot Password</h1>
              </div>

              <p style={{ color: "red" }}></p>
              <Form
                layout="vertical"
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
                  colon="true"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "",
                    },
                  ]}
                >
                  <Input placeholder="Your Email" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Reset Password!
                  </Button>
                </Form.Item>
              </Form>
              <div>
                <Link href="/signin">Return to sign in</Link>{" "}
                <h4>
                  Don't have an account?{" "}
                  <span>
                    {" "}
                    <Link href="/signup">Sign Up</Link>{" "}
                  </span>{" "}
                </h4>
              </div>
            </Col>
            <Col span={8}></Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

const MyLoader = () => <div>Loading...</div>;
export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: MyLoader,
})(ForgotPassword);

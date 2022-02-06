import NavBar from "../components/NavBar";
import { Layout, Col, Row, Button, Form, Input, Checkbox } from "antd";
import { signIn } from "../lib/firebase";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import { useState } from "react";
import Link from "next/link";

const { Content } = Layout;

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const SignInPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const onFinish = async (values) => {
    let missingValues = [];
    Object.entries(values).forEach(([key, value]) => {
      if (!value) {
        missingValues.push(key);
      }
    });
    if (missingValues.length > 1) {
      setErrorMessage(
        `You're missing these fields: ${missingValues.join(", ")}`
      );
      return;
    }

    try {
      await signIn(values.email, values.password);
    } catch (error) {
      if (error != null) {
        if (error.code === "auth/invalid-email") {
          setErrorMessage("Email address is invalid.");
        } else if (error.code === "auth/user-disabled") {
          setErrorMessage(
            "The account with the given email address has been disabled."
          );
        } else if (error.code === "auth/user-not-found") {
          setErrorMessage(
            "There is no user account corresponding to the given email."
          );
        } else if (error.code === "auth/wrong-password") {
          setErrorMessage("Wrong password.");
        } else {
          setErrorMessage("There was an error signing in.");
        }
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    setErrorMessage("You're missing these fields.");
    console.log("Failed:", errorInfo);
  };
  // TODO: Remember me, validation of fields, forgot password

  return (
    <Layout>
      <NavBar></NavBar>
      <Content className="siteContent">
        <Row type="flex" align="middle">
          <Col span={8}></Col>
          <Col span={8}>
            <div className="container">
              <h1>Sign In</h1>
            </div>

            <p style={{ color: "red" }}>{errorMessage}</p>
            <Form
              // {...layout}
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

              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <div>
              <Link href="/forgot-password">Forgot password?</Link>{" "}
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
  );
};

const MyLoader = () => <div>Loading...</div>;

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: MyLoader,
})(SignInPage);

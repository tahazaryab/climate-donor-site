import React from 'react';
import DBNavBar from '../../components/DBNavBar';
import OwnerSidebar from '../../components/OwnerSidebar';
import styles from '../../styles/OwnerDB.module.css';
import { Layout, Button, Form, Input, DatePicker, Select } from 'antd';

const { Content } = Layout;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

const OwnerDashboard = () => {
    const [form] = Form.useForm();

    const onFinish = (fieldsValue) => {
        //handle form submit
    }

    return (
        <>
            <Layout>
                <DBNavBar />
                <Content className={styles.content}>
                    <OwnerSidebar />
                    <div>
                        <p className={styles.breadcrumb}>
                            <span style={{ color: "rgba(0, 0, 0, 0.45)" }}>Projects / </span>New Project
                        </p>
                        <div className={styles.titleArea}>
                            <h1>Tell us about your project.</h1>
                            <p>This information will help us evaluate your project.</p>
                        </div>
                        <Form
                            className={styles.formContent}
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}>
                            <Form.Item
                                name="projectName"
                                label="Project Name"
                                required
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input project name!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Your Response"
                                />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Project Description"
                                extra="Describe the nature of your program or project, including climate change mitigation impacts."
                                required
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input project description!',
                                    },
                                ]}
                            >
                                <TextArea
                                    placeholder="Your Response"
                                    rows={3}
                                />
                            </Form.Item>

                            <Form.Item
                                name="range"
                                label="Project Time Frame"
                                required
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select the dates!',
                                    },
                                ]}
                            >
                                <RangePicker className={styles.datepicker} />
                            </Form.Item>

                            <Form.Item
                                name="funding"
                                label="Funding Required"
                                extra="The total amount of funding you need for this project."
                                required
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input funding amount!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Your Response"
                                />
                            </Form.Item>


                            <Form.Item
                                name="usage"
                                label="How will you use the funds?"
                                extra="Please provide a short summary of how the funds will be used."
                                required
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input how will you use the funds!',
                                    },
                                ]}
                            >
                                <TextArea
                                    placeholder="Your Response"
                                    rows={3}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Do you need volunteer support?"
                                extra="Would you want to list your volunteer needs on ClimateDonor.org?"
                            >
                                <Select
                                    placeholder="Please select">
                                    <Option value="yes">Yes</Option>
                                    <Option value="no">No</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="What other service can we provide?"
                                extra="Beyond crowd-funding for your projects, what other services could ClimateDonor.org provide your organization that aren't already being addressed by others?"
                            >
                                <TextArea
                                    placeholder="Your Response"
                                    rows={3}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Any additional feedback?"
                                extra="Please feel free to provide any other questions or recommendations."
                            >
                                <TextArea
                                    placeholder="Your Response"
                                    rows={3}
                                />
                            </Form.Item>

                            <Form.Item className={styles.btnWrapper}>
                                <Button htmlType="submit" className={styles.submitBtn}>
                                    Submit
                                </Button>
                            </Form.Item>

                        </Form>
                    </div>
                </Content>
            </Layout>
        </>
    );
}

export default OwnerDashboard;
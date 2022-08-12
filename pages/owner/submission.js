import React, { useEffect, useState } from "react";
import DBNavBar from "../../components/DBNavBar";
import OwnerSidebar from "../../components/OwnerSidebar";
import styles from "../../styles/OwnerSub.module.css";
import { Layout, Button, Form, Input, DatePicker, Select, Image, Col, Row, Space } from "antd";
import { addProject, addImages, getImageURLs } from "../../lib/firebase";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { styled } from '@material-ui/core/styles';
import { useRouter } from "next/router";
import { UploadOutlined, DeleteFilled } from '@ant-design/icons';
import { Upload } from 'antd';
import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";
import Tags from "../../data/interests.json";
import { Card } from 'antd';

const { Content } = Layout;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;



const ProjectSubmission = () => {

	// Handles image file uploads
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [imageURLS, setImageURLS] = useState([]);



	const [form] = Form.useForm();
	const router = useRouter();
	const AuthUser = useAuthUser();

	const onFinish = (fieldsValue) => {
		//handle form submit


		const project = {
			title: fieldsValue.projectName,
			description: fieldsValue.description,
			totalAmt: fieldsValue.funding,
			src: imageURLS,
			website: fieldsValue.website,
			curAmt: 1000,
			tagName: fieldsValue.tag,
			location: fieldsValue.location,
			ownerId: AuthUser.id,
		};

		addProject(project, selectedFiles, fieldsValue.projectName);
		router.push("/dashboard");

	};


	useEffect(() => {
		console.log(AuthUser.id);
	});

	const handleFileUpload = (e) => {
		/* List of files is "array-like" not an actual array
		* So we have to convert to file to an array an add it the array 
		* by destructuring it
		*/
		setSelectedFiles(selectedFiles => [...selectedFiles, ...e.target.files]);

	};

	const removeImage = (index) => {
		const newFileList = [...selectedFiles];
		newFileList.splice(index, 1);
		setSelectedFiles(newFileList);
	}

	return (
		<>
			<Layout>

				<DBNavBar />
				<Content className={styles.content}>

					<OwnerSidebar />
					<div>
						<p className={styles.breadcrumb}>
							<span style={{ color: "rgba(0, 0, 0, 0.45)" }}>Projects / </span>
							New Project
						</p>
						<div className={styles.titleArea}>
							<h1>Tell us about your project.</h1>
							<p>This information will help us evaluate your project.</p>
						</div>
						<Form
							className={styles.formContent}
							form={form}
							layout="vertical"
							onFinish={onFinish}
						>
							<Form.Item
								name="projectName"
								label="Project Name"
								required
								rules={[
									{
										required: true,
										message: "Please input project name!",
									},
								]}
							>
								<Input placeholder="Your Response" />
							</Form.Item>

							<Form.Item
								name="description"
								label="Project Description"
								extra="Describe the nature of your program or project, including climate change mitigation impacts."
								required
								rules={[
									{
										required: true,
										message: "Please input project description!",
									},
								]}
							>
								<TextArea placeholder="Your Response" rows={3} />
							</Form.Item>

							<Form.Item
								name="location"
								label="Location"
								required
								rules={[
									{
										required: true,
										message: "Please input your project head quarters location",
									},
								]}
							>
								<Input placeholder="Your Response" />
							</Form.Item>

							<Form.Item
								name="website"
								label="website"
								required
								rules={[
									{
										required: true,
										message: "Enter your website url",
									},
									{
										type: "url",
										message: "Enter a valid url",
									},
								]}
							>
								<Input placeholder="Your Response" />
							</Form.Item>

							<Form.Item
								name="range"
								label="Project Time Frame"
								required
								rules={[
									{
										required: true,
										message: "Please select the dates!",
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
										message: "Please input funding amount!",
									},
								]}
							>
								<Input placeholder="Your Response" />
							</Form.Item>
							<Form.Item
								name="tag"
								label="Tag"
								extra="Categorise your project as one of the tags."
								required
								rules={[
									{
										required: true,
										message: "Please select a suitable tag",
									},
								]}
							>
								<Select placeholder="Select a suitable tag" allowClear>
									{Tags.map((tag) => (
										<Option value={tag.id}>{tag.name}</Option>
									))}
								</Select>
							</Form.Item>

							<Form.Item
								name="usage"
								label="How will you use the funds?"
								extra="Please provide a short summary of how the funds will be used."
								required
								rules={[
									{
										required: true,
										message: "Please input how will you use the funds!",
									},
								]}
							>
								<TextArea placeholder="Your Response" rows={3} />
							</Form.Item>

							<Form.Item
								label="Do you need volunteer support?"
								extra="Would you want to list your volunteer needs on ClimateDonor.org?"
							>
								<Select placeholder="Please select">
									<Option value="yes">Yes</Option>
									<Option value="no">No</Option>
								</Select>
							</Form.Item>

							<Form.Item
								label="What other service can we provide?"
								extra="Beyond crowd-funding for your projects, what other services could ClimateDonor.org provide your organization that aren't already being addressed by others?"
							>
								<TextArea placeholder="Your Response" rows={3} />
							</Form.Item>

							<Form.Item
								label="Do you have any images to add?"
								extra="Do you have any mock-ups or design plans you'd like to include?"
							>

								<label htmlFor="icon-button-file">

									<input style={{ display: 'none' }} accept="image/*" id="icon-button-file" type="file" multiple onChange={handleFileUpload} />
									<div className={styles.imageUpload}>
										<UploadOutlined />
										<span>Upload</span>
									</div>



								</label>
								<div style={{ height: '16px' }}>
								</div>
								{selectedFiles.length <= 0 ? <></> : selectedFiles.map((image, key) => (
									<Row>
										<Col span={24}>
											<Col span={12}>
												<Space
													direction="vertical"
													size="large"
													style={{
														display: 'flex',
													}}
												>
													<Image
														key={key}
														preview={false}
														width={100}
														src={URL.createObjectURL(image)}
													/>

												</Space>
											</Col>
											<Col span={12}>
												<Space
													direction="vertical"
													size="large"
													style={{
														display: 'flex',
													}}
												>

													<DeleteFilled style={{ fontSize: '24px' }} onClick={() => removeImage(key)} />
												</Space>
											</Col>
										</Col>


									</Row>

								))}

							</Form.Item>



							<Form.Item
								label="Any additional feedback?"
								extra="Please feel free to provide any other questions or recommendations."
							>
								<TextArea placeholder="Your Response" rows={3} />
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
};

const MyLoader = () => <div>Loading...</div>;
export default withAuthUser({
	whenAuthed: AuthAction.RENDER,
	whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
	LoaderComponent: MyLoader,
})(ProjectSubmission);

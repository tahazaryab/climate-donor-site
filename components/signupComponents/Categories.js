import { useState } from "react";
import { Row, Col, Card, Layout, Button, Space } from "antd";
import categories from "../../data/categories.json";
import Image from "next/image";
import styles from "../../styles/Categories.module.css";
import Link from "next/link";

import { useRouter } from "next/router";

const { Meta } = Card;
const { Content } = Layout;

export default function Categories() {
	const router = useRouter();
	const [userType, setUserType] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleContinue = () => {
		if (userType === "donor") {
			router.push("/donor/signup");
		} else if (userType === "projectOwner") {
			router.push("/owner/signup");
		} else if (userType === "corporatePartner") {
			console.log("not implemented");
		} else {
			setErrorMessage("Please choose a category.");
		}
	};

	return (
		<Content className="siteContent">
			<Row className={styles.centerCol}>
				<Col span={10}>
					<h1>
						Welcome! How would you like to help in the fight against climate
						change?
					</h1>
					<h4>
						If you fall under more than one category, please pick your primary
						type for now and you can switch later.
					</h4>

					<p style={{ color: "red" }}>{errorMessage}</p>
				</Col>
			</Row>

			<div className="container">
				<Row gutter={16}>
					{categories.map((category) => (
						<Col span={8} key={category.userType}>
							<Card
								hoverable
								style={{
									width: 300,
									border:
										userType === category.userType
											? "1px solid #048A81"
											: "none",
									padding: 5,
									borderRadius: 6,
								}}
								cover={<Image src={category.image} width={292} height={180} />}
								onClick={() => setUserType(category.userType)}
							>
								<Meta
									title={category.name}
									description={category.description}
								/>
							</Card>
						</Col>
					))}
				</Row>
			</div>
			<Row justify="center" style={{ marginTop: "20px" }}>
				<Col span={6} className={styles.centerCol}>
					<Button type="primary" onClick={handleContinue}>
						Continue
					</Button>
					<p>
						Already have an account?{" "}
						<span>
							<Link href="/signin">Sign In</Link>
						</span>
					</p>
				</Col>
			</Row>
		</Content>
	);
}

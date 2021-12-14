import { useState } from "react";
import { Col, Row, Button } from "antd";
import { signUp } from "../../lib/firebase";
import interestess from "../../data/interests.json";
import Link from "next/link";

const DonorSignUpInterestsPage = ({
	formData,
	interests,
	setInterests,
	setErrorMessage,
	navigation,
}) => {
	const { previous } = navigation;

	const [userInterests, setUserInterests] = useState(interestess);
	const handleSubmit = async () => {
		let missingValues = [];
		Object.entries(formData).forEach(([key, value]) => {
			if (!value) {
				missingValues.push(key);
			}
		});

		userInterests.forEach((item) => {
			if (item.checked) {
				setInterests((prevInterests) => {
					return [...prevInterests, item.name];
				});
			}
		});
		formData.interests = interests;

		if (missingValues.length > 1) {
			setErrorMessage(
				`You're missing these fields: ${missingValues.join(", ")}`
			);
			previous();
			return;
		}
		console.log(formData);
		try {
			await signUp(
				"donor",
				formData.email,
				formData.password,
				formData.fullName,
				formData.interests
			);
		} catch (error) {
			console.log(error.message);
			if (error.message === "auth/email-already-in-use") {
				setErrorMessage(
					"There already exists an account with the given email address."
				);
			} else if (error.message === "auth/invalid-email") {
				setErrorMessage("Email address not valid.");
			} else if (error.message === "auth/weak-password") {
				setErrorMessage("Password must be at least 6 characters.");
			} else {
				setErrorMessage("There was an error signing up.");
			}
			previous();
		}
	};

	const handleDoitLater = () => {
		setUserInterests((prevInterests) => {
			const copy = [...prevInterests];

			copy.forEach((item) => {
				item.checked = false;
			});

			return copy;
		});
	};

	const handleInterest = (index) => {
		setUserInterests((prevInterests) => {
			const copy = [...prevInterests];
			copy[index].checked = !userInterests[index].checked;
			return copy;
		});
	};

	const goBack = () => {
		// TODO: change back button to be arrow?
		previous();
	};

	return (
		<>
			<Row span={8} type="flex" align="middle" justify="space-around">
				<Col span={6}>
					<Button type="default" onClick={() => goBack()}>
						Back
					</Button>
				</Col>
				<Col span={10}>
					<div className="container">
						<h1>What climate change causes are you most interested in?</h1>
						<h4>Please select all that apply.</h4>
					</div>
				</Col>
				<Col span={6}></Col>
			</Row>

			<Row justify="center" style={{ margin: "20px" }}>
				<Col span={24} style={{ maxWidth: "600px" }}>
					{userInterests.map((interest, index) => (
						<Button
							type="default"
							onClick={() => handleInterest(index)}
							key={index}
							style={{
								margin: "2px",
								border: interest.checked
									? "1px solid #048A81"
									: "1px solid #d9d9d9",
							}}
						>
							{interest.name}
						</Button>
					))}
				</Col>
			</Row>

			<Row type="flex" align="middle" justify="center">
				{/* //TODO: do something different here */}
				<Button
					type="default"
					style={{ marginRight: "10px" }}
					onClick={handleDoitLater}
				>
					Do It Later
				</Button>
				<Button type="primary" onClick={handleSubmit}>
					Complete Profile
				</Button>
			</Row>

			<Row type="flex" align="middle" justify="center">
				<div className="container">
					<h4>
						Already have an account?{" "}
						<span>
							{" "}
							<Link href="/signin">Sign In</Link>
						</span>
					</h4>
				</div>
			</Row>
		</>
	);
};

export default DonorSignUpInterestsPage;

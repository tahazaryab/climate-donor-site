import styles from "../styles/ProjectCard.module.css";
import { faUser, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Col, Row } from "antd";

const SimpleProjectCard = ({ project }) => {
	return (
		<Link
			href={`/project/${project.id}`}
		>
			<div>
				<Row >
				<Col span={6}>Title: {project.title}</Col>
				<Col span={6}>Author: {project.author}</Col>
				<Col span={6}>Status: {project.status}</Col>
				<Col span={6}>Last Action: {project.updated}</Col>
				</Row>
			</div>

		</Link>
	);
}

export default SimpleProjectCard;
import { useEffect, useState } from "react";
import styles from "../../styles/AdminDB.module.css";
import SearchBar from "../SearchBar";
import ProjectTabs from "../ProjectTabs";
import { Dropdown, Layout, Row } from "antd";

export default function Projects() {
	const [projects, setProjects] = useState([]);
	const [selectedMenu, setSelectedMenu] = useState("1");

	return (
		<div className={styles.contentDisplay}>
			<div className={styles.titleBar}>
				<div className={styles.titleContainer}>
					<h2>Projects</h2>
				</div>
			</div>
			<Row>
				<ProjectTabs
					links={["ALL", "LIVE", "PENDING", "ARCHIVED"]}
					onClick={() => {
						// Fetch projects
					}}
				/>
			</Row>
			<Row style={{ marginTop: 20, marginLeft: 25 }}>
				<SearchBar />
			</Row>
			{/* <ProjectsDisplay isOwner={true}/> */}
		</div>
	);
}

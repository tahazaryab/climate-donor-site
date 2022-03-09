import { useEffect, useState } from "react";
import styles from "../../styles/Dashboard.module.css";
import SearchBar from "../SearchBar";
import ProjectTabs from "../ProjectTabs";
import { Dropdown, Layout, Row } from "antd";
import { getAllProjects } from "../../lib/firebase";
import ProjectCard from "../ProjectCard";

export default function Projects() {
	const [projects, setProjects] = useState([]);
	const [selectedMenu, setSelectedMenu] = useState("1");

	const getProjects = async () => {
		if (selectedMenu === "1") {
			let allProjects = await getAllProjects();
			setProjects(allProjects);
		}
	};

	useEffect(() => {
		getProjects();
	}, []);

	const getProject = (value) => {
		let project = { ...projects[value] };
		project.published = project.published.toDate().toLocaleDateString() + "";
		project.updated = project.updated.toDate().toLocaleDateString() + "";
		return project;
	};

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
					onClick={(index) => {
						setSelectedMenu(index + "");
					}}
				/>
			</Row>
			<div className={styles.resultsBox}>
				<div className={styles.scroll}>
					{projects && projects.length ? (
						projects.map((project, value) => {
							const singleProject = getProject(value);

							return (
								<Row key={value}>
									<ProjectCard key={value} project={singleProject} />
								</Row>
							);
						})
					) : (
						<div className={styles.noProject}>
							You have no projects to display.
						</div>
					)}
				</div>
			</div>
			{/* <ProjectsDisplay isOwner={true}/> */}
		</div>
	);
}
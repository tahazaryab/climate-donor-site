import { useEffect, useState } from "react";
import styles from "../../styles/Dashboard.module.css";
import SearchBar from "../SearchBar";
import ProjectTabs from "../ProjectTabs";
import { Dropdown, Layout, Row, Table } from "antd";
import { getAllProjects } from "../../lib/firebase";
import ProjectCard from "../ProjectCard";
import SimpleProjectCard from "../SimpleProjectCard";
import Link from "next/link";

function ProjectList(props) {
  let projects = props.projects;
  let getProject = props.getProject;

  return (
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
  );
}

function AdminProjectList(props) {
  let projects = props.projects;
  let getProject = props.getProject;

  let data = [];

  for (let i = 0; i < projects.length; i++) {
    let proj = getProject(i);
    data.push({
      key: i,
      name: proj.title,
      owner: proj.author,
      status: proj.status,
      last_action: proj.updated,
    });
  }

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 4,
      },
      render: (text, row, index) => <Link href={`/project/${getProject(parseInt(index)).id}`}>{text}</Link>
    },
    {
      title: 'Project Owner',
      dataIndex: 'owner',
      sorter: {
        compare: (a, b) => a.owner - b.owner,
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: {
        compare: (a, b) => a.status - b.status,
        multiple: 2,
      },
    },
    {
      title: 'Last Action',
      dataIndex: 'last_action',
      sorter: {
        compare: (a, b) => a.last_action - b.last_action,
        multiple: 1,
      },
    },
  ];

  return (
    <Table 
      columns={columns}
      dataSource={data}
      onRow={(record, rowIndex) => {
        return {
          onClick: event => console.log(data[rowIndex])
        };
      }}
    />
  );
}

export default function Projects(props) {
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
    if (typeof project.published === "object") {
      project.published =
        project?.published?.toDate().toLocaleDateString() + "";
    }
    if (typeof project.updated === "object") {
      project.updated = project?.updated?.toDate().toLocaleDateString() + "";
    }
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
      {props.userType === "admin" ? 
        <AdminProjectList 
          projects={projects}
          getProject={getProject}
        /> :
        <ProjectList
          projects={projects}
          getProject={getProject}
        />
      }
      {/* <ProjectsDisplay isOwner={true}/> */}
    </div>
  );
}

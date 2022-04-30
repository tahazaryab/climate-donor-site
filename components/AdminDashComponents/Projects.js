import { useEffect, useState } from "react";
import styles from "../../styles/Dashboard.module.css";
import SearchBar from "../SearchBar";
import ProjectTabs from "../ProjectTabs";
import { Dropdown, Layout, Row, Table } from "antd";
import { getAllProjects } from "../../lib/firebase";
import ProjectCard from "../ProjectCard";
import SimpleProjectCard from "../SimpleProjectCard";

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

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'name',
    },
    {
      title: 'Project Owner',
      dataIndex: 'owner',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: 'Last Action',
      dataIndex: 'last_action',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
  ];

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
  
  // const data = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     owner: 98,
  //     status: 60,
  //     last_action: 70,
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     owner: 98,
  //     status: 66,
  //     last_action: 89,
  //   },
  // ];

  return (
    <Table 
      columns={columns}
      dataSource={data}
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

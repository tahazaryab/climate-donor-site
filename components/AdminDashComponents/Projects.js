import { useEffect, useState } from "react";
import styles from "../../styles/Dashboard.module.css";
import SearchBar from "../SearchBar";
import ProjectTabs from "../ProjectTabs";
import { Row, Table } from "antd";
import { getAllProjects } from "../../lib/firebase";
import ProjectCard from "../ProjectCard";
import { withThemeCreator } from "@material-ui/styles";

const red = "#ff6262";
const yellow = "#ffff62";
const green = "#62ff62";

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

// from https://stackoverflow.com/questions/46240647/react-how-to-force-a-function-component-to-render
function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

function AdminProjectList(props) {
  let projects = props.projects;
  let getProject = props.getProject;
  let data = props.data;

  const [tempData, setTempData] = useState(data);
  const forceUpdate = useForceUpdate();

  const changeProjectStatus = (project, index, status) => {
    // TODO: set the status of this project to the value in the "status" variable in firebase

    // update the front end value
    // TODO: maybe a better way to rerender than forcing update
    let temp = data;
    temp[index].status = status;
    setTempData(temp);
    forceUpdate();
  }

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      render(text, row, index) {
        let color = red;
        if (data[index]?.status === "pending") 
          color = yellow;
        else if (data[index]?.status === "approved")
          color = green;
        
        return {
          props: {
            style: { background: color },
          },
          children:
            <div>
              {data[index].status === "pending" ? 
                <span>
                  <span
                    className={styles.projectRowButton}
                    onClick={() => changeProjectStatus(getProject(parseInt(index)), index, "approved")}
                  >
                    ✅
                  </span>
                  <span
                    className={styles.projectRowButton}
                    onClick={() => changeProjectStatus(getProject(parseInt(index)), index, "rejected")}
                  >
                    ❌
                  </span>
                </span> : 
                <span />
              }
              <a 
                target="_blank"
                href={`/project/${getProject(parseInt(index)).id}`}
                className={styles.projectLink}
              >
                {text}
              </a>
            </div>
        };
      }
    },
    {
      title: 'Project Owner',
      dataIndex: 'owner',
      render(text, row, index) {
        let color = red;
        if (data[index]?.status === "pending") 
          color = yellow;
        else if (data[index]?.status === "approved")
          color = green;
        return {
          props: {
            style: { background: color },
          },
          children: <span>{text}</span>
        }
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render(text, row, index) {
        let color = red;
        if (data[index]?.status === "pending") 
          color = yellow;
        else if (data[index]?.status === "approved")
          color = green;
        return {
          props: {
            style: { background: color },
          },
          children: <span>{text}</span>
        }
      }
    },
    {
      title: 'Last Action',
      dataIndex: 'last_action',
      render(text, row, index) {
        let color = red;
        if (data[index]?.status === "pending") 
          color = yellow;
        else if (data[index]?.status === "approved")
          color = green;
        return {
          props: {
            style: { background: color },
          },
          children: <span>{text}</span>
        }
      }
    },
  ];

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

  let tableData = [];
  for (let i = 0; i < projects.length; i++) {
    let proj = getProject(i);
    tableData.push({
      key: i,
      name: proj.title,
      owner: proj.author,
      status: proj.status,
      last_action: proj.updated,
    });
  }

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
          data={tableData}
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

import { useEffect, useState } from "react";
import styles from "../../styles/Dashboard.module.css";
import ProjectTabs from "../ProjectTabs";
import { Row, Table, Col, Select } from "antd";
import { getAllProjects, updateStatus, getAllUsers } from "../../lib/firebase";
import ProjectCard from "../ProjectCard";


const { Option } = Select;

const red = "#fa1414";
const orange = "#f08b2e";
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
function useForceUpdate() {
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
    console.log(status);
    updateStatus(project.id, status);
    setTempData(temp);
    forceUpdate();
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`);

  };


  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      render(text, row, index) {
        // let color = red;
        // if (data[index]?.status === "pending")
        //   color = yellow;
        // else if (data[index]?.status === "approved")
        //   color = green;

        return {
          props: {
            style: { background: 'white' },
          },
          children:
            <div>

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
      title: 'Project Owner Email',
      dataIndex: 'owner',
      render(text, row, index) {
        // let color = red;
        // if (data[index]?.status === "pending")
        //   color = yellow;
        // else if (data[index]?.status === "approved")
        //   color = green;
        return {
          props: {
            style: { background: 'white' },
          },
          children:
            <>
              <span>{text}</span>
            </>
        }
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render(text, row, index) {
        let color = red;
        if (data[index]?.status === "pending")
          color = orange;
        else if (data[index]?.status === "approved")
          color = green;
        return {
          props: {
            style: { background: 'white' },
            statusDot: { background: 'red', height: '10px', width: '10px' },
            check: { color: 'green' }
          },
          children:
            <>
              <Row>
                <Col span={3}>
                  <div style={{ backgroundColor: color, height: '8px', width: '8px', borderRadius: '20px' }}></div>
                </Col>
                <Col span={3}>
                  {
                    data[index].status === "pending" ?
                      <Select
                        defaultValue="pending"
                        style={{
                          width: 120,
                        }}
                        onChange={(value) => changeProjectStatus(getProject(parseInt(index)), index, value)}
                      >
                        <Option value="approved">Approved</Option>
                        <Option value="rejected">Rejected</Option>
                        <Option value="pending">Pending</Option>

                      </Select>
                      :
                      data[index].status === "approved" ?

                        <Select
                          defaultValue="approved"
                          style={{
                            width: 120,
                          }}
                          onChange={(value) => changeProjectStatus(getProject(parseInt(index)), index, value)}
                        >
                          <Option value="approved">Approved</Option>
                          <Option value="rejected">Rejected</Option>
                          <Option value="pending">Pending</Option>

                        </Select>
                        :
                        data[index].status === "rejected" ?

                          <Select
                            defaultValue="rejected"
                            style={{
                              width: 120,
                            }}
                            onChange={(value) => changeProjectStatus(getProject(parseInt(index)), index, value)}
                          >
                            <Option value="approved">Approved</Option>
                            <Option value="rejected">Rejected</Option>
                            <Option value="pending">Pending</Option>

                          </Select>
                          :
                          <span />
                  }

                </Col>

              </Row>

            </>
        }
      }
    },
    {
      title: 'Last Action',
      dataIndex: 'last_action',
      render(text, row, index) {
        // let color = red;
        // if (data[index]?.status === "pending")
        //   color = yellow;
        // else if (data[index]?.status === "approved")
        //   color = green;
        return {
          props: {
            style: { background: 'white' },
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
  const [users, setUsers] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(1);



  const getProjects = async () => {

    let allUsers = await getAllUsers();
    setUsers(allUsers);

    if (selectedMenu === 1) {
      let allProjects = await getAllProjects();
      setProjects(allProjects);
    }
    else if (selectedMenu === 2) {
      let allProjects = await getAllProjects();
      setProjects(allProjects.filter(project => project.status === 'approved'));
    }
    else if (selectedMenu === 3) {
      let allProjects = await getAllProjects();
      setProjects(allProjects.filter(project => project.status === 'pending'));
    }
    else if (selectedMenu === 4) {
      let allProjects = await getAllProjects();
      setProjects(allProjects.filter(project => project.status === 'archived'));
    }
    else if (selectedMenu === 5) {
      let allProjects = await getAllProjects();
      setProjects(allProjects.filter(project => project.status === 'rejected'));
    }

  };

  useEffect(() => {
    getProjects();
  }, [projects]);

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
      owner: users.find(user => user.id === proj.ownerId).email,
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
          links={["ALL", "APPROVED", "PENDING", "ARCHIVED", "REJECTED"]}
          onClick={(index) => {
            setSelectedMenu(index);
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

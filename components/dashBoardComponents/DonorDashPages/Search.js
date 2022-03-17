import { Row, Col, Button } from "antd";
import React, { useState, useEffect } from "react";
import SearchBar from "../../../components/SearchBar";
import FilterBar from "../../../components/FilterBar";
import SmallProjectCard from "../../../components/SmallProjectCard";
import ProjectCard from "../../../components/ProjectCard";
import styles from "../../../styles/Dashboard.module.css";

import { getSearchProjects } from "../../../lib/firebase";
import { useAuthUser } from "next-firebase-auth";

const Search = () => {
  const AuthUser = useAuthUser();
  const [searchLoc, setSearchLoc] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [searchCat, setSearchCat] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showFilter, setShowFilter] = useState(true);

  const getProjects = async () => {
    let recommended = await getSearchProjects(searchKey, searchCat, searchLoc);
    setProjects(recommended);
  };

  useEffect(() => {
    getProjects();
  }, [searchCat, searchKey, searchLoc]);

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
        <h2>Search</h2>
      </div>
      <SearchBar
        width={1092}
        defaultTerm={"projects"}
        marginLeft={26}
        marginTop={0}
        onSearch={setSearchKey}
      />
      <div className={styles.resultsBox}>
        <div className={styles.resultsBoxTitle}>
          <Row>
            {showFilter ? (
              <h2 className={styles.filterTitle}> Filter By</h2>
            ) : null}
            <h2 className={styles.numResultsTitle}>
              <Row>
                {" "}
                {projects.length} Result(s)
                {showFilter ? (
                  <>
                    <div style={{ width: 550 }} />
                    <Button
                      onClick={() => setShowFilter(false)}
                      style={{ borderWidth: 0, color: "#048A81" }}
                    >
                      FILTER
                    </Button>
                  </>
                ) : (
                  <>
                    <div style={{ width: 859 }} />
                    <Button
                      onClick={() => setShowFilter(true)}
                      style={{ borderWidth: 0, marginRight: 40 }}
                    >
                      FILTER
                    </Button>
                  </>
                )}
              </Row>
            </h2>
          </Row>
        </div>
        <Row>
          {" "}
          {showFilter ? (
            <FilterBar
              onSearchCat={setSearchCat}
              onSearchKey={setSearchKey}
              onSearchLoc={setSearchLoc}
            />
          ) : null}
          <Col>
            <div className={styles.scroll}>
              {projects && projects.length
                ? projects.map((project, value) => {
                    const singleProject = getProject(value);

                    return (
                      <>
                        {" "}
                        {showFilter ? (
                          <SmallProjectCard
                            key={value}
                            project={singleProject}
                          />
                        ) : (
                          <ProjectCard key={value} project={singleProject} />
                        )}{" "}
                      </>
                    );
                  })
                : null}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Search;

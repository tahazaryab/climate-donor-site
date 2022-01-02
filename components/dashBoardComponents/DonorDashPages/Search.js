import { Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import ProjectTabs from "../../../components/ProjectTabs";
import SearchBar from "../../../components/SearchBar";
import FilterBar from "../../../components/FilterBar";
import SmallProjectCard from "../../../components/SmallProjectCard";
import styles from "../../../styles/Dashboard.module.css";

import { getSearchProjects } from "../../../lib/firebase";
import { useAuthUser } from "next-firebase-auth";

const Search = () => {
  const AuthUser = useAuthUser();
  const [searchLoc, setSearchLoc] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [searchCat, setSearchCat] = useState([""]);
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    console.log(searchLoc + " " + searchCat + " " + searchKey);
    let recommended = await getSearchProjects(searchLoc, searchCat, searchKey);
    setProjects(recommended);
  };

  const setSearchCatHelper = (value) => {
    value.length == 0 ? setSearchCat([""]) : setSearchCat(value);
  };

  useEffect(() => {
    getProjects();
  }, [searchCat, searchKey, searchLoc]);

  const getProject = (value) => {
    let project = { ...projects[value] };
    project.published = project.published.toDate().toLocaleDateString() + "";
    project.updated = project.updated.toDate().toLocaleDateString() + "";
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
            <h2 className={styles.filterTitle}> Filter By</h2>
            <h2 className={styles.numResultsTitle}>
              {" "}
              {projects.length} Result(s)
            </h2>
          </Row>
        </div>
        <Row>
          <FilterBar
            onSearchCat={setSearchCatHelper}
            onSearchKey={setSearchKey}
            onSearchLoc={setSearchLoc}
          />
          <Col>
            <div className={styles.scroll}>
              {projects && projects.length ? (
                projects.map((project, value) => {
                  const singleProject = getProject(value);

                  return (
                    <SmallProjectCard key={value} project={singleProject} />
                  );
                })
              ) : (
                <div className={styles.noProject}>No Projects</div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Search;

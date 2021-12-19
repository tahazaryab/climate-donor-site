import styles from "../styles/ProjectTabs.module.css";
import React, { useState, useEffect } from "react";
import { Button } from "antd";

const ProjectTabs = ({ links, onClick }) => {
  const [selectedTab, setSelectedTab] = useState("0");

  return (
    <div className={styles.projectTabs}>
      {links.map((link, index) => (
        <Button
          key={index}
          type="link"
          onClick={() => {
            setSelectedTab(index);
            onClick(index + 1);
          }}
          className={
            index == selectedTab ? styles.tabbuttonSelected : styles.tabbutton
          }
        >
          {link}
        </Button>
      ))}
    </div>
  );
};

export default ProjectTabs;

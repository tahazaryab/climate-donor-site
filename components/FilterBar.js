import React from "react";
import "antd/dist/antd.css";
import { Menu } from "antd";
import styles from "../styles/FilterBar.module.css";
import SearchBar from "./SearchBar";

const FilterBar = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.location}>
        {" "}
        <h3 className={styles.title}> Location </h3>{" "}
        <SearchBar
          width={280}
          defaultTerm={"location"}
          marginLeft={14}
          marginTop={2}
        />
      </div>
      <div className={styles.category}>
        <h3 className={styles.title}> Category </h3>
      </div>
      <div className={styles.keyword}>
        <h3 className={styles.title}> Keyword </h3>
        <SearchBar
          width={280}
          defaultTerm={"keyword"}
          marginLeft={14}
          marginTop={2}
        />
      </div>
      <div className={styles.status}>
        <h3 className={styles.title}>Status </h3>
      </div>
    </div>
  );
};

export default FilterBar;

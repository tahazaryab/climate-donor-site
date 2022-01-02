import React, { Component } from "react";
import "antd/dist/antd.css";
import { Menu, Space, Checkbox, Row, Button } from "antd";
import styles from "../styles/FilterBar.module.css";
import SearchBar from "./SearchBar";

const onChange = (checked) => console.log(checked);

const options = [
  { label: "Agricultural Innovation", value: "ai" },
  { label: "Market Research", value: "mr" },
  { label: "Environment", value: "e" },
  { label: "Academic Research", value: "ar" },
  { label: "National Laboratory Research", value: "nlr" },
  { label: "Grant Proposal Funding", value: "gpf" },
  { label: "Transportation", value: "t" },
  { label: "Limiting Deforestation", value: "ld" },
  { label: "Clean Energy", value: "ce" },
  { label: "Coastal Inhabitants", value: "ci" },
  { label: "Home and office energy usage", value: "haoeu" },
];

class FilterBar extends Component {
  state = {
    category: false,
    location: false,
    keyword: false,
    status: false,
  };
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.location}>
          <h3 className={styles.title}> Location </h3>{" "}
          <SearchBar
            width={280}
            defaultTerm={"location"}
            marginLeft={14}
            marginTop={2}
          />
        </div>
        <div className={styles.category}>
          <h3 className={styles.title}>
            <Row>
              Category <div style={{ width: 170 }} />{" "}
              {this.state.category ? (
                <Button
                  style={{ borderWidth: 0 }}
                  onClick={() => {
                    this.setState({ category: false });
                  }}
                >
                  x
                </Button>
              ) : (
                <Button
                  style={{ borderWidth: 0 }}
                  onClick={() => {
                    this.setState({ category: true });
                  }}
                >
                  {" "}
                  +
                </Button>
              )}
            </Row>
          </h3>
          {this.state.category ? (
            <div style={{ margin: 20 }}>
              <Checkbox.Group options={options} onChange={onChange} />
              <div style={{ height: 10 }}> </div>
            </div>
          ) : null}
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
          <Row style={{ marginLeft: 40 }}>
            <Button>All</Button>
            <Button>Active</Button>
            <Button>Completed</Button>
          </Row>
        </div>
      </div>
    );
  }
}
export default FilterBar;

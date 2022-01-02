import React, { Component } from "react";
import "antd/dist/antd.css";
import { Menu, Space, Checkbox, Row, Button } from "antd";
import styles from "../styles/FilterBar.module.css";
import SearchBar from "./SearchBar";
import { Input } from "antd";

const { Search } = Input;

const options = [
  { label: "Agricultural Innovation", value: "Agricultural Innovation" },
  { label: "Market Research", value: "Market Research" },
  { label: "Environment", value: "Environment" },
  { label: "Academic Research", value: "Academic Research" },
  {
    label: "National Laboratory Research",
    value: "National Laboratory Research",
  },
  { label: "Grant Proposal Funding", value: "Grant Proposal Funding" },
  { label: "Transportation", value: "Transportation" },
  { label: "Limiting Deforestation", value: "Limiting Deforestation" },
  { label: "Clean Energy", value: "Clean Energy" },
  { label: "Coastal Inhabitants", value: "Coastal Inhabitants" },
  {
    label: "Home and office energy usage",
    value: "Home and office energy usage",
  },
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
          <Search
            placeholder="Search location"
            size="default"
            onSearch={this.props.onSearchLoc}
            style={{ marginLeft: 14, marginTop: 2, width: 280 }}
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
                  +
                </Button>
              )}
            </Row>
          </h3>
          {this.state.category ? (
            <div style={{ margin: 20 }}>
              <Checkbox.Group
                options={options}
                onChange={this.props.onSearchCat}
              />
              <div style={{ height: 10 }}> </div>
            </div>
          ) : null}
        </div>
        <div className={styles.keyword}>
          <h3 className={styles.title}> Keyword </h3>
          <Search
            placeholder="Search location"
            size="default"
            onSearch={this.props.onSearchKey}
            style={{ marginLeft: 14, marginTop: 2, width: 280 }}
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

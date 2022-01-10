import React from "react";
import "antd/dist/antd.css";
import { Input } from "antd";

const { Search } = Input;

const SearchBar = ({ width, defaultTerm, marginLeft, marginTop, onSearch }) => {
  return (
    <Search
      placeholder={"Search " + defaultTerm}
      size="default"
      onSearch={onSearch}
      style={{ marginLeft: marginLeft, marginTop: marginTop, width: width }}
    />
  );
};

export default SearchBar;

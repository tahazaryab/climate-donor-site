import React from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';

const { Search } = Input;

const onSearch = value => console.log(value);

const SearchBox = () =>{
    return(
        <Search
            placeholder="Search Projects"
            size="large"
            onSearch={onSearch}
            style={{ float: "right", margin: "25px" }}
        />
    )
    
}
    
export default SearchBox
  
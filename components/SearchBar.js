import React from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';

const { Search } = Input;

const onSearch = value => console.log(value);

const SearchBox = () =>{
    return(
        <Search
            placeholder="Search projects"
            size="default"
            onSearch={onSearch}
            style={{ width: 250 }} 
        />
    )
    
}
    
export default SearchBox
  
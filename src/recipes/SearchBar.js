import React, {useState} from 'react';


const SearchBar = (props) => {



  const handleChange = (e) => {
    searchSpace(e)
  }

  const searchSpace = (event) => {
    let keyword = event.target.value;
    props.setSearch(keyword)
  }

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Enter item to be searched" 
        onChange={handleChange}
        value={props.search} />
    </div>
  )
}

export default SearchBar;
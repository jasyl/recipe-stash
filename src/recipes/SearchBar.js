import React from 'react';
// import { XCircle } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form'
import ClearIcon from '@material-ui/icons/Clear';

const SearchBar = (props) => {

  const handleChange = (e) => {
    searchSpace(e)
  }

  const searchSpace = (event) => {
    let keyword = event.target.value;
    props.setSearch(keyword)
  }

  const handleClickCancel = () => {
    props.setSearch("");
  }

  return (

    <Form className="search-bar">
      <Form.Group controlId="formBasicSearch" className="search-bar__content">
        <Form.Control 
          type="search" 
          value={props.search} 
          placeholder="Search your Recipe Library..."
          onChange={handleChange} 
        />
        <ClearIcon className="search-cancel" onClick={handleClickCancel} />
      </Form.Group>
    </Form>
  )
}

export default SearchBar;

import React from 'react';
import { XCircle } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form'


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
        <XCircle className="search-cancel" onClick={handleClickCancel} />
      </Form.Group>
    </Form>
    // <div className="search-bar">
    //   <input 
    //     type="text" 
    //     placeholder="Search..." 
    //     onChange={handleChange}
    //     value={props.search} />
    //     <XCircle className="search-cancel" onClick={handleClickCancel} />
    // </div>
  )
}

export default SearchBar;

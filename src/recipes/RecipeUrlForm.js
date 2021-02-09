import React, {useState} from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const RecipeUrlForm = (props) => {
  
  const [url, setUrl] = useState('');

  const handleChange = (e) => {
    const {value} = e.target;
    setUrl(value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${API_BASE_URL}/recipes`, null, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` }, params: {"url": url}  }) 
      .then(response => {
        console.log(response);
        setUrl('');
        props.reFetchRecipes(); 
      })
      .catch(error => {
        console.log(error);
      });
      props.setShow(false)
  }

  const handleClose = () => props.setShow(false);

  return (
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <input name='recipeUrl' type='text' placeholder='Recipe Url' onChange={handleChange} value={url} />
    //     <button>Add Recipe</button>
    //   </form>
    // </div>

    <>
    {/* <Button variant="primary" onClick={handleShow}>
      URL
    </Button> */}

    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Recipe</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <input name='recipeUrl' type='text' placeholder='Recipe Url' onChange={handleChange} value={url} />
        <button>Add Recipe</button>
      </form>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* <Button variant="primary" onClick={handleClose}>
          Add Recipe
        </Button> */}
        </Modal.Footer>

    </Modal>
  </>
  )
}

export default RecipeUrlForm;


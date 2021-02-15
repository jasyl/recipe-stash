import React, {useState} from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

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
        props.setMessage({message: 'Recipe Added!', type: 'success'})
      })
      .catch(error => {
        console.log(error.response);
        props.setMessage({message: (error.response.data.message || 'sorry, unable to add recipe'), type: 'error'})
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

    <Modal show={props.show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Recipe</Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Control name='recipeUrl' type='text' placeholder='Recipe Url' onChange={handleChange} value={url} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type='submit'>Add Recipe</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  </>
  )
}

export default RecipeUrlForm;


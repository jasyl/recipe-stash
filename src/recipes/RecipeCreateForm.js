import React, {useState} from 'react';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { Col, Button, Modal } from "react-bootstrap";
import { API_BASE_URL } from '../constants';
import axios from 'axios';

const RecipeCreateForm = (props)=> {
  const [recipe, setRecipe] = useState(
    {
      title: '',
      readyInMinutes: '',
      img: '',
      servings: '',
      instructions: ''
    }
  );
  const [ingredients, setIngredients] = useState('');

  const handleClose = () => props.setShow(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    const recipeCopy = {...recipe}
    recipeCopy[name] = value
    setRecipe(recipeCopy)
    console.log(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`${API_BASE_URL}/ingredients`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` }, params: {"ingredients" : ingredients} }) 
    .then(response => {
      recipe.ingredients = response.data
      props.setMessage({message: 'Recipe Added!', type: 'success'})
      axios.post(`${API_BASE_URL}/recipes`, recipe, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } }) 
      .then(response => {
        props.reFetchRecipes();
        props.setMessage({message: 'Recipe Added!', type: 'success'})
      })
      .catch(error => {
        props.setMessage({message: error.response.data.message || 'sorry, unable to retrieve recipes', type: 'error'})
      })
    })
    .catch(error => {
      props.setMessage({message: error.response.data.message || 'sorry, unable to add recipe', type: 'error'})
    })
    props.setShow(false);
  }

  const handleIngredientChange = (e) => {
    const {value} = e.target
    setIngredients(value)
  }


  return (
    <Modal show={props.show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add Recipe</Modal.Title>
    </Modal.Header>

        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik01">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={recipe.title}
                onChange={handleChange}

              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="3" controlId="validationFormik02">
              <Form.Label>Total Time</Form.Label>
              <InputGroup>
              <Form.Control
                type="text"
                aria-describedby="minutesAppend"
                placeholder="30"
                name="readyInMinutes"
                value={recipe.readyInMinutes}
                onChange={handleChange}
              />
              <InputGroup.Append>
                <InputGroup.Text id="minutesAppend">mins</InputGroup.Text>
              </InputGroup.Append>

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormikUsername">
              <Form.Label>Servings</Form.Label>
                <Form.Control
                  type="text"
                  name="servings"
                  value={recipe.servings}
                  onChange={handleChange}
                />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik01">
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image URL"
                name="img"
                value={recipe.img}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>Ingredients (each ingredient on its own line)</Form.Label>
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                placeholder="Ingredients"
                name="ingredients"
                value={ingredients}
                onChange={handleIngredientChange}
              />

            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik04">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                // placeholder="Instructions"
                name="instructions"
                value={recipe.instructions}
                onChange={handleChange}

              />
            </Form.Group>
          </Form.Row>
          <Button type="submit">Submit form</Button>
        </Form>
      

  </Modal>
  )

}

export default RecipeCreateForm;
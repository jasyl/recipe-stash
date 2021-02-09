import React, {useState} from 'react';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { Col, Button, Modal } from "react-bootstrap";
import { API_BASE_URL } from '../constants';
import axios from 'axios';
var Fraction = require('fraction.js');

const RecipeCreateForm = (props)=> {

  // convert ingredient JSON
  let ingredientList = '';
  props.recipe.ingredients.forEach((item) => {
    ingredientList += `${new Fraction(item.qty).toFraction(true)} ${item.unit} ${item.ingredient}\n`
  })
  
  const [recipe, setRecipe] = useState(props.recipe);
  const [ingredients, setIngredients] = useState(ingredientList);

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
      console.log(response);
      recipe.ingredients = response.data
      axios.put(`${API_BASE_URL}/recipes/${recipe.id}`, recipe, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } }) 
      .then(response => {
        props.reFetchRecipes();
        props.history.go(0);
      })
      .catch(error => {
        console.log(error);
      })
        
    })
    .catch(error => {
      console.log(error);
    })
    props.setShow(false);
    // send request a get request to get the ingredients
    // Once i have the ingredients replace them in recipe
    // make put request to backend to update ingredients
    // when i get the response i want to close the modal & refresh the page? 
    // not sure that will update the thing, i may have to refetch recipes again. 

  }

  const handleIngredientChange = (e) => {
    const {value} = e.target
    console.log(value);
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
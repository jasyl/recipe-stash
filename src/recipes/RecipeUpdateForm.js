import React, { useState} from 'react';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { Col, Button, Modal } from "react-bootstrap";
import { API_BASE_URL } from '../constants';
import axios from 'axios';
import './RecipeForm.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
var Fraction = require('fraction.js');

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    },
  },
}));

const RecipeUpdateForm = (props)=> {

  const classes = makeStyles();

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
        props.setMessage({message: `${recipe.title} successfully updated`, type: 'success'})
      })
      .catch(error => {
        console.log(error);
        props.setMessage({message: error.message || `Something went wrong, unable to update ${recipe.title}`, type: 'error'})
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
    <Modal show={props.show} onHide={handleClose} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Edit Recipe</Modal.Title>
    </Modal.Header>
    

        <form noValidate onSubmit={handleSubmit} className='manual-form'>

        <Modal.Body>

              <TextField
                id='title-text-input'
                label='Recipe Title'
                type="text"
                placeholder="Title"
                name="title"
                value={recipe.title}
                onChange={handleChange}
                fullWidth
                variant='outlined'
              />

              <TextField
                id='time-text-input'
                label='Total Time'
                type="text"
                aria-describedby="minutesAppend"
                placeholder="30"
                name="readyInMinutes"
                value={recipe.readyInMinutes}
                onChange={handleChange}
                variant='outlined'
              />

              <TextField
                id='servings-text-input'
                label='Number of Servings'
                placeholder="2"
                type="text"
                name="servings"
                value={recipe.servings}
                onChange={handleChange}
                variant="outlined"
              />

              <TextField
                id='image-url-text-input'
                type="text"
                label='Image URL'
                placeholder="Image URL"
                name="img"
                value={recipe.img}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />

              <TextField
                id="ingredients-text-field"
                label="Ingredients (1 ingredient per line)"
                multiline
                name="ingredeints"
                value={ingredients}
                onChange={handleIngredientChange}
                fullWidth
                variant="outlined"
              />

              <TextField
                id="instructions-text-field"
                label="Instructions"
                name="instructions"
                multiline
                value={recipe.instructions}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />

          </Modal.Body>
          <Modal.Footer>
          <Button type="submit">Submit form</Button>
          </Modal.Footer>
        </form>
        
      

  </Modal>
  )

}

export default RecipeUpdateForm;
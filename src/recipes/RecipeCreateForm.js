import React, {useState} from 'react';
import { Button, Modal } from "react-bootstrap";
import { API_BASE_URL } from '../constants';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

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
    <Modal show={props.show} onHide={handleClose} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Add Recipe</Modal.Title>
    </Modal.Header>

        <form noValidate onSubmit={handleSubmit} className='create-form'>

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
                label='Total Time in Minutes'
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

export default RecipeCreateForm;
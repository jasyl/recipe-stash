import React from 'react';
import { Button, Modal } from "react-bootstrap";
import { API_BASE_URL } from '../constants';
import axios from 'axios';
import './RecipeForm.css';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
var Fraction = require('fraction.js');


const validationSchema = yup.object({
  title: yup
    .string('Enter recipe title')
    .required('Title is required'),
  instructions: yup
    .string('Add Instructions')
    .required('Instructions are required'),
  ingredients: yup
    .string('Add Ingredients')
    .required('Ingredients are required'),
  readyInMinutes: yup
    .number('Must be a number'),
  servings : yup
    .number('Must be a number')
});



const RecipeUpdateForm = (props)=> {



  // convert ingredient JSON
  const convertIngredientToString = (ingredients) => {
    let ingredientList = '';
    ingredients.forEach((item) => {
      ingredientList += `${new Fraction(item.qty).toFraction(true)} ${item.unit} ${item.ingredient}\n`
    })
    return ingredientList
  }
  
  // const [recipe, setRecipe] = useState(props.recipe);
  // const [ingredients, setIngredients] = useState(ingredientList);

  const formik = useFormik({
    initialValues: {
      title: props.recipe.title,
      readyInMinutes: props.recipe.readyInMinutes,
      img: props.recipe.img,
      servings: props.recipe.servings,
      ingredients: convertIngredientToString(props.recipe.ingredients),
      instructions: props.recipe.instructions
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values.ingredients);

      axios.get(`${API_BASE_URL}/ingredients`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` }, params: {"ingredients" : values.ingredients} }) 
      .then(response => {
        
        const recipe = values
        recipe.ingredients = response.data
        axios.put(`${API_BASE_URL}/recipes/${props.recipe.id}`, recipe, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } }) 
        .then(response => {
          props.reFetchRecipes();
          props.setMessage({message: `${recipe.title} successfully updated`, type: 'success'})
        })
        .catch(error => {
          props.setMessage({message: error.response.data.message || `Something went wrong, unable to update ${recipe.title}`, type: 'error'})
        })
          
      })
      .catch(error => {
        props.setMessage({message: error.response.data.message || `Something went wrong, unable to parse recipes`, type: 'error'})
      })
      props.setShow(false);
  },
});

  const handleClose = () => props.setShow(false);

  return (
    <Modal show={props.show} onHide={handleClose} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Edit Recipe</Modal.Title>
    </Modal.Header>
  
        <form noValidate onSubmit={formik.handleSubmit} className='manual-form'>

        <Modal.Body>

              <TextField
                fullWidth
                variant='outlined'
                id='title-text-input'
                label='Recipe Title'
                type="text"
                placeholder="Title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />

              <TextField
                id='time-text-input'
                label='Total Time in Minutes'
                type="text"
                aria-describedby="minutesAppend"
                placeholder="30"
                name="readyInMinutes"
                value={formik.values.readyInMinutes}
                onChange={formik.handleChange}
                error={formik.touched.readyInMinutes && Boolean(formik.errors.readyInMinutes)}
                helperText={formik.touched.readyInMinutes && formik.errors.readyInMinutes}
                variant='outlined'
              />

              <TextField
                id='servings-text-input'
                label='Number of Servings'
                placeholder="2"
                type="text"
                name="servings"
                value={formik.values.servings}
                onChange={formik.handleChange}
                error={formik.touched.servings && Boolean(formik.errors.servings)}
                helperText={formik.touched.servings && formik.errors.servings}
                variant="outlined"
              />

              <TextField
                id='image-url-text-input'
                type="text"
                label='Image URL'
                placeholder="Image URL"
                name="img"
                value={formik.values.img}
                onChange={formik.handleChange}
                error={formik.touched.img && Boolean(formik.errors.img)}
                helperText={formik.touched.img && formik.errors.img}
                variant="outlined"
                fullWidth
              />

              <TextField
                id="ingredients-text-field"
                label="Ingredients (1 ingredient per line)"
                multiline
                name="ingredients"
                value={formik.values.ingredients}
                onChange={formik.handleChange}
                error={formik.touched.ingredients && Boolean(formik.errors.ingredients)}
                helperText={formik.touched.ingredients && formik.errors.ingredients}
                fullWidth
                variant="outlined"
              />

              <TextField
                id="instructions-text-field"
                label="Instructions"
                name="instructions"
                multiline
                value={formik.values.instructions}
                onChange={formik.handleChange}
                error={formik.touched.instructions && Boolean(formik.errors.instructions)}
                helperText={formik.touched.instructions && formik.errors.instructions}
                fullWidth
                variant="outlined"
              />

          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          <Button type="submit">Save</Button>
          </Modal.Footer>
        </form>

  </Modal>
  )

}

export default RecipeUpdateForm;


import React, {useState} from 'react';
import { Button, Modal } from "react-bootstrap";
import { API_BASE_URL } from '../constants';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';

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

const RecipeCreateForm = (props)=> {
  const formik = useFormik({
    initialValues: {
      title: '',
      readyInMinutes: '30',
      img: '',
      servings: '2',
      ingredients: '',
      instructions: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);

      axios.get(`${API_BASE_URL}/ingredients`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` }, params: {"ingredients" : values.ingredients} }) 
      .then(response => {

        const recipe = values
        recipe.ingredients = response.data
        // props.setMessage({message: 'Recipe Added!', type: 'success'})

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
        console.log(error);
        // props.setMessage({message: error.response.data.message || 'sorry, unable to add recipe', type: 'error'})
      })
      props.setShow(false);
  },
});

  // const [recipe, setRecipe] = useState(
  //   {
  //     title: '',
  //     readyInMinutes: '30',
  //     img: '',
  //     servings: '2',
  //     ingredients: '',
  //     instructions: ''
  //   }
  // );
  // const [ingredients, setIngredients] = useState('');

  const handleClose = () => props.setShow(false);

  // const handleChange = (e) => {
  //   const {name, value} = e.target;
  //   const recipeCopy = {...recipe}
  //   recipeCopy[name] = value
  //   setRecipe(recipeCopy)
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.get(`${API_BASE_URL}/ingredients`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` }, params: {"ingredients" : ingredients} }) 
  //   .then(response => {
  //     recipe.ingredients = response.data
  //     props.setMessage({message: 'Recipe Added!', type: 'success'})
  //     axios.post(`${API_BASE_URL}/recipes`, recipe, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } }) 
  //     .then(response => {
  //       props.reFetchRecipes();
  //       props.setMessage({message: 'Recipe Added!', type: 'success'})
  //     })
  //     .catch(error => {
  //       props.setMessage({message: error.response.data.message || 'sorry, unable to retrieve recipes', type: 'error'})
  //     })
  //   })
  //   .catch(error => {
  //     props.setMessage({message: error.response.data.message || 'sorry, unable to add recipe', type: 'error'})
  //   })
  //   props.setShow(false);
  // }

  // const handleIngredientChange = (e) => {
  //   const {value} = e.target
  //   setIngredients(value)
  // }


  return (
    <Modal show={props.show} onHide={handleClose} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Add Recipe</Modal.Title>
    </Modal.Header>

        <form noValidate onSubmit={formik.handleSubmit} className='create-form'>

          <Modal.Body>

          <TextField
                id='title-text-input'
                label='Recipe Title'
                type="text"
                placeholder="Title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                fullWidth
                variant='outlined'
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
                variant='outlined'
                error={formik.touched.readyInMinutes && Boolean(formik.errors.readyInMinutes)}
                helperText={formik.touched.readyInMinutes && formik.errors.readyInMinutes}
              />

              <TextField
                id='servings-text-input'
                label='Number of Servings'
                placeholder="2"
                type="text"
                name="servings"
                value={formik.values.servings}
                onChange={formik.handleChange}
                variant="outlined"
                error={formik.touched.servings && Boolean(formik.errors.servings)}
                helperText={formik.touched.servings && formik.errors.servings}

              />

              <TextField
                id='image-url-text-input'
                type="text"
                label='Image URL'
                placeholder="Image URL"
                name="img"
                value={formik.values.img}
                onChange={formik.handleChange}
                variant="outlined"
                fullWidth

                error={formik.touched.img && Boolean(formik.errors.img)}
                helperText={formik.touched.img && formik.errors.img}
              />

              <TextField
                id="ingredients-text-field"
                label="Ingredients (1 ingredient per line)"
                multiline
                name="ingredients"
                value={formik.values.ingredients}
                onChange={formik.handleChange}
                fullWidth
                variant="outlined"
                error={formik.touched.ingredients && Boolean(formik.errors.ingredients)}
                helperText={formik.touched.ingredients && formik.errors.ingredients}
              />

              <TextField
                id="instructions-text-field"
                label="Instructions"
                name="instructions"
                multiline
                value={formik.values.instructions}
                onChange={formik.handleChange}
                fullWidth
                variant="outlined"
                error={formik.touched.instructions && Boolean(formik.errors.instructions)}
                helperText={formik.touched.instructions && formik.errors.instructions}
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

export default RecipeCreateForm;
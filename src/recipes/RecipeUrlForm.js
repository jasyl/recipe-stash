import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  url: yup
    .string('Enter recipe URL')
    .matches(
      /((https?):\/\/)(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9\-#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
  )
  .required('Please enter url'),
});

const RecipeUrlForm = (props) => {

  const formik = useFormik({
    initialValues: {
      url: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);

      axios.post(`${API_BASE_URL}/recipes`, null, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` }, params: {"url": values.url}  }) 
        .then(response => {
          // setUrl('');
          props.reFetchRecipes(); 
          props.setMessage({message: 'Recipe Added!', type: 'success'})
        })
        .catch(error => {
          console.log(error);
          props.setMessage({message: (error.response.data.message || 'sorry, unable to add recipe'), type: 'error'});
          // setUrl('');
        });
        props.setShow(false)
    },
  });

  const handleClose = () => props.setShow(false);

  return (

    <Modal show={props.show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Recipe</Modal.Title>
      </Modal.Header>
      
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <TextField
                  id='url-text-input'
                  type="text"
                  label='Recipe URL'
                  name="url"
                  value={formik.values.url}
                  onChange={formik.handleChange}
                  variant="outlined"
                  fullWidth
                  error={formik.touched.url && Boolean(formik.errors.url)}
                  helperText={formik.touched.url && formik.errors.url}
                />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type='submit'>Save</Button>
        </Modal.Footer>
      </form>
    </Modal>

  )
}

export default RecipeUrlForm;


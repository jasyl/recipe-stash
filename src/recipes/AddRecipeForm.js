import React, {useState} from 'react';
import axios from 'axios';
import { addExternalRecipe } from '../util/APIUtils';

const AddRecipeForm = (props) => {
  const [url, setUrl] = useState('');

  const handleChange = (e) => {
    const {value} = e.target;
    setUrl(value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    addExternalRecipe(url)
      .then(response => {
        // props.setRecipes(response);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name='recipeUrl' type='text' placeholder='Recipe Url' onChange={handleChange} />
        <button>Add Recipe</button>
      </form>
    </div>
  )
}

export default AddRecipeForm;


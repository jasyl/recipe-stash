import React, {useState, useEffect} from 'react';
import AddRecipeForm from './AddRecipeForm';
import { getRecipes } from '../util/APIUtils';

import RecipeCard from './RecipeCard';
import './Recipes.css';

const Recipes = (props) => {

  const [showForm, setShowForm] = useState(false);
  const [recipes, setRecipes] = useState([]);
  console.log(props);

  const handleClick = () => {
    setShowForm(!showForm);
  }

  useEffect(() => {
    getRecipes()
    .then(response => {
      setRecipes(response);
    })
    .catch(error => {
      console.log(error)
    })
  }, []) 

  // useEffect(() => {

  // }, [recipes]

  const recipeComponents = recipes.map(recipe => {
    return (<RecipeCard {...recipe} key={recipe.id} />)
  })

  

  return (
    <div>
      <h1>RECIPES</h1>
      <AddRecipeForm />
      <div className="recipe-card-list__container">
        {recipeComponents}
      </div>

    </div>
  )

}

export default Recipes;
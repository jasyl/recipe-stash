import React, {useState, useEffect} from 'react';
import AddRecipeForm from './AddRecipeForm';
import { getRecipes } from '../util/APIUtils';
import { withRouter, Router, Link } from 'react-router-dom';

import RecipeCard from './RecipeCard';
import RecipePage from './RecipeDetails';
import './Recipes.css';

const Recipes = (props) => {

  const [showForm, setShowForm] = useState(false);
  const [recipes, setRecipes] = useState([]);
  // console.log(props);

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

  const goToRecipeDetails = (recipe) => {
    localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
    // props.history.push('/');
  }

  const recipeComponents = recipes.map(recipe => {
    return (<Link to={{pathname: '/recipes/' + recipe.id}} onClick={goToRecipeDetails(recipe)} key={recipe.id}><RecipeCard {...recipe} /></Link>)
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


// <Link to={{pathname:'/' +car.id}}> {car.name}</Link> 
//  <router> <div> <h1> Cars page</h1></div></Router> 
import React, {useState, useEffect} from 'react';
import RecipeUrlForm from './RecipeUrlForm';
import { getRecipes } from '../util/APIUtils';
import { withRouter, Router, Link } from 'react-router-dom';

import RecipeCard from './RecipeCard';
import RecipePage from './RecipeDetails';
import './Recipes.css';

const Recipes = (props) => {

  const recipeComponents = props.recipes.map(recipe => {
    return (<Link to={{pathname: '/recipes/' + recipe.id}} key={recipe.id} className="recipe-card-link__container"><RecipeCard {...recipe}  /></Link>)
  })


  return (

      <div>
        <h1>RECIPES</h1>
        {/* <RecipeUrlForm reFetchRecipes={props.reFetchRecipes}/> */}

          <div className="recipe-card-list__container">
            {recipeComponents}
          </div>


      </div>

  )

}

export default Recipes;


// <Link to={{pathname:'/' +car.id}}> {car.name}</Link> 
//  <router> <div> <h1> Cars page</h1></div></Router> 
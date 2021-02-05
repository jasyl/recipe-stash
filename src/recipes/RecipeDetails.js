import React, { useEffect, useState } from 'react';
import './RecipeCard.css';

const RecipeDetails = (props) => {

  const [currentRecipe, setCurrentRecipe] = useState({});

  useEffect(() => {
    const recipe = JSON.parse(localStorage.getItem("selectedRecipe"));
    setCurrentRecipe(recipe) 
  },[])

  const {img, ingredients, instructions, readyInMinutes, servings, sourceUrl, title} = currentRecipe;
  const ingredientList = ingredients.map((item) => {
    return(
      <li key={item.id}>{item.qty} {item.unit} {item.ingredient}</li>
    )
  })

  return (
    <div className="recipe-card__container">
      <img src={img} alt='' />
      <h1>{title}</h1>
      <p>Servings: {servings}</p>
      <p>Total Time: {readyInMinutes}</p>
      <div className="ingredients">
        <h3>Ingredients</h3>
        <ul>
          {ingredientList}
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p>{instructions}</p>
      </div>
      <small><a href={sourceUrl}>{sourceUrl}</a></small>
    </div>
  )
}

export default RecipeDetails;
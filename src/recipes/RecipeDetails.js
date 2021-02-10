import React, { useState } from 'react';
import './RecipeCard.css';
import {Redirect} from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import axios from 'axios';
import RecipeUpdateForm from './RecipeUpdateForm';
var Fraction = require('fraction.js');

const RecipeDetails = (props) => {
  const [redirect, setRedirect] = useState(false);
  const [show, setShow] = useState(false);



  const id = parseInt(props.match.params.id)

  const recipe = props.recipes.filter(recipe => recipe.id === id)[0];

  const {img, ingredients, instructions, readyInMinutes, servings, sourceUrl, title} = recipe;
  const ingredientList = ingredients.map((item) => {
    return(
      <li key={item.id}>{new Fraction(item.qty).toFraction(true)} {item.unit} {item.ingredient}</li>
    )
  })

  const handleClickDelete = () => {
    axios.delete(`${API_BASE_URL}/recipes/${id}`, null, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } }) 
      .then(response => {
        props.reFetchRecipes();
        setRedirect(true);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handleClickEdit = () => {
    setShow(true);
  }

  if (redirect) {
    return <Redirect to={{pathname: "/", state: { from: props.location } }}/>
  } else {
    return (    
        <div className="recipe-card__container">
          <RecipeUpdateForm reFetchRecipes={props.reFetchRecipes} show={show} setShow={setShow} recipe={recipe}/>
          <img src={img} alt='' />
          <h1>{title}</h1>
          <button onClick={handleClickEdit}>Edit</button>
          <button onClick={handleClickDelete}>Delete</button>
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
}

  


export default RecipeDetails;
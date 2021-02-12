import React, { Fragment, useState } from 'react';
import './RecipeCard.css';
import {Redirect} from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import axios from 'axios';
import RecipeUpdateForm from './RecipeUpdateForm';
import Button from 'react-bootstrap/Button';
import './RecipeDetails.css'
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
    axios.delete(`${API_BASE_URL}/recipes/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } }) 
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

  let instructionList;
  
  if (instructions != null) {
    instructionList = recipe.instructions.split(/\n/).map(line => {
      return <p>{line}</p>
    })
  } else {
    instructionList = <p>Please see full instruction details <a href={sourceUrl} className="source-link">here</a> </p>
  }


  if (redirect) {
    return <Redirect to={{pathname: "/", state: { from: props.location } }}/>
  } else {
    return (   
      <Fragment>
      
        <RecipeUpdateForm reFetchRecipes={props.reFetchRecipes} show={show} setShow={setShow} recipe={recipe}/>

        <div className="recipe-details__top">
            <a href={sourceUrl} className="source-link">Source</a>
            <div className="recipe-details__btns">
              <Button variant="light" onClick={handleClickEdit}>Edit</Button>
              <Button variant="light" onClick={handleClickDelete}>Delete</Button>
            </div>
          </div>

        <div className="recipe-details">
          <img src={img} alt='' className="recipe-details__img" />
          <div className="recipe-details__top-contents">
            <h1>{title}</h1>
            <p>Servings: {servings}</p>
            <p>Total Time: {readyInMinutes}</p>
          </div>

          <div className="ingredients">
            <h3>Ingredients</h3>
            <ul>
              {ingredientList}
            </ul>
          </div>

          <div className="instructions">
            <h3>Instructions</h3>
            {instructionList}
          </div>

        </div>

      </Fragment>
    )
  }
}

  


export default RecipeDetails;
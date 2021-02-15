import React, { Fragment, useState } from 'react';
import './RecipeCard.css';
import {Redirect} from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import axios from 'axios';
import RecipeUpdateForm from './RecipeUpdateForm';
import './RecipeDetails.css'
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
var Fraction = require('fraction.js');

const RecipeDetails = (props) => {
  const [redirect, setRedirect] = useState(false);
  const [show, setShow] = useState(false);



  const id = parseInt(props.match.params.id)

  const recipe = props.recipes.filter(recipe => recipe.id === id)[0];

  const {img, ingredients, instructions, readyInMinutes, servings, sourceUrl, title} = recipe;
  const ingredientList = ingredients.map((item) => {
    return(
      <Fragment key={item.id}><p className={(item.qty % 1 === 0) ? 'number' : 'fraction'}>{new Fraction(item.qty).toFraction(true)}</p> <div> {item.unit} {item.ingredient}</div></Fragment>
    )
  })

  const handleClickDelete = () => {
    axios.delete(`${API_BASE_URL}/recipes/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } }) 
      .then(response => {
        props.reFetchRecipes();
        setRedirect(true);
        props.setMessage({message: `${title} successfully deleted`, type: 'success'})
      })
      .catch(error => {
        props.setMessage({message: error.response.data.message, type: 'error'})
      })
  }

  const handleClickEdit = () => {
    setShow(true);
  }

  let instructionList;

  if (instructions != null) {

    // html strip may need to be done in backend
    instructionList = recipe.instructions.replace(/(<([^>]+)>)/gi, "\n").split(/\n/).map((line, i) => {
      return <p key={i}>{line}</p>
    })
  } else {
    instructionList = <p>Please see full instruction details <a href={sourceUrl} className="source-link">here</a> </p>
  }


  if (redirect) {
    return <Redirect to={{pathname: "/", state: { from: props.location } }}/>
  } else {
    return (   
      <Fragment>
      
        <RecipeUpdateForm reFetchRecipes={props.reFetchRecipes} show={show} setShow={setShow} recipe={recipe} setMessage={props.setMessage}/>

        <div className="recipe-details__top">
            <a href={sourceUrl} className="source-link">Source</a>
            <div className="recipe-details__btns">
              <EditButton handleClickEdit={handleClickEdit} />
              <DeleteButton handleClickDelete={handleClickDelete} />
            </div>
          </div>

        <div className="recipe-details">
          <img src={img} alt='' className="recipe-details__img" />
          <div className="recipe-details__top-contents">
            <h1>{title}</h1>
            <p className='servings'>Servings — {servings}</p>
            <p className='time'>Total Time — {readyInMinutes}</p>
          </div>

          <div className="ingredients">
            <h5>Ingredients</h5>
            <div className="ingredient-list">
              {ingredientList}
            </div>
          </div>

          <div className="instructions">
            <h5>Instructions</h5>
            {instructionList}
          </div>

        </div>

      </Fragment>
    )
  }
}

  


export default RecipeDetails;
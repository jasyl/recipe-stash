import React, { Fragment, useState } from 'react';
import './RecipeCard.css';
import {Redirect} from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import axios from 'axios';
import RecipeUpdateForm from './RecipeUpdateForm';
import './RecipeDetails.css'
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import FavoriteButton from './FavoriteButton';
var Fraction = require('fraction.js');

const RecipeDetails = (props) => {
  const [redirect, setRedirect] = useState(false);
  const [show, setShow] = useState(false);



  const id = parseInt(props.match.params.id)

  const recipe = props.recipes.filter(recipe => recipe.id === id)[0];

  const {img, ingredients, instructions, readyInMinutes, servings, sourceUrl, title, favorite} = recipe;
  const ingredientList = ingredients.map((item, i) => {
    return(
        <p key={i} className={(item.qty % 1 === 0) ? 'number' : 'fraction'}>{new Fraction(item.qty).toFraction(true)} {item.unit} {item.ingredient}</p> 
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
    // replace(/(<([^>]+)>)/gi, "\n").split(/\n/)
    instructionList = recipe.instructions.split(/\n/).filter(line => line !== '').map((line, i) => {
      return (
        <Fragment>
          <p className='recipe-step' key={'step' + i}>{i + 1}</p>
          <p className="instruction-line" key={i}>{line}</p>
        </Fragment>
      )
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
              <FavoriteButton className="recipe-details-favorite-button" favorite={favorite} id={id} reFetchRecipes={props.reFetchRecipes}/>
              <EditButton handleClickEdit={handleClickEdit} />
              <DeleteButton handleClickDelete={handleClickDelete} />
            </div>
          </div>

        <div className="recipe-details">
          <img src={img} alt='' className="recipe-details__img" />
          <div className="recipe-details__top-contents">
            <h1 className='recipe-details-title'>{title}</h1>
            <p className='time-and-servings'> 
              <span className='time'>{readyInMinutes} minutes</span> 
              <span className='separator'>•</span>
              <span className='servings'>{servings} servings</span>
            </p>
          </div>

          <div className="ingredients">
            <h5>Ingredients</h5>
            <div className="ingredient-list">
              {ingredientList}
            </div>
          </div>

          <div className="instructions">
            <h5>Instructions</h5>
            <div className="instruction-list">
              {instructionList}
            </div>
          </div>

        </div>

      </Fragment>
    )
  }
}

  


export default RecipeDetails;
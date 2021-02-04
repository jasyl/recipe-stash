import React from 'react';
import './RecipeCard.css';
import { Redirect } from 'react-router-dom'
var Fraction = require('fraction.js');


const RecipeCard = (props) => {
  console.log(props)
  const {img, ingredients, instructions, title} = props

  const ingredientList = ingredients.map((item) => {
    return(
      <li key={item.id}>{ new Fraction(item.qty).toFraction(true)} {item.unit} {item.ingredient}</li>
    )
  })

  // const handleClick = () => {
  //   return <Redirect
  //               to={{
  //               pathname: {`/${props.title}`},
  //               state: { from: this.props.location }
  //           }}/>;       
  // }

  
  return (
    <div className="recipe-card__container" >
      <img src={img} alt='' className="recipe-card__img" />
      <div className="recipe-card__content">
        <h1>{title}</h1>
        {/* <p>Servings: {servings}</p>
        <p>Total Time: {readyInMinutes}</p> */}
      </div>
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
    </div>
  )
}

export default RecipeCard;
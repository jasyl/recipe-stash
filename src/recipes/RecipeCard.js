import React from 'react';
import './RecipeCard.css';

const RecipeCard = (props) => {
  // console.log(props)
  const {img, title} = props

  
  return (
    <div className="recipe-card__container" >
      <img src={img} alt='' className="recipe-card__img" />
      <div className="recipe-card__content">
        <h1>{title}</h1>
      </div>
    </div>
  )
}

export default RecipeCard;
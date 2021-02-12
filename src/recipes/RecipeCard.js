import React from 'react';
import './RecipeCard.css';
import Card from 'react-bootstrap/Card';

const RecipeCard = (props) => {
  // console.log(props)
  const {img, title} = props

  
  return (

    <Card className="recipe-card__container">
      <Card.Img variant="top" src={img} alt="" className="recipe-card__img" />
      <Card.Body className="recipe-card__content">
        <Card.Title className="recipe-card__title">{title}</Card.Title>
      </Card.Body>
    </Card>

  )
}

export default RecipeCard;


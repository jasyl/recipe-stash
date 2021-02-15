import React from 'react';
import './RecipeCard.css';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

const RecipeCard = (props) => {
  const {img, title} = props;
  
  return (

    <Card className="recipe-card__container">
      <CardActionArea>
      <CardMedia 
        image={img} 
        title={title} 
        className="recipe-card__img" 
        component="img"
      />
      <CardContent className="recipe-card__content">
        <Typography gutterBottom variant="h6" className="recipe-card__title">
          {title}
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>

  )
}

export default RecipeCard;


import React from 'react';
import './RecipeCard.css';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import FavoriteButton from './FavoriteButton';

const RecipeCard = (props) => {
  const {img, title, favorite, id} = props;
  
  return (

    <Card className="recipe-card__container">

      <FavoriteButton favorite={favorite} id={id} className='favorite-btn' />
      <CardMedia 
        image={img} 
        title={title} 
        className="recipe-card__img" 
        component="img"
      />
      <CardActionArea className="recipe-card__actionarea">
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


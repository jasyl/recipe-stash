import React, {Fragment, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from 'axios';
import { API_BASE_URL } from '../constants';

const FavoriteButton = (props) => {

  const [favorite, setFavorite] = useState(props.favorite);
  

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite(!favorite);
    axios.post(`${API_BASE_URL}/recipes/${props.id}`, null, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` }, params: {"favorite" : !props.favorite} }) 
    .then(response => {
      console.log(response);  
      props.reFetchRecipes();
    })
    .catch(error => {
      console.log(error);
    })
  }
  console.log(props);
  return(
    <Fragment>
      <Tooltip title="Favorite" className={props.className + (favorite ? ' favorite' : ' not-favorite')} onClick={handleClick}>
        <IconButton aria-label="favorite">
          {favorite ? <FavoriteIcon className="favorite-icon" /> : <FavoriteBorderIcon className="unfavorite-icon" />}
        </IconButton>
      </Tooltip>
    </Fragment>
  )
}

export default FavoriteButton;
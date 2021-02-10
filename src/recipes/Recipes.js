import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

import RecipeCard from './RecipeCard';
import './Recipes.css';

const Recipes = (props) => {

  const [search, setSearch] = useState(null);

  const searchItems = props.recipes.filter(recipe => {
    if (search == null) {
      return recipe;
    } else if (recipe.title.toLowerCase().includes(search.toLowerCase())){
      return recipe
    } else {
      return false
    }
  })


  const recipeComponents = searchItems.map(recipe => {
    return (<Link to={{pathname: '/recipes/' + recipe.id}} key={recipe.id} className="recipe-card-link__container"><RecipeCard {...recipe}  /></Link>)
  })


  return (

      <div>
          <SearchBar setSearch={setSearch} search={search} />

          <div className="recipe-card-list__container">
            {recipeComponents}
          </div>


      </div>

  )

}

export default Recipes;


// <Link to={{pathname:'/' +car.id}}> {car.name}</Link> 
//  <router> <div> <h1> Cars page</h1></div></Router> 
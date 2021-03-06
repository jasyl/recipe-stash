import React, {useState} from 'react';

import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

import RecipeCard from './RecipeCard';
import './Recipes.css';
import { CardDeck } from 'react-bootstrap';
import AddRecipeButton from './AddRecipeButton'




const Recipes = (props) => {

  const [search, setSearch] = useState('');

  const searchItems = props.recipes.filter(recipe => {
    if (search === null || search === '') {
      return recipe;
    } else if (recipe.title.toLowerCase().includes(search.toLowerCase())){
      return recipe
    } else if  (!recipe.title.toLowerCase().includes(search.toLowerCase())) {
        const ingredient = recipe.ingredients.find(ingredient => ingredient.ingredient.toLowerCase().includes(search.toLowerCase()));

        if (ingredient) {
          return recipe
        } else {
          return false
        }
    } else {
      return false
    }
  })


  const recipeComponents = searchItems.map(recipe => {
    return (<Link to={{pathname: '/recipes/' + recipe.id}} key={recipe.id} className="recipe-card-link__container"><RecipeCard {...recipe} reFetchRecipes={props.reFetchRecipes} /></Link>)
  })

  if (props.recipes.length === 0) {
    return (

      <div>
        <div className="recipe-menu">
          <AddRecipeButton reFetchRecipes={props.reFetchRecipes} />
        </div>
          
          <h2>Looks like you don't have any recipes yet...</h2>
          <h2>Add some!</h2>

      </div>
    )
  } else {


  return (

      <div>
        <div className="recipe-menu">

          <AddRecipeButton reFetchRecipes={props.reFetchRecipes} setMessage={props.setMessage} />
          <SearchBar setSearch={setSearch} search={search} />
        </div>
          

          <CardDeck className="recipe-card-list__container">
            {recipeComponents}
          </CardDeck>


      </div>

  )
  }

}

export default Recipes;


// <Link to={{pathname:'/' +car.id}}> {car.name}</Link> 
//  <router> <div> <h1> Cars page</h1></div></Router> 
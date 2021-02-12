import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import RecipeUrlForm from './RecipeUrlForm'
import RecipeCreateForm from './RecipeCreateForm'

const AddRecipeButton = (props) =>  {

  const [urlShow, setUrlShow] = useState(false);
  const [createFormShow, setcreateFormShow] = useState(false);

  const handleUrlShow = () => setUrlShow(true);
  const handleCreateShow = () => setcreateFormShow(true);

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" className="add-recipe__btn">
        + Recipe
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleUrlShow}>Url</Dropdown.Item>
        <RecipeUrlForm reFetchRecipes={props.reFetchRecipes} show={urlShow} setShow={setUrlShow}/>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleCreateShow}>Manual</Dropdown.Item>
        <RecipeCreateForm reFetchRecipes={props.reFetchRecipes} show={createFormShow} setShow={setcreateFormShow}/>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default AddRecipeButton


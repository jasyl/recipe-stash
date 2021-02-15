import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import RecipeUrlForm from './RecipeUrlForm'
import RecipeCreateForm from './RecipeCreateForm'
import './AddRecipeButton.css';

const AddRecipeButton = (props) =>  {

  const [urlShow, setUrlShow] = useState(false);
  const [createFormShow, setcreateFormShow] = useState(false);

  const handleUrlShow = () => {
    setUrlShow(true)
  };
  const handleCreateShow = () => {
    setcreateFormShow(true);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" className="add-recipe__btn">
        {/* <AddIcon className="add-icon"/>   */}
        <span className="add-icon">+</span> Recipe
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleUrlShow} className='dropdown-url'>Url</Dropdown.Item>
        <RecipeUrlForm reFetchRecipes={props.reFetchRecipes} show={urlShow} setShow={setUrlShow} setMessage={props.setMessage} />
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleCreateShow} className='dropdown-manual'>Manual</Dropdown.Item>
        <RecipeCreateForm reFetchRecipes={props.reFetchRecipes} show={createFormShow} setShow={setcreateFormShow} setMessage={props.setMessage} />
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default AddRecipeButton;




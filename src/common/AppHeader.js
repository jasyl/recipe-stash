import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import './AppHeader.css';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeUrlForm from '../recipes/RecipeUrlForm';
import RecipeCreateForm from '../recipes/RecipeCreateForm';

const AppHeader = (props) =>  {

    const [show, setShow] = useState(false);

    const handleUrlShow = () => setShow(true);
    const handleCreateShow = () => setShow(true);
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={NavLink} to="/">Recipe Stash</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav"> 
                {props.authenticated ? (
                    <Nav className="ml-auto">
                    <Nav.Link as={NavLink} to="/" exact>Recipes</Nav.Link>
                    <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
                    <NavDropdown title="Add Recipe" id="collasible-nav-dropdown">
                        
                        <NavDropdown.Item onClick={handleUrlShow}>Url</NavDropdown.Item>
                        <RecipeUrlForm reFetchRecipes={props.reFetchRecipes} show={show} setShow={setShow}/>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleCreateShow}>Manual</NavDropdown.Item>
                        <RecipeCreateForm reFetchRecipes={props.reFetchRecipes} show={show} setShow={setShow}/>
                    </NavDropdown>
                    <Button onClick={props.onLogout} variant="outline-light">Logout</Button>
                    </Nav>
                ) : (
                    <Nav className="ml-auto">
                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                    <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
                    </Nav>
                )}
            </Navbar.Collapse>
        </Navbar>
    )
    
}

export default AppHeader;
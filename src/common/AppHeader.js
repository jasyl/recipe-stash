import React from 'react';
import { NavLink } from 'react-router-dom';
import './AppHeader.css';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';

const AppHeader = (props) =>  {

    return (
        <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand as={NavLink} to="/">RecipeStash</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav"> 
                {props.authenticated ? (
                    <Nav className="ml-auto">
                    <Nav.Link as={NavLink} to="/" exact className='nav-link-recipes'>Recipes</Nav.Link>
                    
                    <NavDropdown title={
                        <IconButton aria-label="Edit">
                            <PersonIcon className="profile-icon" />
                        </IconButton>
                        } className="profile-dropdown" >
                        <NavDropdown.Item as={NavLink} to="/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={props.onLogout}>Logout</NavDropdown.Item>                        
                    </NavDropdown>
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
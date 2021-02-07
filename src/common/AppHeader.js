import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import Button from 'react-bootstrap/button';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeUrlForm from '../recipes/RecipeUrlForm';

const AppHeader = (props) =>  {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        // <header className="app-header">
        //     <div className="container">
        //         <div className="app-branding">
        //             <Link to="/" className="app-title">Recipe Stash</Link>
        //         </div>
        //         <div className="app-options">
        //             <nav className="app-nav">
        //                     { this.props.authenticated ? (
        //                         <ul>
        //                             <li>

        //                             </li>
        //                             <li>
        //                                 <NavLink to="/">Recipes</NavLink>
        //                             </li>
        //                             <li>
        //                                 <NavLink to="/profile">Profile</NavLink>
        //                             </li>
        //                             <li>
        //                                 <button onClick={this.props.onLogout}>Logout</button>
        //                             </li>
        //                         </ul>
        //                     ): (
        //                         <ul>
        //                             <li>
        //                                 <NavLink to="/login">Login</NavLink>        
        //                             </li>
        //                             <li>
        //                                 <NavLink to="/signup">Signup</NavLink>        
        //                             </li>
        //                         </ul>
        //                     )}
        //             </nav>
        //         </div>
        //     </div>
        // </header>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={NavLink} to="/">Recipe Stash</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                
                    {props.authenticated ? (
                        <Nav className="ml-auto">
                        <Nav.Link as={NavLink} to="/" exact>Recipes</Nav.Link>
                        <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
                        <NavDropdown title="Add Recipe" id="collasible-nav-dropdown">
                            
                            <NavDropdown.Item onClick={handleShow}>Url</NavDropdown.Item>
                            <RecipeUrlForm reFetchRecipes={props.reFetchRecipes} show={show} setShow={setShow}/>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Manual</NavDropdown.Item>
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
import React, {useContext, Fragment} from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import UserContext from './../UserContext';
import './Style.css';

export default function AppNavbar(){

  const {user, unsetUser} = useContext(UserContext);

  let history = useHistory();

  const logout = () => {
    unsetUser();
    history.push('/');
  }

  let userLogIn = (user.id !== null) ?
      (user.isAdmin === true) ?
        <Fragment>
          <Nav.Link as={NavLink} to="/addbooks" className="Nav-link">ADD NEW BOOK</Nav.Link>
          <Nav.Link as={NavLink} to="/books" className="Nav-link">ADMIN DASHBOARD</Nav.Link>
          <Nav.Link onClick={logout} className="Nav-link">LOGOUT</Nav.Link>
        </Fragment>
      :
         <Fragment>
         <Nav.Link as={NavLink} to="/books" className="Nav-link">BOOKS</Nav.Link>
          <Nav.Link  onClick={logout} className="Nav-link">LOGOUT</Nav.Link>
        </Fragment>
  :
    (

      <Fragment>
        <Nav.Link as={NavLink} to="/collections" className="Nav-link">BOOKS</Nav.Link>
        <Nav.Link as={NavLink} to="/register" className="Nav-link">REGISTER</Nav.Link>
        <Nav.Link as={NavLink} to="/login" className="Nav-link">LOGIN</Nav.Link>
      </Fragment>

    )


  return (
    <Navbar className="Nav-bg">
      <Navbar.Brand as={Link} to="/">LIBROry</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {userLogIn}
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    )
}


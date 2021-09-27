import React, {useState, useEffect, useContext} from 'react';
import { Redirect, NavLink} from 'react-router-dom';
import UserContext from './../UserContext';
import {Container, Form, Button, Nav} from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const {user, setUser} = useContext(UserContext);

  useEffect( () => {
    if(email !== '' && password !== ''){
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [email, password]);

  function login(e){
    e.preventDefault();

    fetch('https://polar-brushlands-73295.herokuapp.com/ecommerce/users/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(result => result.json())
    .then(result => {

      if(result === false){
        Swal.fire({
          title: 'Account does not exist!',
          customClass: {
            title: 'swal-title',
          }
        })
      } else {
        
        if(typeof result.access !== "undefined"){
        localStorage.setItem('token', result.access)
        userDetails(result.access)
      }
      }

      
    })

    const userDetails = (token) => {
      fetch('https://polar-brushlands-73295.herokuapp.com/ecommerce/users/userDetails',{
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(result => result.json())
      .then(result => {
        setUser({
          id: result._id,
          isAdmin: result.isAdmin
        });
      })
    }

    setEmail('');
    setPassword('');
  }

  return(
    (user.id !== null) ? 
      <Redirect to="/" />

    : 
      <Container className="Container-Form">
        <h2 className="Form-name text-center">LOGIN</h2>
        <Nav.Link as={NavLink} to="/register"> <p className="aLink text-center">Don't have an account yet?</p> </Nav.Link>
        <Form onSubmit={ (e) => login(e) }>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter Email Address" value={email}
            onChange={(e)=> setEmail(e.target.value) }/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" value={password}
            onChange={(e)=> setPassword(e.target.value) }/>
          </Form.Group>
          <Button className="Form-btn" variant="primary" type="submit" disabled={isDisabled}>LOG IN</Button>
        </Form>
      </Container>
  )
}
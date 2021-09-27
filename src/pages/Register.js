import React, {useState, useEffect, useContext} from 'react';
import { useHistory, Redirect, NavLink} from 'react-router-dom';
import {Container, Form, Button, Nav} from 'react-bootstrap';
import UserContext from './../UserContext';
import Swal from 'sweetalert2';



export default function Register(){
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	const {user} = useContext(UserContext)

	let history = useHistory();

	useEffect( () => {
		if(firstName !== '' && lastName !== '' && email !== '' && password !== ''){
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [firstName, lastName, email, password]);


	function register(e){
		e.preventDefault();

		fetch(`https://polar-brushlands-73295.herokuapp.com/ecommerce/users/checkEmail`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then( result => result.json())
		.then( result => {

			if(result === true){
				Swal.fire({
					title: 'Email already used!',
					icon: 'error',
					text: 'Please choose different email address.'
				})
			} else {

				fetch(`https://polar-brushlands-73295.herokuapp.com/ecommerce/users/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
						password: password
					})
				})
				.then( result => result.json())
				.then( result => {

					if(result === true){
						Swal.fire({
							title: "Registration Successful",
							icon: "success",
							text: "You may now logged in."
						})

						history.push('/login');

					} else {
						Swal.fire({
							title: 'Something went wrong',
							icon: 'error',
							text: 'Please try again!'
						})
					}
				})

			}
		})
		setFirstName('');
		setLastName('');
		setEmail('');
		setPassword('');
	}

	return(
		(user.id !== null) ?

			<Redirect to="/" />

		:
			<Container className="Container-Form">
				<h2 className="Form-name text-center mt-3">REGISTER</h2>
				<Nav.Link as={NavLink} to="/login"> <p className="aLink text-center">Already registered?</p> </Nav.Link>
				<Form onSubmit={(e)=> register(e)}>
					<Form.Group className="mb-3" controlId="formfirstName">
						<Form.Label>First Name</Form.Label>
						<Form.Control type="text" placeholder="Enter Firstname" value={firstName}
						onChange={(e)=> setFirstName(e.target.value) }/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formlastName">
						<Form.Label>Last Name</Form.Label>
						<Form.Control type="text" placeholder="Enter Lastname" value={lastName}
						onChange={(e)=> setLastName(e.target.value) }/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter Email Address" value={email}
						onChange={(e)=> setEmail(e.target.value) }/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Enter Password" value={password}
						onChange={(e)=> setPassword(e.target.value) }/>
					</Form.Group>

					<Button className="Form-btn" variant="primary" type="submit" disabled={isDisabled}>REGISTER NOW</Button>
				</Form>
			</Container>
	)
}
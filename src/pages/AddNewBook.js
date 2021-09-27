import React, { useState, useEffect, useContext} from 'react';
import { Container, Form, Button} from 'react-bootstrap';
import {useHistory, Redirect} from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from './../UserContext';


export default function AddNewBook(){
	
	const {user} = useContext(UserContext);
	const history = useHistory();
	const [productName, setProductName] = useState('');
	const [productDescription, setProductDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [isActive, setIsActive] = useState(true);


	let token = localStorage.getItem('token')

	useEffect(()=>{

		if(productName !== '' && productDescription !== '' && price !== 0){
			setIsActive(true);
		}else{
			setIsActive(false);
		}

	}, [productName, productDescription, price]);


	function addBook(e){

		e.preventDefault();

		fetch('https://polar-brushlands-73295.herokuapp.com/ecommerce/products/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				productName: productName,
				productDescription: productDescription,
				price: price
			})
		})
		.then(result => result.json())
		.then(result => {

			if(result === true){
				Swal.fire({
					title: "New Book Added",
					customClass: {
						title: 'swal-title',
					}
				})

				history.push('/books');

			} else {

				Swal.fire({
					title: "Please try again",
					customClass: {
						title: 'swal-title',
					}
				})

			}
		})

		setProductName('');
		setProductDescription('');
		setPrice(0);

	};

	
	return(
		 (user.isAdmin === true) ? 
		<Container className="Container-Form my-5" >
			<h2 className="Form-name text-center">ADD NEW BOOK</h2>
			<Form onSubmit={ e => addBook(e)}>
				<Form.Group>
					<Form.Label>TITLE OF THE BOOK:</Form.Label>
					<Form.Control
						type="text"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>BOOK OVERVIEW:</Form.Label>
					<Form.Control
						type="text"
						value={productDescription}
						onChange={(e) => setProductDescription(e.target.value)}
					/>
				</Form.Group>


				<Form.Group>
					<Form.Label>PRICE:</Form.Label>
					<Form.Control
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</Form.Group>

				{ 
					(isActive === true) ? 
						<Button className="Form-btn" type="submit" variant="primary">Submit</Button>
					:
						<Button className="Form-btn" type="submit" variant="primary" disabled>Submit</Button>
				}
				
			</Form>
		</Container>
		
:
		<Redirect to='/' />

		
	)
	}
 



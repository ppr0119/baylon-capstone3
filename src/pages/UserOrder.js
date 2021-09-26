import React, {useContext, useEffect, useState} from 'react';
import UserContext from './../UserContext';
import {Link, useParams, useHistory} from 'react-router-dom';
import {Container, Card, Button, Form} from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function UserOrder(){

	const [productName, setProductName] = useState('');
	const [productDescription, setProductDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const {user} = useContext(UserContext);
	const {bookId} = useParams();

	let token = localStorage.getItem('token');
	let history = useHistory();

	useEffect( () => {
		fetch(`https://polar-brushlands-73295.herokuapp.com/ecommerce/products/products/${bookId}`,
			{
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`
				}
			}
		)
		.then(result => result.json())
		.then(result => {
			setProductName(result.productName);
			setProductDescription(result.productDescription);
			setPrice(result.price);
		})
	}, [bookId, token])

	const createOrder = () => {

		fetch(`https://polar-brushlands-73295.herokuapp.com/ecommerce/users/checkout`, 
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					productId: bookId,
					quantity: quantity
				})
			}
		)
		.then(result => result.json())
		.then(result => {
			if(result === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Thank you for your Order!" 
				})

				history.push('/books');
			} else {
				Swal.fire({
					title: "Failed",
					icon: "error",
					text: "Please try again" 
				})
			}
		})
	}

	return(
		<Container>
			<Card>
				<Card.Header>
					<h4>
						{productName}
					</h4>
				</Card.Header>
				<Card.Body>
					<Card.Text>
						{productDescription}
					</Card.Text>
					<h6>
						Price: Php 
						<span className="mx-2">{price}</span>
					</h6>
					<h6>
						Quantity:
					<Form.Control
						type="number"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
						
					</h6>
					
				</Card.Body>
				<Card.Footer>
					{
						(user.id !== null) ?
								<Button variant="primary" 
								onClick={createOrder}

								> Order</Button>
							:
								<Link className="btn btn-danger" to="/login">Login to Order</Link>
					}
				</Card.Footer>
			</Card>
		</Container>
	)
}
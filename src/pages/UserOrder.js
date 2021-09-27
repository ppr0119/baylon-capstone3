import React, {useContext, useEffect, useState} from 'react';
import UserContext from './../UserContext';
import {Link, useParams, useHistory} from 'react-router-dom';
import {Container, Card, Form, Row, Col, Button} from 'react-bootstrap';
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
					title: "Thank you for your Order!",
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
	}

	return(
		<Container>
			<Card className="Collection-card">
				<Card.Header className="Product-title"> {productName} </Card.Header>
				<Card.Body>
					<Card.Text className="Product-description">{productDescription}</Card.Text>
					<h6>
						<b>Price:</b>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
						Php {price}
					</h6>
					<Row>
						<Col><b>Quantity:</b></Col>
						<Col><Form.Control className="Form-quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/></Col>
					</Row>					
				</Card.Body>
				<Card.Footer>
					{
						(user.id !== null) ?
								<Button className="Details-btn btn" onClick={createOrder} > Order</Button>
							:
								<Link className="Details-btn btn"to="/login">Login to Order</Link>
					}
				</Card.Footer>
			</Card>
		</Container>
	)
}
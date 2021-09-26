import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function Book({bookProp}){

	const {productName, productDescription, price, _id} = bookProp

	return(
		<Card className="mb-3">
			<Card.Body>
				<Card.Title>{productName}</Card.Title>
				<h5>Book Summary:</h5>
				<p>{productDescription}</p>
				<h5>Price:</h5>
				<p>{price}</p>
		    	<Link className="btn btn-primary" to={`/books/${_id}`}>
		    		Check Out
		    	</Link>
			</Card.Body>
		</Card>
	)
}
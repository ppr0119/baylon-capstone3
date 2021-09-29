import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function Book({bookProp}){

	const {productName, productDescription, price, _id} = bookProp

	return(
		<Card className="Collection-card mb-3">
			<Card.Body>
				<Card.Title className="Product-title">{productName}</Card.Title> <hr/>
				<p className="Product-description">{productDescription}</p>
				<p className="Product-description"><b>Price:</b> Php {price}</p>
		    	<Link className="Details-btn btn" to={`/books/${_id}`}>
		    		Check Out
		    	</Link>
			</Card.Body>
		</Card>
	)
}
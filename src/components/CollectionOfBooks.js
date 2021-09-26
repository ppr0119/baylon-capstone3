import React from 'react';
import {Card} from 'react-bootstrap';

import {Link} from 'react-router-dom';

export default function CollectionOfBooks({bookProp}){

	const {productName, productDescription} = bookProp;

	return(
			<Card className="Collection-card">
			<Card.Body>
				<Card.Title>{productName}</Card.Title>
				<h5>Book Summary:</h5>
				<p>{productDescription}</p>
		    	<Link className="btn btn-primary" to={`/login`}>
		    		Details
		    	</Link>
			</Card.Body>
		</Card>
	)
}






	
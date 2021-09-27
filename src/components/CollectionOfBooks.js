import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function CollectionOfBooks({bookProp}){

	const {productName, productDescription} = bookProp;

	return(
			<Card className="Collection-card">
			<Card.Body>
				<Card.Title className="Product-title">{productName}</Card.Title> <hr/>
				<p className="Product-description">{productDescription}</p>
		    	<Link className="Details-btn btn" to={`/login`}>
		    		Details
		    	</Link>
			</Card.Body>
		</Card>
	)
}






	
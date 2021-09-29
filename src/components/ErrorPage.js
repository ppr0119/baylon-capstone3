import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Jumbotron} from 'react-bootstrap';

export default function Error(){

	return (

	<Container className="pt-5">
				<Jumbotron className="Errorpage">
 					<h1>OPPS! PAGE NOT FOUND</h1>
					<h4>Sorry, the page you are looking for doesn't exist.</h4>
					<Link className="ErrorPageBtn btn" to={`/`}>Take me back to the Homepage</Link>
				</Jumbotron>
	</Container>

		)
}


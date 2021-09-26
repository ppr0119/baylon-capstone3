import React from 'react';
import {NavLink} from 'react-router-dom';


import {Nav, Container, Row, Col, Jumbotron} from 'react-bootstrap';

export default function Error(){

	return (

	<Container fluid>
		<Row>
			<Col className="px-0">
				<Jumbotron fluid>
 					 <h1>ERROR!</h1>
					  <p>
					   Get your dream book here.
					  </p>
						<Nav.Link as={NavLink} to="/" >Back to HOME</Nav.Link>
					</Jumbotron>
				</Col>
			</Row>
	</Container>

		)
}
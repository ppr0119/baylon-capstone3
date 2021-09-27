import React from 'react';
import {Container, Row, Col, Jumbotron} from 'react-bootstrap';

export default function Home(){

	return (
			<Container fluid>
					<Row>
						<Col className="px-0">
							<Jumbotron fluid className="Banner-bg">
							<h1 className="Banner-Text">Welcome Reader!</h1>
							<p className="Banner-Text">Get your dream book here.</p>
							</Jumbotron>
						</Col>
					</Row>
			</Container>
		)
}
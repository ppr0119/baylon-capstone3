import React from 'react';
import './Style.css';
import {Container, Row, Col, Jumbotron} from 'react-bootstrap';

export default function Home(){

	return (
			<Container fluid>
					<Row>
						<Col className="px-0">
							<Jumbotron fluid className="Banner-bg">
							<h1>WELCOME READER!</h1>
							<p>Get your dream book here.</p>
							</Jumbotron>
						</Col>
					</Row>
			</Container>
		)
}
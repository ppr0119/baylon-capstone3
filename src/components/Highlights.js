import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

export default function Highlights(){
	
	return(


		<Row className="px-3">
			<Col xs={12} md={4}>
				<Card>
					<Card.Img variant="top" src="https://www.mitchalbom.com/wp-content/uploads/2015/07/us_ttk_carousel.png" />
					<Card.Body>
						<Card.Title>Learn from Home</Card.Title>
						<Card.Text>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident perspiciatis adipisci accusamus animi fugiat, similique, minus odit alias voluptatem blanditiis velit cupiditate voluptatibus dicta expedita consequuntur nobis ullam magni quae?
						</Card.Text>
				    	<Button variant="primary">Go somewhere</Button>
					</Card.Body>
				</Card>
			</Col>
			<Col xs={12} md={4}>
				<Card>
					<Card.Body>
						<Card.Title>Study Now, Pay Later</Card.Title>
						<Card.Text>
					      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident perspiciatis adipisci accusamus animi fugiat, similique, minus odit alias voluptatem blanditiis velit cupiditate voluptatibus dicta expedita consequuntur nobis ullam magni quae?
						</Card.Text>
				    	<Button variant="primary">Go somewhere</Button>
					</Card.Body>
				</Card>
			</Col>
			<Col xs={12} md={4}>
				<Card>
					<Card.Body>
						<Card.Title>Be Part of the Community</Card.Title>
						<Card.Text>
					      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident perspiciatis adipisci accusamus animi fugiat, similique, minus odit alias voluptatem blanditiis velit cupiditate voluptatibus dicta expedita consequuntur nobis ullam magni quae?
						</Card.Text>
				    	<Button variant="primary">Go somewhere</Button>
					</Card.Body>
				</Card>
			</Col>
		</Row>







		)
}



		
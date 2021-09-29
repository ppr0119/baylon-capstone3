import React, {useContext} from 'react';
import { Row, Col, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import UserContext from './../UserContext';

export default function Highlights(){

	const {user} = useContext(UserContext);
	
	return(


		<Row className="Highlights-row" >
			<Col className="Highlights-col" xs={12} md={6}>
				<Card>
					<Card.Body>
						<Card.Text className="Highlights-card">
							<p className="Highlights-quote">“That’s the thing when people leave us too suddenly, isn’t it? We always have so many questions.”</p>
							<p>― Mitch Albom, The First Phone Call from Heaven</p>
						</Card.Text>
				    	{
				    		(user.id !== null) ?
								<Link className="Highlights-btn btn" to={`/books`}>See Book Details</Link>
							:
								<Link className="Highlights-btn btn" to={`/collections`}>See Book Details</Link>
				    	}
					</Card.Body>
				</Card>
			</Col>
			<Col className="Highlights-col" xs={12} md={6}>
				<Card>
					<Card.Body>
						<Card.Text className="Highlights-card">
					      <p className="Highlights-quote">“Each affects the other, and the other affects the next, and the world is full of stories, but the stories are all one.”</p>
					      <p>― Mitch Albom, The Five People You Meet In Heaven</p>
						</Card.Text>
				    	{
				    		(user.id !== null) ?
								<Link className="Highlights-btn btn" to={`/books`}>See Book Details</Link>
							:
								<Link className="Highlights-btn btn" to={`/collections`}>See Book Details</Link>
				    	}
					</Card.Body>
				</Card>
			</Col>
		</Row>

		)
}



		
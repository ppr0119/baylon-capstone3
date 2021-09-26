import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import VisitorView from './../components/VisitorView';

export default function Collection(){
	const [books, setBooks] = useState([]);

	const allBooksNotUser = () => {

		fetch('https://polar-brushlands-73295.herokuapp.com/ecommerce/products/products',{
			method: "GET",
		})
		.then(result => result.json())
		.then(result => {
			setBooks(result)
		})
	}

	useEffect( () => {
		allBooksNotUser()
	}, [])
 
	return(
		<Container className="p-4">
			<VisitorView bookData={books} allBooksNotUser={allBooksNotUser} />
		</Container>
	)
}

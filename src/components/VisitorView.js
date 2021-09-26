import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import CollectionOfBooks from './CollectionOfBooks';

export default function VisitorView({bookData}){

	const [books, setBooks] = useState([])

	useEffect( () => {
		const arrayOfBooks = bookData.map( (books) => {
			if(books.isActive === true){
				return <CollectionOfBooks key={books._id} bookProp={books}/>
			} else {
				return null
			}
		})
		setBooks(arrayOfBooks)
	}, [bookData])

	return(
		<Container>
			{books}
		</Container>
	)
}
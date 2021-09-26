import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import Book from './Books';

export default function UserView({bookData}){

	const [books, setBooks] = useState([])

	useEffect( () => {
		const arrayOfBooks = bookData.map( (books) => {
			if(books.isActive === true){
				return <Book key={books._id} bookProp={books}/>
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
import React, {useState, useEffect, useContext} from 'react';
import {Container} from 'react-bootstrap';
import UserContext from './../UserContext';
import AdminView from './../components/AdminView.js';
import UserView from './../components/UserView.js';

export default function Books(){

	const {user} = useContext(UserContext);
	const [books, setBooks] = useState([]);

	const fetchData = () => {
		let token = localStorage.getItem('token')

		fetch('https://polar-brushlands-73295.herokuapp.com/ecommerce/products/allproducts',{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			setBooks(result)
		})
	}

	useEffect( () => {
		fetchData()
	}, [])
 
	return(
		<Container className="p-4">
			{ 
				(user.isAdmin === true) ?
					<AdminView bookData={books} fetchData={fetchData} />
				:
					<UserView bookData={books} />
			}
		</Container>
	)
}

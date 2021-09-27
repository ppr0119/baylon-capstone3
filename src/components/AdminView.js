import React, {useState, useEffect, Fragment} from 'react';
import {Container, Table, Button, Modal, Form} from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AdminView(props){
	const { bookData, fetchData } = props;
	const [bookId, setBookId] = useState('');
	const [books, setBooks] = useState([]);
	const [productName, setProductName] = useState('');
	const [productDescription, setProductDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [showEdit, setShowEdit] = useState(false);
	const [showAdd, setShowAdd] = useState(false);

	let token = localStorage.getItem('token');

	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);


	const openEdit = (bookId) => {
		fetch(`https://polar-brushlands-73295.herokuapp.com/ecommerce/products/products/${bookId}`,{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			setBookId(result._id);
			setProductName(result.productName);
			setProductDescription(result.productDescription);
			setPrice(result.price)
		})

		setShowEdit(true);
	}

	const closeEdit = () => {

		setShowEdit(false);
		setProductName("")
		setProductDescription("")
		setPrice(0)
	}

	useEffect( () => {
		const arrayOfBooks = bookData.map( (books) => {
			return(
				<tr key={books._id}>
					<td>{books.productName}</td>
					<td>{books.productDescription}</td>
					<td>{books.price}</td>
					<td>
						{
							(books.isActive === true) ?
								<span>Available</span>
							:
								<span>Unavailable</span>
						}
					</td>
					<td>
						<Fragment>
							<Button className="btn mr-3 mb-2"  variant="primary" size="md" 
							onClick={ ()=> openEdit(books._id) }>
								Update
							</Button>
							<Button className="btn mr-3 mb-2"  variant="danger" size="md"
							onClick={ () => deleteToggle(books._id)}>
								Delete
							</Button>
						</Fragment>

						{
							(books.isActive === true) ?
								<Button className="btn mr-3 mb-2"  variant="warning" size="md"
								onClick={()=> archiveToggle(books._id, books.isActive)}>
									Disable
								</Button>
							:
								
								<Button className="btn mr-3 mb-2"  variant="success" size="md"
								onClick={ () => unarchiveToggle(books._id, books.isActive)}>
									Enable
								</Button>
								
						}

					</td>
				</tr>
			)
		})

		setBooks(arrayOfBooks)

	}, [bookData])


	const updateBookInfo = (e, bookId) => {

		e.preventDefault()
		fetch(`https://polar-brushlands-73295.herokuapp.com/ecommerce/products/products/${bookId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				productName: productName,
				productDescription: productDescription,
				price: price
			})
		})
		.then(result => result.json())
		.then(result => {
			fetchData()
			if(typeof result !== "undefined"){

				Swal.fire({
					title: "Update Successful!",
					customClass: {
						title: 'swal-title',
					}
				})

				closeEdit();
			} else {

				fetchData()

				Swal.fire({
					title: "Something went wrong!",
					customClass: {
						title: 'swal-title',
					}
				})
			}
		})
	}


	const archiveToggle = (bookId, isActive) => {

		fetch(`https://polar-brushlands-73295.herokuapp.com/ecommerce/products/products/${bookId}/archive`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(result => result.json())
		.then(result => {
			fetchData();
			if(result === true){
				Swal.fire({
					title: "Successfully Archived",
					customClass: {
						title: 'swal-title',
					}
				
				})
			} else {
				fetchData();
				Swal.fire({
					title: "Something went wrong",
					customClass: {
						title: 'swal-title',
					}
				})
			}
		})
	}

	const unarchiveToggle = (bookId, isActive) => {
		fetch(`https://polar-brushlands-73295.herokuapp.com/ecommerce/products/products/${bookId}/unarchive`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(result => result.json())
		.then(result => {
			fetchData();
			if(result === true){
				Swal.fire({
					title: "Successfully Unarchived",
					customClass: {
						title: 'swal-title',
					}
				})
			} else {
				fetchData();
				Swal.fire({
					title: "Something went wrong",
					customClass: {
						title: 'swal-title',
					}
				})
			}
		})
	}

	const deleteToggle = (bookId) => {
		fetch(`https://polar-brushlands-73295.herokuapp.com/ecommerce/products/products/${bookId}/delete`, {
			method: "DELETE",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {

			fetchData();
			if(result === true){
				Swal.fire({
					title: "Deleted successfully!",
					customClass: {
						title: 'swal-title',
					}
				})
			} else {
				fetchData();
				Swal.fire({
					title: "Something went wrong",
					customClass: {
						title: 'swal-title',
					}
				})
			}
		})
	}

	const addBook = (e) => {
		e.preventDefault()
		fetch('https://polar-brushlands-73295.herokuapp.com/ecommerce/products/products', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				productName: productName,
				productDescription: productDescription,
				price: price
			})
		})
		.then(result => result.json())
		.then(result => {

			if(result === true){
				fetchData()

				Swal.fire({
					title: "Book successfully added!",
					customClass: {
						title: 'swal-title',
					}
					
				})

				setProductName("")
				setProductDescription("")
				setPrice(0)

				closeAdd();

			} else {
				fetchData();

				Swal.fire({
					title: "Something went wrong",
					customClass: {
						title: 'swal-title',
					}
					
				})
			}
		})
	}

	return(
		<Container>
			<div>
				<h2 className="text-center">Admin Dashboard</h2>
				<div className="d-flex justify-content-end mb-2">
					<Button variant="primary" onClick={openAdd}>Add New Book</Button>
				</div>
			</div>
			<Table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{books}
				</tbody>
			</Table>

			<Modal show={showEdit} onHide={closeEdit} className="Form">
				<Form onSubmit={ (e) => updateBookInfo(e, bookId) }>
					<Modal.Header>
						<Modal.Title className="title-modal">Update Book Information</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId="productName">
							<Form.Label>Book Title</Form.Label>
							<Form.Control
								type="text"
								value={productName}
								onChange={ (e)=> setProductName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="productDescription">
							<Form.Label>Book Summary</Form.Label>
							<Form.Control
								type="text"
								value={productDescription}
								onChange={ (e)=> setProductDescription(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								value={price}
								onChange={ (e)=> setPrice(e.target.value)}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="info" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>

			<Modal show={showAdd} onHide={closeAdd}>
				<Form onSubmit={ (e) => addBook(e) }>
					<Modal.Header>Add Book</Modal.Header>
					<Modal.Body>
						<Form.Group bookId="productName">
							<Form.Label>Title</Form.Label>
							<Form.Control 
								type="text"
								value={productName}
								onChange={(e)=> setProductName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group bookId="productDescription">
							<Form.Label>Book Summary</Form.Label>
							<Form.Control
								type="text"
								value={productDescription}
								onChange={(e)=> setProductDescription(e.target.value)}
							/>
						</Form.Group>
						<Form.Group bookId="productPrice">
							<Form.Label>Price</Form.Label>
							<Form.Control 
								type="number"
								value={price}
								onChange={(e)=> setPrice(e.target.value)}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeAdd}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</Container>
	)
}
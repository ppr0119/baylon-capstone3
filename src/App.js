import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserContext from './UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AddNewBook from './pages/AddNewBook';
import ErrorPage from './components/ErrorPage';
import Books from './pages/Books';
import UserOrder from './pages/UserOrder';
import Collection from './pages/Collection';

export default function App(){

	const [user, setUser] = useState(
		{
			id: null,
			isAdmin: null
		}
	);

	const unsetUser = () => {
		localStorage.clear();
		setUser({
			id: null,
			isAdmin: null
		})
	}

	useEffect( () => {
		let token = localStorage.getItem('token');
		fetch('https://polar-brushlands-73295.herokuapp.com/ecommerce/users/userDetails', {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {

			if(typeof result._id !== "undefined"){
				setUser({
					id: result._id,
					isAdmin: result.isAdmin
				})
			} else {
				setUser({
					id: null,
					isAdmin: null
				})
			}
		})
	}, [])



	return( 

	<UserContext.Provider value={{user, setUser, unsetUser}}> 
		<BrowserRouter>
			<AppNavbar/>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/books" component={Books}/>
				<Route exact path="/addbooks" component={AddNewBook}/>
				<Route exact path="/books/:bookId" component={UserOrder}/>
				<Route exact path="/collections" component={Collection}/>
				<Route component={ErrorPage}/>
			</Switch>
		</BrowserRouter>
	</UserContext.Provider>
	)
}
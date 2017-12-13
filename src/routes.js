"use strict"

//React
import React from 'react';
import {render} from 'react-dom';
//import {Provider} from 'react-redux';
// import {applyMiddleware,createStore} from 'redux';
//middleware
//import {createLogger} from 'redux-logger';
// import thunk from 'redux-thunk';


//router
import {Router,Route,browserHistory, IndexRoute,hashHistory} from 'react-router';
// import reducers from './reducers/index';

// import {addToCart} from './actions/cartActions';
// import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

//components
import BooksList from './components/pages/bookList';
import Cart from './components/pages/cart';
import BookForm from './components/pages/bookForm';
import Menu from './components/pages/menu';
import Main from './main';
import Footer from './components/pages/footer';

const routes = (
		<Router history={browserHistory}>
			<Route path='/' components={Main}>
				<IndexRoute  component={BooksList} />
					<Route path='/admin' component={BookForm} />
				<Route path='/cart' component={Cart} />
			</Route>
		</Router>
)

export default routes;



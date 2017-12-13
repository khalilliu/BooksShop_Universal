"use strict"

//React
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware,createStore} from 'redux';
//middleware
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';


//router
import {Router,Route,browserHistory, IndexRoute,hashHistory} from 'react-router';
import reducers from './reducers/index';

import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

//create the store
const middleware = applyMiddleware( thunk, createLogger() );
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState ,middleware);

import routes from './routes';

const myRoutes = (
	<Provider store={store}>
		{routes}
	</Provider>
)

render(myRoutes, document.getElementById('app'));


//actions

store.subscribe(function(){
	console.log('current state is :' , store.getState());
})

//create and dispatch actions
// store.dispatch(postBooks(
// 	[

// 	]
// ))


// store.dispatch({
// 	type:"DELETEBOOK", payload: {id:2}	
// });
// store.dispatch(updateBooks(
// 	{id:1,title:'i change this book'}	
// ))

// store.dispatch(addToCart([{id:1}]));

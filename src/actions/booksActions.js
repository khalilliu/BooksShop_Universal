"use strict"

import axios from 'axios';
//get a book
export function getBooks(){
	return function(dispatch){
		axios.get('/api/books')
			.then(function(res){
				console.log(res);
				dispatch({type:"GET_BOOK", payload: res.data})
			})
			.catch(function(err){
				dispatch({type:"GET_BOOK_REJECTED", payload: err})
			})
	}
}

//reset book button


//post a book
export function postBooks(book){
	// return {
	// 	type:"POST_BOOK",
	// 	payload: book
	// }
	
	return function(dispatch){
		axios.post('/api/books',book[0])
			.then(function(res){
				dispatch({type:"POST_BOOK", payload: res.data})
			})
			.catch(function(err){
				dispatch({type:"POST_BOOK_REJECTED", payload: "there was an error while posting a new book"})
			})
	}
}


//delete a book
export function deleteBooks(id){
	// return {
	// 	type:"DELETE_BOOK",
	// 	payload: id
	// }
	console.log(id)
	return function(dispatch){
		axios.delete('/api/books/'+ id)
		.then(function(res){
			dispatch({type:"DELETE_BOOK",payload:id})
		})
		.catch(function(err){
				dispatch({type:"DELETE_BOOK_REJECTED", payload: "there was an error while delete a  book"})
		})
	}
}

//update a book

export function updateBooks(book){
	return {
		type:"UPDATE_BOOK",
		payload: book
	}
}

export function resetButton(){
	return {
		type: "RESET_BUTTON"
	}
}


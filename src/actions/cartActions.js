"use strict"
import axios from 'axios';

//get cart
export function getCart(){
	return function(dispatch){
		axios.get('/api/cart')
			.then(function(res){
				dispatch({type:"GET_CART",payload:res.data})
			})
			.catch(function(err){
				dispatch({type:"GET_CART_REJECTED",msg:"err when get the cart from session"})
			})
	}
}

//add to cart
export function addToCart(cart){
	// return {
	// 	type:"ADD_TO_CART",
	// 	payload: book
	// }
	return function(dispatch){
		axios.post('/api/cart', cart)
			.then(function(res){
				console.log(res);
				dispatch({type:"POST_CART",payload:res.data})
			})
			.catch(function(err){
				dispatch({type:"POST_CART_REJECTED",msg:"err when post the cart "})
			})
	}
}

//update to cart quantity
export function updateCart(_id,unit,cart){
	// return {
	// 	type:"UPDATE_CART",
	// 	_id:_id,
	// 	unit: unit
	// }
	//create a copy from the array of books
	const currentBookToUpdate = [...cart];
	const indexToUpdate = currentBookToUpdate.findIndex(function(book){return book._id === _id});
	const newBookToUpdate = {...currentBookToUpdate[indexToUpdate], quantity:currentBookToUpdate[indexToUpdate].quantity + unit}

	let cartUpdate = [...currentBookToUpdate.slice(0,indexToUpdate),newBookToUpdate,...currentBookToUpdate.slice(indexToUpdate+1)];

	return function(dispatch){
		axios.post('/api/cart',cartUpdate)
			.then(function(res){
				dispatch({type:"UPDATE_CART",payload:res.data})
			})
			.catch(function(err){
				dispatch({type:"UPDATE_CART_REJECTED",meg:"error when adding to the cart"})
			})
	}
}


//delete cart 
//export function deleteCartItem(book){
	// return {
	// 	type:"DELETE_CART_ITEM",
	// 	payload: book
	// }
export function deleteCartItem(cart){
	return function(dispatch){
		axios.post('/api/cart',cart)
			.then(function(res){
				dispatch({type:"DELETE_CART_ITEM",payload:res.data})
			})
			.catch(function(err){
				dispatch({type:"DELETE_CART_ITEM_REJECTED",msg:"error when deleting an item from the cart"})
			})
	}
}
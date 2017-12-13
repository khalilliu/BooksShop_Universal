"use strict"

//cart reducers
export function cartReducers(state={cart:[],totalAmount:0}, action){
	switch(action.type){
		case "GET_CART":
			return {...state, cart:action.payload, totalAmount: totals(action.payload).amount,totalQty:totals(action.payload).qty}
		break;

		case "POST_CART":
		//console.error(...state.cart, action.payload);
		return {...state, cart:action.payload,totalAmount:totals(action.payload).amount,totalQty:totals(action.payload).qty}		
		break;

		case "UPDATE_CART":
		return {...state, cart:action.payload, 
			totalAmount: totals(action.payload).amount,
			totalQty: totals(action.payload).qty
		}
		break;

		case "DELETE_CART_ITEM":
		//console.error(...state.cart, action.payload);
		return {...state,
			cart:action.payload,
			totalAmount: totals(action.payload).amount,
			totalQty:totals(action.payload).qty
		}
		break;
		// console.error(fil)
		// let indexToDelete = state.cart.findIndex(function(book){return book._id === action.payload._id});
		// return {cart: [...state.cart.slice(0,indexToDelete), ...state.cart.slice(indexToDelete+1)]}
		// break;
	}
	return state;
}

//calculate totals
export function totals(payloadArr){
	const totalAmount = payloadArr.map(function(cartArr){
		return cartArr.price * cartArr.quantity;
	}).reduce(function(a,b){return a + b}, 0);

	const totalQty = payloadArr.map(function(cartArr){
		return  cartArr.quantity;
	}).reduce(function(a,b){return a + b}, 0);

	return {amount: totalAmount.toFixed(2), qty: totalQty}
}
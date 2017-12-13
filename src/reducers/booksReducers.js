"use strict"

// define reducers
export function booksReducers(state={
	books:[]
}, action){
	switch(action.type){

		case "GET_BOOK":
		return {...state, books:[...action.payload]};
		break;

		case "POST_BOOK":
		return {...state, books: [...state.books, action.payload], msg:'save! Click to continue', style:'success',validation:'success'}; //new state
		break;

		case "POST_BOOK_REJECTED":
		return {...state,msg:"please, try again",style:'danger',validation:'error'}
		break;

		case "DELETE_BOOK":
		const currentBookToDelete = [...state.books];
		const indexToDelete = currentBookToDelete.findIndex(
			function(book){return book._id === action.payload}
		);
		return { books: [...currentBookToDelete.slice(0, indexToDelete),...currentBookToDelete.slice(indexToDelete + 1)] }
		break;

		case "UPDATE_BOOK":
		const currentBookToUpdate = [...state.books];
		const indexToUpdate = currentBookToUpdate.findIndex((book)=> {return book._id === action.payload._id});
		//console.log(currentBookToUpdate[indexToUpdate]);
		//const newBookToUpdate = Object.assign({},currentBookToUpdate[indexToUpdate],{title:action.payload.title});
		const newBookToUpdate = {
			...currentBookToUpdate[indexToUpdate],
			title: action.payload.title
		}

		return {books: [...currentBookToUpdate.slice(0,indexToUpdate), newBookToUpdate , ...currentBookToUpdate.slice(indexToUpdate + 1)]};
		break;

		case "RESET_BUTTON":
		return{ ...state, msg:null,style: 'primary',validation:null};
		break;
	}
	return state;
}
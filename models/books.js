var mongoose = require('mongoose');
var bookShcema = new mongoose.Schema({
	title: String,
	description: String,
	images: String,
	price: Number
});

var Books = mongoose.model('books',bookShcema);

module.exports = Books;
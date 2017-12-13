var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');

var MongoStore = require('connect-mongo')(session);
// var index = require('./routes/index');
// var users = require('./routes/users');


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//default routes
// app.use('/', index);
// app.use('/users', users);
require('./models/books');

//APIs
var dbconfig = require('./config/database');

var mongoose = require('mongoose');
var Book = mongoose.model('books');
mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.databaseUrl, {useMongoClient: true})
.then(()=>{console.log('mongodb connected...')})
.catch((err)=>{console.log(err)});

var db = mongoose.connection;
db.on('error',console.log.bind(console, '#MongoDB - connection error:'));

//--------->>> SET UP SESSIONS <<<-------//
app.use(session({
	secret:"secret",
	saveUninitialized:false,
	resave:false,
	cookie:{
		maxAge: 1000*60*60*24*2
	},
	store: new MongoStore({mongooseConnection: db, ttl: 2*24*60*60})
}));

//--------->>>SAVE SESSION CART API<<-------//
app.post('/cart',(req,res)=>{
	var cart = req.body;
	req.session.cart = cart;
	req.session.save(function(err){
		if(err){console.log('# API POST CART SESSION:',err)
};
		res.json(req.session.cart);
	})
})
//--------->>>GET SESSION CART API<<-------//
app.get('/cart',(req,res)=>{
	if(typeof req.session.cart !== "undefined"){
		res.json(req.session.cart);
	}
})

//--------->>>Post Books<<<-------//
app.post('/books',(req,res)=>{
	var book = req.body;
	var newBook = new Book(book);
	newBook.save()
	.then(books =>{res.json(books)})
	.catch(err => {res.send(err)});
})
//--------->>>get Books<<<-------//
app.get('/books',(req,res)=>{
	Book.find({})
	.then(books => {res.json(books)})
	.catch(err => {res.send(err)});
})

//--------->>>get Books<<<-------//
app.delete('/books/:_id',(req,res)=>{
	var query = {_id: req.params._id};
	Book.remove(query, (err,books)=>{
		if(err){throw err}
		res.json(books);
	})
})

//--------->>>update Books<<<-------//
app.put('/books/:_id',(req,res)=>{
	var book = req.body;
	var query = req.params._id;
	var update = {
		"$set":{
			title: book.title || 'default title',
			description: book.description || 'default description',
			image: book.image || 'default image',
			price: book.price || 0.00
		}
	};

	var options = {new: true};
	Book.findOneAndUpdate(query, update, options, (err,books)=>{
		if(err){throw err}
		res.json(books);
	})
})

//--------->>>GET Books IMAGES API<<<-------//
app.get('/images',function(req,res){
	const imgFolder = __dirname + '/public/images';
	const fs = require('fs');
	fs.readdir(imgFolder,function(err,files){
		if(err){return console.log(err);}
		//create an empty array
		const filesArr = [];
		files.forEach(function(file){
			filesArr.push({name: file});
		})

		res.json(filesArr);
	})
})



//End APIS

app.listen(3001,function(err){
	if(err){console.log(err)}
	console.log("API server is listening on port 3001")
})

//module.exports = app;

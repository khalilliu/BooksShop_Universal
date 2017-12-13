"use strict"
//var exphbs  = require('express-handlebars');
var express = require('express'),
	app = express(),
	path = require('path');
	

//middleware
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'public'));

// app.get('*',(req,res)=>{
// 	res.sendFile(path.resolve(__dirname, 'public',index.html));
// })
// app.set('views',path.join(__dirname, 'public'));
// app.engine('handlebars',exphbs({
// 	defaultLayout: 'index', 
//   extname: '.handlebars',
//   layoutsDir:path.join(__dirname, 'public'),
// }));

// app.set('view engine','handlebars');
//注意这里要使用'use' 而不要使用'get';
app.use('*',(req,res)=>{
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(3000, function(){
	console.log('app start at 3000')
})
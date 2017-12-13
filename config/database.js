if(process.env.NODE_ENV === 'production'){
	module.exports = {databaseUrl: "mongodb://localhost/pro_bookshop"}
}else{
	module.exports = {databaseUrl: "mongodb://localhost/bookshop"}
}
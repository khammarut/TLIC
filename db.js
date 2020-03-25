var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/tlic_db' , {useNewUrlParser : true})

var db = mongoose.connection;
db.on('error' , console.error.bind(console,'connection error : '))
db.once('open' , function(){
    console.log('Connect DB Success')
})
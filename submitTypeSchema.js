var mongoose = require('mongoose')

var submitTypeSchema = mongoose.Schema({
    Name : {type:String , require:true},
    Surname : {type:String , require:true},
    Email : {type:String , require:true},
    CMUAccount : {type:String , require:true},
    Departments : {type:String , require:true},
    CourseCode : {type:String , require:true},
    Subject : {type:String , require:true},
    Develop : {type:String , require:true},
    Degree : {type:String , require:true},
    Count : {type:String , require:true},
    TypeOne : {type:String , require:true},
    TypeTwo : {type:String , require:true},
    otpCode : {type:String , require:true},
    Date : {type:Date , default : Date.now}
})

var submitTypeModel = mongoose.model('submitTypes' , submitTypeSchema)
module.exports = submitTypeModel
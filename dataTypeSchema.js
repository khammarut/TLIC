var mongoose = require('mongoose')

var dataTypeSchema = mongoose.Schema({
    Name : {type:String , require:true},
    Surname : {type:String , require:true},
    CMUAccount : {type:String , require:true},
    Departments : {type:String , require:true},
    TypeA : {type:Number , require:true , default : 0},
    TypeB : {type:Number , require:true , default : 0},
    TypeC : {type:Number , require:true , default : 0},
    TypeMOOC : {type:Number , require:true , default : 0},
    TypeInnovation : {type:Number , require:true , default : 0}
})

var dataTypeModel = mongoose.model('dataTypes' , dataTypeSchema)
module.exports = dataTypeModel
const mongoose = require("mongoose");

const questionnarySchema = mongoose.Schema({
    question : {type : String, required : true},
    options : {type : Array, required : true},
    type : {type : String},
    created_at : {type : Date,required : true},
    updated_at : {type : Date,},
    created_by : {type:String, required : true},
    updated_by : {type:String},
    string_answer : {type : String, required : true},
})

module.exports = mongoose.model("Questionnary", questionnarySchema);
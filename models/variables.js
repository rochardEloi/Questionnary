const mongoose = require("mongoose");

const variablesSchema = mongoose.Schema({
    name : {type : String, required : true},
    string_value : {type : String},
    number_value : {type : Number},
    boolean_value : {type : Boolean},
    array_value : {type : Array},
    object_value : {type : Object}, 
    created_at : {type : Date},
    updated_at : {type : Date},
    created_by : {type : String}, 
    updated_by : {type : String},
})

module.exports = mongoose.model("Variables", variablesSchema);
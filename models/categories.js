const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
    name : {type : String, required : true},
    internal_name : {type : String, required : true},
    
})
const mongoose = require("mongoose");

const responsesSchema = mongoose.Schema({
    user_id : {type : String, required : true},
    generated_questions : {type : Object, required : true},
    answers : {type : Array, required : true},
    timeout : {type : Object, required : true},
    score : {type : Number,},
    total_questions : {type : Number,},
    right_answers_number : {type : Number, },
    wrong_answers_number : {type : Number,},
    is_passed : {type : Boolean,},
    created_at : {type : Date, required : true},
    updated_at : {type : Date},
    created_by : {type : String, required : true},
    updated_by : {type : String},
})

module.exports = mongoose.model("Responses", responsesSchema);

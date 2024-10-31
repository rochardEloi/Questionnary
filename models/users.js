const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    lastname : {type : String, required : true},
    firstname : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    status : {type : String, required : true, default : "PENDING"},
    role : {type : String, required : true},
    itentity_card_front : {type : String},
    itentity_card_back : {type : String},
    created_at : {type : Date, default : Date.now}
})

module.exports = mongoose.model("Users", userSchema);

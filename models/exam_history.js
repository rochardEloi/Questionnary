const mongoose = require("mongoose");


const historySchema = mongoose.Schema({
    user_id : {type : String, required : true},
    datas : {type : Object }
})

module.exports = mongoose.model("exam_histories", historySchema)
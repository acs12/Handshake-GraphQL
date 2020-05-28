const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


const messageSchema = mongoose.Schema({
        type : {type: String, default : null},
    user1 : {type : ObjectId, ref : "Company"},
    user2 : {type : ObjectId},
    chat: [{
        from : {type : ObjectId},
        to : {type : ObjectId},
        text : String,
        date : Date
    }],
})

module.exports = mongoose.model("Message", messageSchema)
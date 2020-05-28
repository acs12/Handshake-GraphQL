const mongoose = require('mongoose');


const companySchema = mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true},
    phoneNumber: Number,
    dateOfBirth : Date,
    location : String,
    description : String,
    profilePicUrl: String,
    password : {type : String, required : true},
}) 

module.exports = mongoose.model("Company", companySchema)
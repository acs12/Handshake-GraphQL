const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const studentSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name : {type : String, required : true},
    email : {type : String, required : true},
    phoneNumber: String,
    dateOfBirth : String,
    schoolName : {type : String, required : true},
    address : String,
    city : String,
    state : String,
    country : String,
    gradDate : String,
    major : String,
    profilePicUrl: String,
    careerObjective : String,
    password : {type : String, required : true},
    resumeUrl : String,
    skills : [{
        id:ObjectId,
        skillName: String
    }],
    education : {
        id :  ObjectId,
        collegeName : String,
        educationLocation : String,
        degree : String,
        major : String,
        yearOfPassing : Number,
        cgpa : String
    },
    experience : {
        id : ObjectId,
        companyName : String,
        companyLocation : String,
        title : String,
        startDate : String,
        endDate : String,
        description : String
    }
}) 

module.exports = mongoose.model("Student", studentSchema)
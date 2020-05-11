const mongoose = require('mongoose');
const Student = require("../models/students")
const Company = require("../models/company")
var ObjectId = mongoose.Schema.Types.ObjectId;


const jobSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    companyId: { type: ObjectId, ref: "Company" },
    title: { type: String, required: true },
    location: String,
    postedDate: Date,
    deadlineDate: Date,
    salary: Number,
    description: String,
    category: String,
    application: [
        {
            studentId: { type: ObjectId, ref: "Student" },
            status: String,
            applicationDate : Date
        }
    ]
})

module.exports = mongoose.model("Job", jobSchema)
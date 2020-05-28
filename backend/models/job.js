const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


const jobSchema = mongoose.Schema({
    companyId: { type: ObjectId, ref: "Company" },
    title: { type: String, required: true },
    location: String,
    postedDate: String,
    deadlineDate: String,
    salary: Number,
    description: String,
    category: String,
    application: [
        {
            studentId: { type: ObjectId, ref: "Student" },
            status: String,
            applicationDate : String
        }
    ]
})

module.exports = mongoose.model("Job", jobSchema)
const Company = require("../models/company");
const Jobs = require("../models/job");
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const updateCompany = async (args) => {
    let company = await Company.updateOne({ _id: args.id }, {
        $set: {
            name: args.name,
            email: args.email,
            location: args.location,
            phoneNumber: args.phoneNumber,
            description: args.description,
        }
    });
    const payload = { company: company };
    var token = jwt.sign(payload, secret, {
        expiresIn: 1008000
    });
    token = 'JWT ' + token;
    return { status: 200, message: token };
}


const addJob = async (args) => {
    console.log("Add job",addJob)
    let job = await new Jobs(
        {
            companyId: args.companyId,
            title: args.title,
            location: args.location,
            postedDate: args.postedDate,
            deadlineDate: args.deadlineDate,
            salary: args.salary,
            description: args.description,
            category: args.category,
        }
    );

    let added = job.save()
    if (added) {
        return { status: 200, message: "Successfully Added" };
    }
}

exports.updateCompany = updateCompany;
exports.addJob = addJob;
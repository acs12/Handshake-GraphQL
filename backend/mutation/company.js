const Student = require("../models/students");
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

    let added  = job.save()
    const payload = { job: added };
    var token = jwt.sign(payload, secret, {
        expiresIn: 1008000
    });
    token = 'JWT ' + token;
    return { status: 200, message: token };
}
// const ApplyToJob = async (args) => {
//     let apply = await Jobs.updateOne({ _id: args.jobId }, {
//         $push: {
//             application: {
//                 studentId : args.studentId,
//                 status : "pending",
//                 applicationDate : Date.now()
//             }
//         }
//     });

//     console.log("Apply",apply)
//     const payload = { apply: apply };
//     var token = jwt.sign(payload, secret, {
//         expiresIn: 1008000
//     });
//     token = 'JWT ' + token;
//     return { status: 200, message: "success" };
// }

exports.updateCompany = updateCompany;
exports.addJob = addJob;
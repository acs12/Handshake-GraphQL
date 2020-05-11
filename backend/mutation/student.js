const Student = require("../models/students");
const Jobs = require("../models/job");
// const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const updateStudent = async (args) => {
    let student = await Student.updateOne({ _id: args.id }, {
        $set: {
            name: args.name,
            dateOfBirth: args.dateOfBirth,
            address: args.address,
            city: args.city,
            state: args.state,
            country: args.country,
            phoneNumber: args.phoneNumber,
            gradDate: args.gradDate,
            major: args.major,
            careerObjective: args.careerObjective,
        }
    });
    const payload = { student: student };
    var token = jwt.sign(payload, secret, {
        expiresIn: 1008000
    });
    token = 'JWT ' + token;
    return { status: 200, message: token };
}

const updateEducation = async (args) => {
    let education = await Student.updateOne({ _id: args.id }, {
        $set: {
            education: {
                collegeName: args.collegeName,
                educationLocation: args.educationLocation,
                degree: args.degree,
                major: args.major,
                yearOfPassing: args.yearOfPassing,
                cgpa: args.cgpa,
            }
        }
    });
    const payload = { education: education };
    var token = jwt.sign(payload, secret, {
        expiresIn: 1008000
    });
    token = 'JWT ' + token;
    return { status: 200, message: token };
}

const updateExperience = async (args) => {
    let experience = await Student.updateOne({ _id: args.id }, {
        $set: {
            experience: {

                companyName: args.companyName,
                companyLocation: args.companyLocation,
                title: args.title,
                startDate: args.startDate,
                endDate: args.endDate,
                description: args.description
            }
        }
    });
    const payload = { experience: experience };
    var token = jwt.sign(payload, secret, {
        expiresIn: 1008000
    });
    token = 'JWT ' + token;
    return { status: 200, message: token };
}

const ApplyToJob = async (args) => {
    let apply = await Jobs.updateOne({ _id: args.jobId }, {
        $push: {
            application: {
                studentId : args.studentId,
                status : "pending",
                applicationDate : Date.now()
            }
        }
    });
    
    console.log("Apply",apply)
    const payload = { apply: apply };
    var token = jwt.sign(payload, secret, {
        expiresIn: 1008000
    });
    token = 'JWT ' + token;
    return { status: 200, message: "success" };
}

exports.updateEducation = updateEducation;
exports.updateExperience = updateExperience;
exports.updateStudent = updateStudent;
exports.ApplyToJob = ApplyToJob;
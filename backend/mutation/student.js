const Student = require("../models/students");
const Jobs = require("../models/job");
// const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const updateStudent = async (args) => {
    console.log("args", args)
    if (args.careerObjective) {
        let student = await Student.updateOne({ _id: args.id }, {
            $set: {
                careerObjective: args.careerObjective,
            }
        });
        if (student) {
            return { status: 200, message: "Success" };
        }
    }
    else if (args.phoneNumber) {
        let student = await Student.updateOne({ _id: args.id }, {
            $set: {
                email: args.email,
                phoneNumber: args.phoneNumber,
            }
        });
        if (student) {
            return { status: 200, message: "Success" };
        }
    }
    else {
        let student = await Student.updateOne({ _id: args.id }, {
            $set: {
                name: args.name,
                dateOfBirth: args.dateOfBirth,
                address: args.address,
                city: args.city,
                state: args.state,
                country: args.country,
                gradDate: args.gradDate,
                major: args.major,
            }
        });
        if (student) {
            return { status: 200, message: "Success" };
        }
    }

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
    if (education) {
        return { status: 200, message: "success" };
    }
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
    if (experience) {
        return { status: 200, message: "success" };
    }
}

const ApplyToJob = async (args) => {
    console.log(args)
    let apply = await Jobs.updateOne({ _id: args.jobId }, {
        $push: {
            application: {
                studentId: args.studentId,
                status: "pending",
                applicationDate: Date.now()
            }
        }
    });

    console.log("Apply", apply)
    const payload = { apply: apply };
    var token = jwt.sign(payload, secret, {
        expiresIn: 1008000
    });
    token = 'JWT ' + token;
    return { status: 200, message: "Applied Successfully" };
}

exports.updateEducation = updateEducation;
exports.updateExperience = updateExperience;
exports.updateStudent = updateStudent;
exports.ApplyToJob = ApplyToJob;
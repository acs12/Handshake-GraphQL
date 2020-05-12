const Student = require("../models/students");
const Company = require("../models/company");
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const login = async (args) => {
    let student = await Student.findOne({ email: args.email });
    console.log("Stud",student)
    if (student === null) {
        return { status: 401, message: "Student_not_registered" };
    }
    if(student.schoolName === args.schoolName){
        if (passwordHash.verify(args.password, student.password)) {
            const payload = { id: student._id, name: student.name, email: student.email };
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000
            });
            token = 'JWT ' + token;
            return { status: 200, message: token };
        }
        else {
            return { status: 401, message: "Incorrect_Password" };
        }
    }
    else{
        return { status: 401, message: "Incorrect_School_Name" };
    }
}

const Companylogin = async (args) => {
    let company = await Company.findOne({ email: args.email });
    if (company === null) {
        return { status: 401, message: "Company_Not_Registered." };
    }
    if (passwordHash.verify(args.password, company.password)) {
        const payload = { id: company._id, name: company.name, email: company.email };
        var token = jwt.sign(payload, secret, {
            expiresIn: 1008000
        });
        token = 'JWT ' + token;
        return { status: 200, message: token };
    }
    else {
        return { status: 401, message: "Incorrect_Password" };
    }
}

exports.login = login;
exports.Companylogin = Companylogin;
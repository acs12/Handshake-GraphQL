const Student = require("../models/students");
const Company = require("../models/company");
const passwordHash = require('password-hash');

const studentSignup = async (args) => {
    let hashedPassword = passwordHash.generate(args.password);
    let newStudent = new Student({
        name: args.name,
        email: args.email,
        password: hashedPassword,
        schoolName: args.schoolName
    });
    let student = await Student.find({ email: args.email });
    if (student.length) {
        return { status: 400, message: "Student_Already_Exists" };
    }
    let result = await newStudent.save();
    if (result) {
        return { status: 200, message: "Student_Successfully_Signed_Up" };
    }
    else {
        return { status: 500, message: "Internal_Server_Error" };
    }
};

const companySignup = async (args) => {
    let hashedPassword = passwordHash.generate(args.password);
    let newCompany = new Company({
        name: args.name,
        email: args.email,
        password: hashedPassword,
        location: args.location
    });


    let company = await Company.find({ email: args.email });
    if (company.length) {
        return { status: 400, message: "Company_Already_Registered" };
    }
    let result = await newCompany.save();
    if (result) {
        return { status: 200, message: "Company_Added" };
    }
    else {
        return { status: 500, message: "Internal_Server_Error" };
    }
};

exports.studentSignup = studentSignup;
exports.companySignup = companySignup;
const graphql = require('graphql');
// const User = require("../dbSchema/users");
const Student = require("../models/students")
const Company = require("../models/company")
const Jobs = require("../models/job")
const { studentSignup, companySignup } = require("../mutation/signup")
const { login, Companylogin } = require("../mutation/login")
const { updateStudent, updateEducation, updateExperience, ApplyToJob } = require("../mutation/student")
const { updateCompany, addJob } = require("../mutation/company")

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    gradDate: { type: GraphQLString },
    major: { type: GraphQLString },
    careerObjective: { type: GraphQLString },
    education: { type: EducationType },
    experience: { type: ExperienceType }

  })
});

const ExperienceType = new GraphQLObjectType({
  name: 'Experience',
  fields: () => ({
    _id: { type: GraphQLID },
    companyName: { type: GraphQLString },
    companyLocation: { type: GraphQLString },
    title: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

const EducationType = new GraphQLObjectType({
  name: 'Education',
  fields: () => ({
    _id: { type: GraphQLID },
    collegeName: { type: GraphQLString },
    educationLocation: { type: GraphQLString },
    degree: { type: GraphQLString },
    major: { type: GraphQLString },
    yearOfPassing: { type: GraphQLInt },
    cgpa: { type: GraphQLString },
  })
});

const companyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    location: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    description: { type: GraphQLString },
  })
});


const JobType = new GraphQLObjectType({
  name: 'Job',
  fields: () => ({
    _id: { type: GraphQLID },
    companyId: { type: GraphQLID },
    title: { type: GraphQLString },
    location: { type: GraphQLString },
    postedDate: { type: GraphQLString },
    deadlineDate: { type: GraphQLString },
    salary: { type: GraphQLInt },
    description: { type: GraphQLString },
    category: { type: GraphQLString },
    application: { type: GraphQLList(applicationType) }
    // application: [
    //     {
    //         studentId: { type: GraphQLID },
    //         status: { type: GraphQLString },
    //         applicationDate : { type: GraphQLString }
    //     }
    // ]
  })
});


const applicationType = new GraphQLObjectType({
  name: 'Application',
  fields: () => ({
    studentId: { type: GraphQLID },
    applicationDate: { type: GraphQLString }
  })
})

const Response = new GraphQLObjectType({
  name: 'Status',
  fields: () => ({
    StudentObj: { type: GraphQLList(StudentType) },
    JobObj: { type: GraphQLList(JobType) },
    status: { type: GraphQLString },
    message: { type: GraphQLString }
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    Student: {
      type: StudentType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        let stud = await Student.findById({ _id: args.id });
        if (stud) {
          return stud;
        }
      }
    },
    Company: {
      type: companyType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        let comp = await Company.findById({ _id: args.id });
        if (comp) {
          return comp;
        }
      }
    },
    AllStudents: {
      type: Response,
      // args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        let students = await Student.find();
        if (students) {
          return { status: 200, StudentObj: students };
        }
      }
    },
    AllJobs: {
      type: Response,
      args: {
        id: { type: GraphQLString },
        companyId: { type: GraphQLString }
      },
      async resolve(parent, args) {
        if (args.companyId) {
          let jobs = await Jobs.find({ companyId: args.companyId });
          if (jobs) {
            return { status: 200, JobObj: jobs };
          }
        }
        else {
          let jobs = await Jobs.find({ "application.studentId": { $ne: args.id } });
          if (jobs) {
            return { status: 200, JobObj: jobs };
          }
        }
      }
    },
    AllApplication: {
      type: Response,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        let jobs = await Jobs.find({ "application.studentId": { $in: args.id } });
        if (jobs) {
          return { status: 200, JobObj: jobs };
        }
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    Studentsignup: {
      type: Response,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        schoolName: { type: GraphQLString },
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        return studentSignup(args);
      }
    },
    CompanySignup: {
      type: Response,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        location: { type: GraphQLString },
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        return companySignup(args);
      }
    },
    StudentLogin: {
      type: Response,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return login(args);
      }
    },
    CompanyLogin: {
      type: Response,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Companylogin(args);
      }
    },
    CompanyUpdate: {
      type: Response,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        location: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parent, args) {
        return updateCompany(args);
      }
    },
    AddJob: {
      type: Response,
      args: {
        // id: { type: GraphQLID },
        companyId: { type: GraphQLID },
        title: { type: GraphQLString },
        location: { type: GraphQLString },
        postedDate: { type: GraphQLString },
        deadlineDate: { type: GraphQLString },
        salary: { type: GraphQLInt },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
      },
      resolve(parent, args) {
        return addJob(args);
      }
    },
    StudentUpdate: {
      type: Response,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        gradDate: { type: GraphQLString },
        major: { type: GraphQLString },
        careerObjective: { type: GraphQLString }
      },
      resolve(parent, args) {
        return updateStudent(args);
      }
    },
    EducationUpdate: {
      type: Response,
      args: {
        id: { type: GraphQLID },
        collegeName: { type: GraphQLString },
        educationLocation: { type: GraphQLString },
        degree: { type: GraphQLString },
        major: { type: GraphQLString },
        yearOfPassing: { type: GraphQLInt },
        cgpa: { type: GraphQLString },
      },
      resolve(parent, args) {
        return updateEducation(args);
      }
    },
    ExperienceUpdate: {
      type: Response,
      args: {
        id: { type: GraphQLID },
        companyName: { type: GraphQLString },
        companyLocation: { type: GraphQLString },
        title: { type: GraphQLString },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parent, args) {
        return updateExperience(args);
      }
    },
    ApplyToJob: {
      type: Response,
      args: {
        jobId: { type: GraphQLID },
        studentId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return ApplyToJob(args);
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

// const typeDefs = gql`

// type jobs {
//   companyId : Id!,
//   title : String!,
//   location : String!,
//   postedDate :  Date!,
//   deadlineDate : Date!,
//   salary : Number!,
//   category : String!
//   application : Array!
// }

// input Login {
//     email : String!,
//     password : String!
//  }

// input StudentSignup{
//   name : String!,
//   email : String!,
//   password : String!
// }

//  input CompanySignup{
//    name : String!,
//    email : String!,
//    password : String!,
//    location " String!
//  }

//  type Query{
//    getJobs(id : String!) : [jobs]
//  }`;

// const resolvers = {
//   Query: {
//     async getJobs(root,{
//       input
//     }) {
//       return await Jobs.find({
//         "application.studentId" : {$nin : [input.id]}
//       });
//     },
//   }
// }

// const server = new ApolloServer({ typeDefs, resolvers });
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });


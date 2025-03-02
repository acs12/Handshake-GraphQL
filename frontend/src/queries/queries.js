import { gql } from 'apollo-boost';

const QueryAllJobs = gql`
    query($id: String, $companyId : String, $title : String, $companyName : String){
        AllJobs(id: $id, companyId : $companyId, title : $title, companyName : $companyName) {
            status
            CompanyJobObj{
              _id
              companyId
              title
              location
              postedDate
              deadlineDate
              salary
              description
              category
              application {
                studentId {
                  id
                    name
                    schoolName
                    email
                    gradDate
                    education {
                      collegeName
                      educationLocation
                      degree
                      major
                      yearOfPassing
                      cgpa
                    }
                    experience {
                      companyName
                      companyLocation
                      title
                      startDate
                      endDate
                      description
                    }
                    major
                    careerObjective
                }
                applicationDate
              } 
            }
            JobObj {
                _id
                companyId{
                    name
                    email
                    location
                    phoneNumber
                    description
                }
                title
                location
                postedDate
                deadlineDate
                salary
                description
                category
                }
        }
    }
`;

const QueryAppliedJobs = gql`
    query($id: String){
        AllApplication(id: $id) {
            status
            JobObj {
                companyId{
                    name
                }
                title
                location
                postedDate
                deadlineDate
                salary
                description
                category
                application{
                    applicationDate
                }
            }
        }
    }
`;

const QueryAllStudents = gql`
    query{
        AllStudents{
          StudentObj {
            id
            name
            schoolName
            email
            gradDate
            education {
              collegeName
              educationLocation
              degree
              major
              yearOfPassing
              cgpa
            }
            experience {
              companyName
              companyLocation
              title
              startDate
              endDate
              description
            }
            major
            careerObjective
          }
        }
      }
`;

const QueryGetStudent = gql`
    query($id: String){
        Student(id: $id){
            id
            name
            schoolName
            email
            gradDate
            address
            city
            state
            country
            dateOfBirth
            major
            careerObjective
            phoneNumber
            education {
              collegeName
              educationLocation
              degree
              major
              yearOfPassing
              cgpa
            }
            experience {
              companyName
              companyLocation
              title
              startDate
              endDate
              description
            } 
        }
      }
`;

const QueryGetCompany = gql`
    query($id: String){
        Company(id: $id){
            id
            name
            email
            location
            description
            phoneNumber 
        }
      }
`;


export { QueryAllJobs, QueryAppliedJobs, QueryAllStudents, QueryGetStudent, QueryGetCompany }
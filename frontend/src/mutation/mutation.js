import { gql } from 'apollo-boost';


const StudentLoginMutation = gql`
    mutation StudentLogin($email: String, $password: String, $schoolName : String){
        StudentLogin(email: $email, password: $password, schoolName : $schoolName){
            message
            status
        }
    }
`;

const StudentSignupMutation = gql`
    mutation Studentsignup($name : String, $email: String, $password: String, $schoolName : String){
        Studentsignup(name : $name, email: $email, password: $password, schoolName : $schoolName){
            message
            status
        }
    }
`;

const CompanySignupMutation = gql`
    mutation CompanySignup($name : String, $email: String, $password: String, $location : String){
        CompanySignup(name : $name, email: $email, password: $password, location : $location){
            message
            status
        }
    }
`;


const CompanyLoginMutation = gql`
    mutation CompanyLogin($email: String, $password: String){
        CompanyLogin(email: $email, password: $password){
            message
            status
        }
    }
`;

const ApplyToJobMutation = gql`
    mutation ApplyToJob($jobId: String, $studentId: String){
        ApplyToJob(jobId: $jobId, studentId: $studentId){
            message
            status
        }
    }
`;

const updateStudentMutation = gql`
    mutation StudentUpdate($id: String, $email: String ,$name: String, $address: String, $city: String, $dateOfBirth: String, $state: String, $country: String, $phoneNumber: String, $gradDate: String, $major: String, $careerObjective: String){
        StudentUpdate(id: $id, email : $email, name: $name, dateOfBirth: $dateOfBirth, address: $address, city: $city, state: $state, country: $country, phoneNumber: $phoneNumber, gradDate: $gradDate, major: $major, careerObjective: $careerObjective){
            message
            status
        }
    }
`;

const updateEducationMutation = gql`
    mutation EducationUpdate($id: String, $collegeName: String, $educationLocation: String, $yearOfPassing: String, $degree: String, $major: String, $cgpa: String){
        EducationUpdate(id: $id, collegeName : $collegeName, degree: $degree, educationLocation: $educationLocation, yearOfPassing: $yearOfPassing, major: $major, cgpa: $cgpa){
            message
            status
        }
    }
`;

const updateExperienceMutation = gql`
    mutation ExperienceUpdate($id: String, $companyName: String, $companyLocation: String, $title: String, $startDate: String, $endDate: String, $description: String){
        ExperienceUpdate(id: $id, companyName : $companyName, startDate: $startDate, companyLocation: $companyLocation, title: $title, endDate: $endDate, description: $description){
            message
            status
        }
    }
`;

const updateCompanyMutation = gql`
mutation CompanyUpdate($id: String, $name: String, $email: String, $location: String, $phoneNumber: String, $description: String){
    CompanyUpdate(id: $id, name : $name, email: $email, location: $location,phoneNumber: $phoneNumber, description: $description){
        message
        status
    }
}
`;

const AddJobMutation = gql`
mutation AddJob($companyId: String, $title: String, $postedDate: String, $location: String, $deadlineDate: String, $description: String, $salary: String,$category: String){
    AddJob(companyId: $companyId, title : $title, postedDate: $postedDate, location: $location,deadlineDate: $deadlineDate, salary: $salary, description: $description, category: $category){
        message
        status
    }
}
`;
export {StudentLoginMutation,CompanyLoginMutation, ApplyToJobMutation, updateStudentMutation, updateEducationMutation, updateExperienceMutation, updateCompanyMutation, AddJobMutation, CompanySignupMutation, StudentSignupMutation};

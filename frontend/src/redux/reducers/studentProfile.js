import { GET_PROFILE, ADD_EDUCATION, ADD_EXPERIENCE, ADD_SKILL, UPDATE_CONTACT, UPDATE_CAREER, UPDATE_PROFILE, UPDATE_EDUCATION, UPDATE_EXPERIENCE, DELETE_EDUCATION, DELETE_EXPERIENCE, DELETE_SKILL } from '../types/student/studentProfile'



const initialState = {
    studentId: "",
    name: "",
    dateOfBirth : "",
    schoolName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    major: "",
    education: [],
    experience: [],
    skills: [],
    careerObjective: "",
    resumeUrl: "",
    profilePicUrl : "",
    email: "",
    phoneNumber: "",
    gradDate : "",
    data: []
}

const studentProfile = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                studentId: action.payload._id,
                name: action.payload.name,
                schoolName: action.payload.schoolName,
                address: action.payload.address,
                city: action.payload.city,
                state: action.payload.state,
                country: action.payload.country,
                major: action.payload.major,
                careerObjective: action.payload.careerObjective,
                email: action.payload.email,
                phoneNumber: action.payload.phoneNumber,
                skills: action.payload.skills,
                education: action.payload.education,
                experience: action.payload.experience,
                resumeUrl: action.payload.resumeUrl,
                profilePicUrl : action.payload.profilePicUrl,
                gradDate : action.payload.gradDate,
                dateOfBirth : action.payload.dateOfBirth,
                data: action.payload
            })

        case UPDATE_PROFILE:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                name: action.payload.name,
                address: action.payload.address,
                city: action.payload.city,
                state: action.payload.state,
                country: action.payload.country,
                major: action.payload.major,
                profilePicUrl: action.payload.profilePicUrl,
                gradDate : action.payload.gradDate,
                dateOfBirth : action.payload.dateOfBirth
            })
        case UPDATE_CONTACT:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                email: action.payload.email,
                phoneNumber: action.payload.phoneNumber,
            })

        case UPDATE_CAREER:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                careerObjective: action.payload.careerObjective
            })



        case ADD_EDUCATION:
            console.log("AP ADD", action.payload)
            return Object.assign({}, state, {
                education: action.payload[0].education,
            })

        case UPDATE_EDUCATION:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                education: action.payload.education,
            })

        case DELETE_EDUCATION:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                education: action.payload.education,
            })

        case ADD_EXPERIENCE:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                experience: action.payload.experience,
            })

        case UPDATE_EXPERIENCE:
            console.log("AP Update Exp", action.payload)
            return Object.assign({}, state, {
                experience: action.payload.experience,
            })

        case DELETE_EXPERIENCE:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                experience: action.payload.experience,
            })
        case ADD_SKILL:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                skills: action.payload.skills,
            })

        case DELETE_SKILL:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                skills: action.payload.skills,
            })

        default: return state
    }
}

export default studentProfile
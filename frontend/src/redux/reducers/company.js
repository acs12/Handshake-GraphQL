import { COMPANY_LOGIN, COMPANY_SIGNUP, COMPANY_PROFILE, GET_COMPANY_PROFILE } from '../types/company/company'



const initialState = {
    companyId: "",
    name: "",
    dateOfBirth: "",
    location: "",
    description: "",
    profilePicUrl: "",
    email: "",
    phoneNumber: "",
    data: []
}

const companySignup = (state = initialState, action) => {
    switch (action.type) {
        case COMPANY_SIGNUP: return {
            ...state,
            data: action.payload
        }

        case COMPANY_LOGIN:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                companyId: action.payload.data._id,
                name: action.payload.data.name,
                email: action.payload.data.email,
                phoneNumber: action.payload.data.phoneNumber,
                dateOfBirth: action.payload.data.dateOfBirth,
                description: action.payload.data.description,
                profilePicUrl: action.payload.data.profilePicUrl,
                location: action.payload.data.location,
                data: action.payload
            })

        case COMPANY_PROFILE:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                companyId: action.payload._id,
                name: action.payload.name,
                email: action.payload.email,
                phoneNumber: action.payload.phoneNumber,
                description: action.payload.description,
                profilePicUrl: action.payload.profilePicUrl,
                location: action.payload.location,
                data: action.payload
            })

        case GET_COMPANY_PROFILE:
            console.log("Payload", action.payload[0])
            return {
                ...state,
                companyId: action.payload[0]._id,
                name: action.payload[0].name,
                email: action.payload[0].email,
                phoneNumber: action.payload[0].phoneNumber,
                description: action.payload[0].description,
                profilePicUrl: action.payload[0].profilePicUrl,
                location: action.payload[0].location,
                data: action.payload[0]
            }

        default: return state
    }
}

export default companySignup
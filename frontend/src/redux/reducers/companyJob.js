import { GET_JOBS__BY_ID, POST_JOBS,UPDATE_JOB_STATUS } from '../types/company/companyJob'



const initialState = {
    data: [],
    status : ""
}

const companyJob = (state = initialState, action) => {
    switch (action.type) {
        case GET_JOBS__BY_ID:
            console.log("AP", action.payload)
            return {
                ...state,
                data: action.payload
            }

        case POST_JOBS:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                ...state,
                data: action.payload
            })

        case UPDATE_JOB_STATUS : 
            console.log("AP",action.payload)
            return Object.assign({},state,{
                ...state,
                status : action.payload
            })

        default: return state
    }
}

export default companyJob
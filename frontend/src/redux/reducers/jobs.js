import { GET_JOBS, APPLY_TO_JOB, APPLIED_JOBS, CHANGE_FILTER } from '../types/student/jobs'



const initialState = {
    getJobs: [],
    filteredJobs: [],
    data: [],
    appliedJobs: []
}

const studentJobs = (state = initialState, action) => {
    switch (action.type) {
        case GET_JOBS:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                data: action.payload,
                getJobs: action.payload,
                filteredJobs: action.payload
            })

        case APPLY_TO_JOB:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                data: action.payload,
                filteredJobs : action.payload,
                getJobs: action.payload
            })

        case APPLIED_JOBS:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                appliedJobs: action.payload
            })

        case CHANGE_FILTER:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                filteredJobs: action.payload
            })

        default: return state
    }
}

export default studentJobs
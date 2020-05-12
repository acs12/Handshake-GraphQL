import { GET_EVENTS, APPLY_TO_EVENT, APPLIED_EVENTS } from '../types/student/event'



const initialState = {
    getEvents: [],
    filteredEvents: [],
    data: [],
    appliedEvents: []
}

const events = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                data: action.payload,
                getEvents: action.payload,
                filteredEvents: action.payload
            })

        case APPLY_TO_EVENT:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                data: action.payload,
                filteredEvents : action.payload,
                getEvents: action.payload
            })

        case APPLIED_EVENTS:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                appliedEvents: action.payload
            })

        default: return state
    }
}

export default events
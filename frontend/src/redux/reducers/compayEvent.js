import { GET_EVENTS__BY_ID, POST_EVENT } from '../types/company/companyEvent'



const initialState = {
    data: []
}

const companyEvents = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS__BY_ID:
            console.log("AP", action.payload)
            return {
                ...state,
                data: action.payload
            }

        case POST_EVENT:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                ...state,
                data: action.payload
            })

        default: return state
    }
}

export default companyEvents
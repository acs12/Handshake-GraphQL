import { COMPANY_SEND_MSG, MESSAGE_FROM_COMPANY } from '../types/message/companyMessage'



const initialState = {
    data: [],
    companyData : []
}

const messages = (state = initialState, action) => {
    switch (action.type) {
        case COMPANY_SEND_MSG:
            console.log("AP", action.payload)
            return {
                ...state,
                data: action.payload
            }

        case MESSAGE_FROM_COMPANY:
            console.log("AP", action.payload)
            return {
                ...state,
                companyData: action.payload
            }

        default: return state
    }
}

export default messages
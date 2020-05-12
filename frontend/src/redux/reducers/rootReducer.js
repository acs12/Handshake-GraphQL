import { combineReducers} from "redux";
import studentSignup from './student';
import jobs from './jobs'
import studentProfile from './studentProfile'
import events from './events'

import companySignup from './company'
import companyJob from './companyJob'
import companyEvents from './compayEvent'
import messages from './message'


const rootReducer = combineReducers({

    student: studentSignup,
    jobs : jobs,
    events : events,
    studentProfile : studentProfile,

    company : companySignup,
    companyJobs : companyJob,
    companyEvents : companyEvents,

    messages : messages
})


export default rootReducer;
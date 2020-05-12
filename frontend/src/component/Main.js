import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home/Home';
import Navbar from './LandingPage/Navbar';
import StudentSignup from './Signup/StudentSignup';
import CompanySignup from './Signup/CompanySignup';
import StudentLogin from './Login/StudentLogin';
import CompanyLogin from './Login/CompanyLogin';
import Profile from './StudentProfile/Profile'
import JobHome from './SJob/JobHome'
import CompanyDetails from './SJob/CompanyDetails';
import JobDetails from './SJob/JobDetails';
import NavbarJob from './LandingPage/NavbarJob';
import StudentJob from './SJob/StudentJob';
import StudentApplication from './SApplication/StudentApplication'
import AllStudentHome from './ViewStudent/AllStudentHome'
import StudentDetailsHome from './ViewStudent/StudentDetailsHome'
import EventHome from './SEvents/EventHome'
import EventDetails from './SEvents/EventDetails';
import NavbarEvent from './LandingPage/NavbarEvent';
import StudentEvent from './SEvents/StudentEvent';
import RegisteredEvent from './SEvents/RegisteredEvent';
//
import CompanyJobBar from './LandingPage/CompanyJobBar'
import CViewJob from './CompanyJob/CViewJob'
import StudentList from './CompanyJob/StudentList'
import PostJob from './CompanyJob/PostJob'
import CompanyEventBar from './LandingPage/CompanyEventBar'
import CViewEvent from './CompanyEvent/CViewEvent'
import StudentListEvent from './CompanyEvent/StudentListEvent'
import PostEvent from './CompanyEvent/PostEvent'
import CompanyProfile from './Company/CompanyProfile'
//
import Message from './Message/companyMessage'
import MessageFromCompany from './Message/messageFromCompany'





//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                    {/*Render Different Component based on Route*/}
                    <Route path="/" component={Navbar} />
                    <Route path="/StudentProfile" component={Profile} />
                    <Route exact path="/StudentLogin" component={StudentLogin} />
                    <Route exact path="/Companylogin" component={CompanyLogin} />
                    <Route exact path="/studentSignup" component={StudentSignup} />
                    <Route exact path="/companySignup" component={CompanySignup} />
                    <Route exact path="/NavbarJob" component={NavbarJob} />
                    <Route exact path="/SJob/StudentJob" component={StudentJob} />
                    <Route exact path="/SJob/JobDetails" component={JobDetails} />
                    <Route exact path="/SJob/JobHome" component={JobHome} />
                    <Route exact path="/SJob/CompanyDetails" component={CompanyDetails} />
                    <Route exact path="/SApplication/StudentApplication" component={StudentApplication} />
                    <Route exact path="/ViewStudent/AllStudentHome" component={AllStudentHome} />
                    <Route exact path="/ViewStudent/StudentDetailsHome" component={StudentDetailsHome} />
                    <Route exact path="/SEvents/EventHome" component={EventHome} />
                    <Route exact path="/SEvents/EventDetails" component={EventDetails} />
                    <Route exact path="/SEvents/StudentEvent" component={StudentEvent} />
                    <Route exact path="/SEvents/RegisteredEvent" component={RegisteredEvent} />
                    <Route exact path="/NavbarEvent" component={NavbarEvent} />
                    {/*Render Different Component based on Route*/}
                    <Route exact path="/CompanyJobBar" component={CompanyJobBar} />
                    <Route exact path="/CompanyJob/CViewJob" component={CViewJob} />
                    <Route exact path="/CompanyJob/StudentList" component={StudentList} />
                    <Route exact path="/CompanyJob/PostJob" component={PostJob} />
                    <Route exact path="/CompanyEventBar" component={CompanyEventBar} />
                    <Route exact path="/CompanyEvent/CViewEvent" component={CViewEvent} />
                    <Route exact path="/CompanyEvent/StudentListEvent" component={StudentListEvent} />
                    <Route exact path="/CompanyEvent/PostEvent" component={PostEvent} />
                    <Route exact path="/Company/CompanyProfile" component={CompanyProfile} />
                    {/*Render Different Component based on Route*/}
                    <Route exact path="/Message" component={Message}/>
                    <Route exact path="/Message/Company" component={MessageFromCompany}/>




                    <Route path="/home" component={Home} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;
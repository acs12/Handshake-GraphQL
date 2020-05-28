import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import StudentProfile from './StudentProfile'
import CareerObjective from './CareerObjective'
import EducationDetails from './EducationDetails'
import ExperienceDetails from './ExperienceDetails'
import ContactInfo from './ContactInfo'
import SkillDetails from './SkillDetails'
import { Redirect } from 'react-router';


//Define a Component
class Profile extends Component {


    render() {
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        return (
            <div>
                {redirectVar}
                <MDBContainer>

                    <MDBRow>
                        <MDBCol>
                            <StudentProfile />
                        </MDBCol>
                        <MDBCol>
                            <CareerObjective />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <br></br>
                            <ContactInfo />
                        </MDBCol>
                        <MDBCol>
                            <br></br>
                            <EducationDetails />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <br></br>
                            {/* <SkillDetails /> */}
                        </MDBCol>
                        <MDBCol>
                            <br></br>
                            <ExperienceDetails />

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}
//export Component

export default Profile;
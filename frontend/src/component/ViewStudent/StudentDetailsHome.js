import React, { Component } from 'react';
import '../../App.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Redirect } from 'react-router';


//Define a Component
class StudentDetailsHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            studentId: this.props.location.state.studentId,
            name: this.props.location.state.name,
            email: this.props.location.state.email,
            schoolName: this.props.location.state.schoolName,
            gradDate: this.props.location.state.gradDate,
            major: this.props.location.state.major,
            careerObjective: this.props.location.state.careerObjective,
            education: this.props.location.state.education,
            experience: this.props.location.state.experience,
        }

        this.onError = this.onError.bind(this)
    }


    onError = () => {
        console.log("error")
    }

    render() {
        console.log("StudentDetailsHomeState",this.state)
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
       
        return (
            <div>
                {redirectVar}
                <MDBContainer style={{ marginTop: "3%" }}>
                    <MDBRow>
                        <MDBCol md={5} >
                            <div>
                                <b>General Information :</b>
                                <br></br>
                                <br></br>
                                <div className="card-subtitle mb-2 text-muted">
                                    <div style={{ textAlign: "left" }}>
                                        <img style={{ width: "15%", height: "5%" }} className="img-circle" src={this.state.profilePicUrl} alt=""></img>
                                    </div>
                                </div>
                                <div className="card-title">
                                    <h4>{this.state.name}</h4>
                                </div>
                                <div className="card-subtitle mb-2 text-muted">{this.state.email}</div>
                                <div className="card-subtitle mb-2 text-muted">{this.state.schoolName}</div>
                                <div className="card-subtitle mb-2 text-muted">{this.state.degree} Graduates : {String(this.state.gradDate).slice(0,10)}</div>
                                <div className="card-subtitle mb-2 text-muted">Major : {this.state.major}</div>
                            </div>
                        </MDBCol>
                        <MDBCol md={7} >
                            <div>
                                <div className="card-title">
                                    <b>My Journey :</b>
                                </div>
                                <br></br> <br></br>
                                <div className="card-subtitle mb-2 text-muted">
                                    {this.state.careerObjective}
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        {/* <MDBCol md={5} >
                            {resumeDisplay}
                        </MDBCol> */}
                        <MDBCol md={7} >
                            <br></br>
                            <b>Education :</b>
                                    <div>
                                        <div className="card" >
                                            <div className="card-body">
                                                <h5 className="card-title">School : {this.state.education.collegeName}</h5>
                                                <h6 className="card-subtitle mb-2 text-muted"> Location: {this.state.education.location}</h6>
                                                <h6 className="card-subtitle mb-2 text-muted">Degree : {this.state.education.degree}</h6>
                                                <h6 className="card-subtitle mb-2 text-muted">Major : {this.state.education.major}</h6>
                                                <h6 className="card-subtitle mb-2 text-muted">Year of Passing : {this.state.education.yearOfPassing}</h6>
                                                <h6 className="card-subtitle mb-2 text-muted">CGPA : {this.state.education.cgpa}</h6>
                                            </div>
                                            <br></br>
                                        </div>
                                    </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        {/* <MDBCol md={5} >
                            <br></br>
                            <b>Skill :</b>
                            {this.state.skills.map(x => {
                                return (
                                    <div>
                                        <div className="card" >
                                            <div className="card-body" >
                                                <h6 className="card-subtitle mb-2 text-muted">{x.skillName}</h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </MDBCol> */}
                        <MDBCol md={7} >
                            <br></br>
                            <b>Experience :</b>
                                    <div>
                                        <div className="card" >
                                            <div className="card-body">
                                                <h5 className="card-title">Company name : {this.state.experience.companyName}</h5>
                                                <h6 className="card-subtitle mb-2 text-muted">Title : {this.state.experience.title}</h6>
                                                <h6 className="card-subtitle mb-2 text-muted">From : {String(this.state.experience.startDate).slice(0,10)} - To : {String(this.state.experience.endDate).slice(0,10)}</h6>
                                                <h6 className="card-subtitle mb-2 text-muted">Description : {this.state.experience.description}</h6>
                                            </div>
                                            <br></br>
                                        </div>
                                    </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}
//export Component

export default StudentDetailsHome;
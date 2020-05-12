import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBCol } from "mdbreact";
import { Redirect } from 'react-router';


// import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    // handle logout to destroy the cookie
    handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("type")
        localStorage.removeItem("id")
    }
    render() {
        let type = localStorage.getItem("type")
        let navLogin = null;
        let bar = null
        if (localStorage.getItem("token")) {

            console.log("Able to read token");
            navLogin = (

                <Link to="/StudentLogin" onClick={this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link>

            );
        } else {
            //Else display login button
            console.log("Not Able to read token");
            navLogin = (
                <Link to="/StudentLogin"><span className="glyphicon glyphicon-log-in"></span> Login</Link>
            )
        }

        if (type === "Student") {
            bar =
                <nav className="navbar navbar-default">
                    <div className="navbar-brand">
                        <MDBContainer>
                            <MDBCol>
                                <div className="navbar-header">
                                    <Link to="../SJob/StudentJob">Handshake</Link>
                                </div>
                            </MDBCol>
                            <MDBCol >
                                <Link to="../SJob/StudentJob">Jobs</Link>
                            </MDBCol>
                            <MDBCol >
                                <Link to="../ViewStudent/AllStudentHome">Students</Link>

                            </MDBCol>
                            <MDBCol >
                                <Link to="../StudentProfile/Profile">Profile</Link>
                            </MDBCol>
                            <MDBCol >
                                <Link to="../Message">Message</Link>
                            </MDBCol>
                            <MDBCol>
                                <div className="nav navbar-nav navbar-right">
                                    {navLogin}
                                </div>

                            </MDBCol>
                        </MDBContainer>


                    </div>
                </nav>
        }
        else if (type === "Company") {
            bar = <nav className="navbar navbar-default">
                <div className="navbar-brand">
                    <MDBContainer>
                        <MDBCol>
                            <div className="navbar-header">
                                <Link to="../CompanyJob/CViewJob">Handshake</Link>
                            </div>
                        </MDBCol>
                        <MDBCol >
                            <Link to="../CompanyJob/CViewJob">Jobs</Link>
                        </MDBCol>
                        <MDBCol >
                            <Link to="../ViewStudent/AllStudentHome">Students</Link>

                        </MDBCol>
                        <MDBCol >
                            <Link to="../Company/CompanyProfile">Profile</Link>
                        </MDBCol>
                        {/* <MDBCol >
                            <Link to="../Message">Message</Link>
                        </MDBCol> */}

                        <MDBCol >
                            <div className="nav navbar-nav navbar-right">
                                {navLogin}
                            </div>

                        </MDBCol>
                    </MDBContainer>


                </div>
            </nav>
        }
        else {
            bar =
                <nav className="navbar navbar-default">
                    <div className="navbar-brand">
                        <MDBContainer>
                            <MDBCol >
                                <div className="navbar-header">
                                    <Link to="/Navbar">Handshake</Link>
                                </div>
                            </MDBCol>
                            <MDBCol >
                                <Link to="/NavbarJob">Jobs</Link>
                            </MDBCol>
                            <MDBCol >
                                <Link to="../ViewStudent/AllStudentHome">Students</Link>

                            </MDBCol>
                            <MDBCol >
                                <Link to="../StudentProfile/Profile">Profile</Link>
                            </MDBCol>
                            <MDBCol >

                            </MDBCol>
                            <MDBCol >
                                <div className="nav navbar-nav navbar-right">
                                    {navLogin}
                                </div>

                            </MDBCol>
                        </MDBContainer>


                    </div>
                </nav>
        }
        return (
            <div>
                {bar}
            </div>
        )
    }
}

export default Navbar;
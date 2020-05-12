import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { MDBContainer, MDBCol } from "mdbreact";
// import {Redirect} from 'react-router';

//create the Navbar Component
class CompanyEventBar extends Component {

    render() {
        let redirectVar = null
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/CompanyLogin" />
        }
        return (
            <div>
                {redirectVar}
                <nav className="navbar navbar-default">
                    <div className="navbar-brand">
                        <MDBContainer>

                            <MDBCol md="2">
                                <Link to="../CompanyEvent/CViewEvent">View Event</Link>
                            </MDBCol>
                            <MDBCol md="2">
                                <Link to="../CompanyEvent/PostEvent">Post Event</Link>
                            </MDBCol>
                        </MDBContainer>
                    </div>
                </nav>

            </div>
        )
    }
}

export default CompanyEventBar;
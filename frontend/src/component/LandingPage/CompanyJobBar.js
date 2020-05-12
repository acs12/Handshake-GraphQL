import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { MDBContainer, MDBCol } from "mdbreact";

//create the Navbar Component
class CompanyJobBar extends Component {

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
                                <Link to="../CompanyJob/CViewJob">View Jobs</Link>
                            </MDBCol>
                            <MDBCol md="2">
                                <Link to="../CompanyJob/PostJob">Post Job</Link>
                            </MDBCol>
                        </MDBContainer>
                    </div>
                </nav>
            </div>
        )
    }
}

export default CompanyJobBar;
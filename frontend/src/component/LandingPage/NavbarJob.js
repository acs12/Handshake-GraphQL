import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { MDBContainer, MDBCol } from "mdbreact";

//create the Navbar Component
class NavbarJob extends Component {

    render() {
        let redirectVar = null
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        return (
            <div>
                {redirectVar}
                
                <nav className="navbar navbar-default">
                    <div className="navbar-brand">
                        <MDBContainer>

                            <MDBCol md="2">
                                <Link to="../SJob/StudentJob">Job Search</Link>
                            </MDBCol>
                            <MDBCol md="2">
                                <Link to="../SApplication/StudentApplication">Application</Link>
                            </MDBCol>
                        </MDBContainer>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavbarJob;
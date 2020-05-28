import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { MDBContainer, MDBCol } from "mdbreact";

//create the Navbar Component
class MessageBar extends Component {

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
                                <Link to="../Message">Student</Link>
                            </MDBCol>
                            <MDBCol md="2">
                                <Link to="../Message/Company">Company</Link>
                            </MDBCol>
                        </MDBContainer>
                    </div>
                </nav>
            </div>
        )
    }
}

export default MessageBar;
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { MDBContainer, MDBCol } from "mdbreact";

//create the Navbar Component
class NavbarEvent extends Component {

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
                                <Link to="../SEvents/StudentEvent">Upcoming Event</Link>
                            </MDBCol>
                            <MDBCol md="2">
                                <Link to="../SEvents/RegisteredEvent">Registered Events</Link>

                            </MDBCol>                           
                        </MDBContainer>


                    </div>
                </nav>
                
            </div>
        )
    }
}

export default NavbarEvent;
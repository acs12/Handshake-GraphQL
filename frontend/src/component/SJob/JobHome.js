import React, { Component } from 'react';
import '../../App.css';
import { Container, Row, Col } from 'react-bootstrap';
import StudentJob from './StudentJob'

import { Redirect } from 'react-router';



//Define a Login Component
class JobHome extends Component {


    render() {
        // let response = this.state.response
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        return (
            <div>
                {redirectVar}
                <Container style={{ marginTop: "5%" ,border : "2px"}}>
                    <Row>
                        <Col sm={{ span: 7, offset: 1}} >
                            <StudentJob />
                        </Col>
                    </Row>
                </Container>
                
            </div>
        )
    }
}
//export Login Component
export default JobHome;
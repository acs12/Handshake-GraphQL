import React, { Component } from 'react';
import '../../App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router';
import StudentEvent from './StudentEvent'


class EventHome extends Component {


    render() {
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
                            <StudentEvent />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default EventHome;
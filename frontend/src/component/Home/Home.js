import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';

class Home extends Component {
    render() {
        let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        return (
            <div>
                {redirectVar}
                <h1>Welcome to Handshake</h1>
            </div>
        )
    }
}
//export Home Component
export default Home;
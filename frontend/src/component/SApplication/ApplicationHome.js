import React, { Component } from 'react';
import '../../App.css';
import StudentApplication from './StudentApplication'

class ApplicationHome extends Component {


    render() {
       let redirectVar = null;
        if (!localStorage.getItem("token")) {
            redirectVar = <Redirect to="/StudentLogin" />
        }
        return (
            <div>
                {redirectVar}
                <StudentApplication/>                
            </div>
        )
    }
}
export default ApplicationHome;
import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { MDBContainer, MDBCol } from "mdbreact";
import { graphql } from 'react-apollo';
import { StudentLoginMutation } from '../../mutation/mutation';
const jwt_decode = require('jwt-decode');





//Define a Login Component
class StudentLogin extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            studentId: "",
            schoolName: "",
            email: "",
            password: "",
            response: "",
            success : false,
            loginFlag : false
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.submitStudentLogin = this.submitStudentLogin.bind(this);
    }



    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    //submit Login handler to send a request to the node backend
    submitStudentLogin = async (e) => {

        e.preventDefault();
       
        let mutationResponse = await this.props.StudentLoginMutation({
            variables: {
                schoolName:this.state.schoolName,
                email: this.state.email,
                password: this.state.password,
            }
        });
        let result = mutationResponse.data.StudentLogin;
        console.log("result",result)
        if (result) {
            console.log("Response",result)
            if (result.status === "200") {
                this.setState({
                    success: true,
                    response: result.message,
                    loginFlag : true
                });
            } else {
                this.setState({
                    response: result.message,
                    loginFlag : true
                });
            }
        }

    }

    render() {
        console.log('this.state', this.state)
        let response = ""
        let redirectVar = null;
        if (localStorage.getItem("token") || this.state.success) {
            console.log("inside get token")
            let token = this.state.response;
            localStorage.setItem("token", token);
            var decoded = jwt_decode(token.split(' ')[1]);
            localStorage.setItem("id", decoded.id);
            localStorage.setItem("email",decoded.email);
            localStorage.setItem("type", "Student");
            redirectVar = <Redirect to="/SJob/StudentJob" />
        }
        else if (this.state.response === "Student_not_registered" && this.state.loginFlag) {
            response = <div className="alert alert-danger"> No Student Registered Under This Id </div>
        }
        else if (this.state.response === "Incorrect_Password" && this.state.loginFlag) {
            response = <div className="alert alert-danger"> Incorrect Password </div>
        }
        else if (this.state.response === "Incorrect_School_Name" && this.state.loginFlag){
            response = <div className="alert alert-danger"> Incorrect School Name </div>
        }
        return (
            <div>
                <MDBContainer>
                    <MDBCol md="3">

                    </MDBCol>
                    <MDBCol style={{ textAlign: "center" }} md="4">
                        {redirectVar}
                        <form onSubmit={this.submitStudentLogin}>
                            <div style={{ textAlign: "left" }}>
                                <h1>Sign in</h1>

                                <br></br>

                                <h4>Student and Alumni</h4>
                                <h5>Please select your school to sign in</h5>
                            </div>
                            <br></br>

                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
                                    name="schoolName"
                                    placeholder="schoolName"
                                    required
                                    autoFocus
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    placeholder="email"
                                    // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="password"
                                    required
                                />
                            </div>

                            <br></br>
                            <div style={{ textAlign: "left" }}>
                                <button type="submit" className="btn btn-primary">Login</button>

                                <br></br><br></br>

                                <h5>Don't have an account? Go to <Link to="/StudentSignup"> Signup Page</Link></h5>

                                <h5>To login as a Company.<Link to="/CompanyLogin"> Click Here</Link></h5>

                                <br></br>

                                {response}
                            </div>
                        </form>
                    </MDBCol>
                    <MDBCol md="3">

                    </MDBCol>

                </MDBContainer>

            </div>
        )
    }
}



//export Login Component
export default graphql(StudentLoginMutation, { name: "StudentLoginMutation" })(StudentLogin);
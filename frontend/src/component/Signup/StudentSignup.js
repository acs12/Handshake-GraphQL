import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { MDBContainer, MDBCol } from "mdbreact";
import { graphql } from 'react-apollo';
import { StudentSignupMutation } from '../../mutation/mutation';


//Define a Login Component
class StudentSignup extends Component {
    //call the constructor method 
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {


            name: "",
            email: "",
            schoolName: "",
            password: "",
            response: "",
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.submitStudentSignup = this.submitStudentSignup.bind(this);
    }

    //username change handler to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    //submit Login handler to send a request to the node backend
    submitStudentSignup = async(e) => {
        e.preventDefault();
       
        let mutationResponse = await this.props.StudentSignupMutation({
            variables: {
                name : this.state.name,
                schoolName:this.state.schoolName,
                email: this.state.email,
                password: this.state.password,
            }
        });
        let result = mutationResponse.data.Studentsignup;
        console.log("result",result)
        if (result) {
            console.log("Response",result)
            if (result.status === "200") {
                this.setState({
                    response: result.message,
                });
            } else {
                this.setState({
                    response: result.message,
                });
            }
        }
    }

    render() {
        let response = ""
        let redirectVar = null;
        if (localStorage.getItem("token")) {
            redirectVar = <Redirect to="/home" />
        }
        if (this.state.response === "Student_Already_Exists") {
            response = <div className="alert alert-danger"> Student Already Registered Under This Id </div>
        }
        else if (this.state.response === "Student_Successfully_Signed_Up") {
            response = <div className="alert alert-success"> Student Successfully SignedUp </div>
        }
        else if (this.state.response === "Internal_Server_Error"){
            response = <div className="alert alert-danger"> Internal Server Error </div>
        }
        return (
            <div>
                <MDBContainer>
                    <MDBCol md="3">

                    </MDBCol>
                    <MDBCol style={{ textAlign: "center" }} md="4">
                        {redirectVar}
                        <form onSubmit={this.submitStudentSignup}>

                            <div style={{ textAlign: "left" }}>
                                <h2>Student Signup</h2>
                                <p>Please enter your details to create account</p>
                            </div>

                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    placeholder="email"
                                    required
                                    // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                />
                            </div>


                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
                                    name="schoolName"
                                    placeholder="schoolName"
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
                            <div style={{ textAlign: "left" }}>
                                <br></br>
                                <button className="btn btn-primary">Signup</button>

                                <br></br>

                                <h5>Already have an account? Go to <Link to="/StudentLogin"> Login Page</Link></h5>

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
export default  graphql(StudentSignupMutation, { name: "StudentSignupMutation" })(StudentSignup);
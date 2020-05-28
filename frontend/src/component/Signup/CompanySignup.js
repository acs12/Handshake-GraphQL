import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { MDBContainer, MDBCol } from "mdbreact";
import { graphql } from 'react-apollo';
import { CompanySignupMutation } from '../../mutation/mutation';

class CompanySignup extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {


            name: "",
            email: "",
            location: "",
            password: "",
            response: "",
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.submitCompanySignup = this.submitCompanySignup.bind(this);
    }

    //username change handler to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    //submit Login handler to send a request to the node backend
    submitCompanySignup = async (e) => {
        e.preventDefault();
       
        let mutationResponse = await this.props.CompanySignupMutation({
            variables: {
                name : this.state.name,
                location:this.state.location,
                email: this.state.email,
                password: this.state.password,
            }
        });
        let result = mutationResponse.data.CompanySignup;
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
        if (this.state.response === "Company_Already_Registered") {
            response = <div className="alert alert-danger"> Company Already Registered Under This Id </div>
        }
        else if (this.state.response === "Company_Added") {
            response = <div className="alert alert-success"> Company Successfully SignedUp </div>
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
                        <form onSubmit={this.submitCompanySignup}>
                            <div style={{ textAlign: "left" }}>
                                <h2>Company Signup</h2>
                                <p>Please enter your details to Signup</p>
                            </div>

                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text" className="form-control"
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
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <input
                                    onChange={this.changeHandler}
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    placeholder="location"
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
                                <button className="btn btn-primary">Signup</button>

                                <br></br>

                                <h5>Already have an account? Go to<Link to="/CompanyLogin"> Login Page</Link></h5>

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

export default  graphql(CompanySignupMutation, { name: "CompanySignupMutation" })(CompanySignup);